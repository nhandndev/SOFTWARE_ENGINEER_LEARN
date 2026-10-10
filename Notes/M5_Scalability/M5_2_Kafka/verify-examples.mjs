import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pgPort = Number(process.env.M52_PG_PORT);
if (!Number.isInteger(pgPort) || pgPort < 1 || pgPort > 65535) {
  throw new Error('M52_PG_PORT must point to an isolated localhost PostgreSQL lab');
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'm52-qa-'));
const suffix = randomUUID().replaceAll('-', '').slice(0, 12);
const namespace = 'qa-m52-' + suffix;
const schemaName = 'qa_m52_' + suffix;
const fault = process.env.M52_FAULT;
if (fault && fault !== 'no_tx') throw new Error('Supported fault: no_tx');
function write(rel, body) {
  const dest = path.join(tmp, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, body);
}
let extracted = 0;
for (const name of fs.readdirSync(dir).filter(n => /^LESSON_\d\d_.*\.md$/.test(n))) {
  const body = fs.readFileSync(path.join(dir, name), 'utf8');
  for (const m of body.matchAll(/<!-- verify: ([^>]+) -->\s*```java\n([\s\S]*?)\n```/g)) {
    let source = m[2].replace('TOPIC = "order-placed-json-v1"', `TOPIC = "${namespace}"`);
    if (fault === 'no_tx' && m[1].endsWith('/NotificationInboxService.java')) {
      source = source.replace('    @Transactional\n', '');
    }
    write('src/main/java/' + m[1], source);
    extracted++;
  }
  for (const m of body.matchAll(/<!-- verify-sql: ([^>]+) -->\s*```sql\n([\s\S]*?)\n```/g)) {
    write('src/main/resources/' + m[1], m[2]);
  }
}
if (extracted !== 6) throw new Error('Expected exactly six complete lesson Java sources');
write('pom.xml', `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>4.1.1</version></parent>
  <groupId>qa</groupId><artifactId>m52-lesson-check</artifactId><version>1</version>
  <properties><java.version>21</java.version></properties>
  <dependencies>
    <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-kafka</artifactId></dependency>
    <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-json</artifactId></dependency>
    <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-jdbc</artifactId></dependency>
    <dependency><groupId>org.postgresql</groupId><artifactId>postgresql</artifactId><scope>runtime</scope></dependency>
    <dependency><groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><scope>test</scope></dependency>
  </dependencies>
</project>`);
write('src/test/java/qa/LessonTest.java', `package qa;

import com.shopcore.events.*;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.BooleanSupplier;
import java.util.concurrent.atomic.AtomicInteger;
import org.aopalliance.intercept.MethodInterceptor;
import org.springframework.aop.framework.Advised;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.*;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.*;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class LessonTest {
  @SpringBootConfiguration
  @EnableAutoConfiguration
  @ComponentScan(basePackageClasses = OrderEventPublisher.class)
  static class App {}

  ConfigurableApplicationContext context;
  JdbcTemplate jdbc;
  NotificationInboxService inbox;
  OrderEventPublisher publisher;
  KafkaTemplate<String, Object> template;
  KafkaListenerEndpointRegistry registry;
  Admin admin;
  final String topic = OrderEventPublisher.TOPIC;
  final String group = "shopcore-notification-v1";

  @BeforeAll void setup() throws Exception {
    try (var connection = java.sql.DriverManager.getConnection(
      "jdbc:postgresql://127.0.0.1:${pgPort}/m52_qa", "postgres", "m52_lab_only");
      var statement = connection.createStatement()) {
      statement.execute("CREATE SCHEMA ${schemaName}");
    }
    context = new SpringApplicationBuilder(App.class).web(WebApplicationType.NONE)
      .properties(Map.ofEntries(
        Map.entry("spring.kafka.bootstrap-servers", "localhost:9092"),
        Map.entry("spring.datasource.url", "jdbc:postgresql://127.0.0.1:${pgPort}/m52_qa?currentSchema=${schemaName}"),
        Map.entry("spring.datasource.username", "postgres"),
        Map.entry("spring.datasource.password", "m52_lab_only"),
        Map.entry("spring.kafka.consumer.group-id", group),
        Map.entry("spring.kafka.consumer.enable-auto-commit", "false"),
        Map.entry("spring.kafka.consumer.auto-offset-reset", "earliest"),
        Map.entry("spring.kafka.consumer.key-deserializer", StringDeserializer.class.getName()),
        Map.entry("spring.kafka.consumer.value-deserializer", ErrorHandlingDeserializer.class.getName()),
        Map.entry("spring.kafka.consumer.properties[spring.deserializer.value.delegate.class]", JacksonJsonDeserializer.class.getName()),
        Map.entry("spring.kafka.consumer.properties[spring.json.value.default.type]", OrderPlacedEvent.class.getName()),
        Map.entry("spring.kafka.consumer.properties[spring.json.use.type.headers]", "false"),
        Map.entry("spring.kafka.consumer.properties[spring.json.trusted.packages]", "com.shopcore.events"),
        Map.entry("spring.kafka.listener.ack-mode", "record"),
        Map.entry("spring.kafka.listener.auto-startup", "false"),
        Map.entry("logging.level.root", "WARN")
      )).run();
    jdbc = context.getBean(JdbcTemplate.class);
    String schema = new String(getClass().getResourceAsStream("/inbox-schema.sql").readAllBytes(), StandardCharsets.UTF_8);
    for (String statement : schema.split(";")) if (!statement.isBlank()) jdbc.execute(statement);
    inbox = context.getBean(NotificationInboxService.class);
    publisher = context.getBean(OrderEventPublisher.class);
    template = context.getBean(KafkaTemplate.class);
    registry = context.getBean(KafkaListenerEndpointRegistry.class);
    admin = Admin.create(Map.of("bootstrap.servers", "localhost:9092"));
    admin.createTopics(List.of(new NewTopic(topic, 3, (short) 1), new NewTopic(topic + "-dlt", 3, (short) 1))).all().get(30, TimeUnit.SECONDS);
  }

  @AfterAll void close() {
    if (context != null) context.close();
    if (admin != null) admin.close(Duration.ofSeconds(5));
  }

  OrderPlacedEvent event() {
    return new OrderPlacedEvent(UUID.randomUUID().toString(), "OrderPlaced", 1,
      101L, 7L, new BigDecimal("250000.00"), "2026-10-07T10:00:00Z");
  }
  int count(String table, OrderPlacedEvent event) {
    return jdbc.queryForObject("SELECT COUNT(*) FROM " + table + " WHERE event_id = ?", Integer.class, UUID.fromString(event.getEventId()));
  }
  void waitFor(BooleanSupplier condition) throws Exception {
    long end = System.nanoTime() + TimeUnit.SECONDS.toNanos(30);
    while (System.nanoTime() < end) {
      if (condition.getAsBoolean()) return;
      Thread.sleep(50);
    }
    fail("Condition did not hold within 30s");
  }

  @Test @Order(1) void jsonRoundTripAndSchema() {
    var input = event();
    try (var serializer = new JacksonJsonSerializer<OrderPlacedEvent>().noTypeInfo();
         var deserializer = new JacksonJsonDeserializer<>(OrderPlacedEvent.class, false)) {
      byte[] bytes = serializer.serialize(topic, input);
      var decoded = deserializer.deserialize(topic, bytes);
      assertEquals(input.getEventId(), decoded.getEventId());
      assertEquals(0, input.getTotal().compareTo(decoded.getTotal()));
      assertEquals(1, decoded.getSchemaVersion());
      assertThrows(Exception.class, () -> deserializer.deserialize(topic, "{broken".getBytes(StandardCharsets.UTF_8)));
    }
  }

  @Test @Order(2) void duplicateSameEventOneEffect() {
    var input = event();
    inbox.accept(input); inbox.accept(input);
    assertEquals(1, count("notifications", input));
    assertEquals(1, count("processed_events", input));
  }

  @Test @Order(3) void newEventSameOrderIsNotDropped() {
    var a = event(); var b = event();
    inbox.accept(a); inbox.accept(b);
    assertEquals(1, count("notifications", a));
    assertEquals(1, count("notifications", b));
  }

  @Test @Order(4) void invalidContractDoesNotMarkProcessed() {
    var a = event(); a.setSchemaVersion(2);
    assertThrows(InvalidEventException.class, () -> inbox.accept(a));
    assertEquals(0, count("processed_events", a));
    var b = event(); b.setTotal(new BigDecimal("1.001"));
    assertThrows(InvalidEventException.class, () -> inbox.accept(b));
  }

  @Test @Order(5) void databaseFailureRollsBackMarkerAndRetryWorks() {
    var a = event(); a.setCustomerId(999L);
    jdbc.execute("ALTER TABLE notifications ADD CONSTRAINT qa_reject CHECK (customer_id <> 999)");
    try {
      assertThrows(RuntimeException.class, () -> inbox.accept(a));
      assertEquals(0, count("processed_events", a));
      assertEquals(0, count("notifications", a));
    } finally { jdbc.execute("ALTER TABLE notifications DROP CONSTRAINT qa_reject"); }
    inbox.accept(a);
    assertEquals(1, count("notifications", a));
  }

  @Test @Order(6) void outerRollbackRemovesBothRows() {
    var a = event();
    new TransactionTemplate(context.getBean(PlatformTransactionManager.class)).executeWithoutResult(status -> {
      inbox.accept(a); status.setRollbackOnly();
    });
    assertEquals(0, count("processed_events", a));
    assertEquals(0, count("notifications", a));
  }

  @Test @Order(7) void concurrentDuplicateStillOneEffect() throws Exception {
    var a = event(); var gate = new CountDownLatch(1);
    ExecutorService pool = Executors.newFixedThreadPool(2);
    try {
      Callable<Void> work = () -> { gate.await(); inbox.accept(a); return null; };
      var x = pool.submit(work); var y = pool.submit(work); gate.countDown();
      x.get(10, TimeUnit.SECONDS); y.get(10, TimeUnit.SECONDS);
      assertEquals(1, count("notifications", a));
      assertEquals(1, count("processed_events", a));
    } finally { pool.shutdownNow(); }
  }

  @Test @Order(8) void producerAckWithoutConsumerAndSameKeyPartition() throws Exception {
    var a = event(); var b = event();
    var x = publisher.publish(a).get(20, TimeUnit.SECONDS).getRecordMetadata();
    var y = publisher.publish(b).get(20, TimeUnit.SECONDS).getRecordMetadata();
    assertEquals(x.partition(), y.partition());
    assertTrue(y.offset() > x.offset());
    assertEquals(0, count("notifications", a));
  }

  @Test @Order(9) void brokerListenerCommitsAndDeduplicates() throws Exception {
    registry.start();
    waitFor(() -> registry.getListenerContainers().stream().allMatch(c -> c.getAssignedPartitions() != null && c.getAssignedPartitions().size() == 3));
    var a = event();
    publisher.publish(a).get(20, TimeUnit.SECONDS);
    var result = publisher.publish(a).get(20, TimeUnit.SECONDS).getRecordMetadata();
    waitFor(() -> count("notifications", a) == 1);
    waitFor(() -> {
      try {
        var offsets = admin.listConsumerGroupOffsets(group).partitionsToOffsetAndMetadata().get(2, TimeUnit.SECONDS);
        var committed = offsets.get(new TopicPartition(topic, result.partition()));
        return committed != null && committed.offset() >= result.offset() + 1;
      } catch (Exception ex) { return false; }
    });
    assertEquals(1, count("processed_events", a));
  }

  @Test @Order(10) void invalidContractAndRawJsonGoToDlt() throws Exception {
    var invalid = event(); invalid.setSchemaVersion(9);
    var badMetadata = publisher.publish(invalid).get(20, TimeUnit.SECONDS).getRecordMetadata();
    byte[] raw = "{not-json".getBytes(StandardCharsets.UTF_8);
    var rawMetadata = template.send(topic, "101", raw).get(20, TimeUnit.SECONDS).getRecordMetadata();
    Properties props = new Properties();
    props.put("bootstrap.servers", "localhost:9092");
    props.put("group.id", "qa-dlt-observer-" + UUID.randomUUID());
    props.put("enable.auto.commit", "false");
    try (var consumer = new KafkaConsumer<String, byte[]>(props, new StringDeserializer(), new ByteArrayDeserializer())) {
      var partitions = List.of(new TopicPartition(topic + "-dlt", 0), new TopicPartition(topic + "-dlt", 1), new TopicPartition(topic + "-dlt", 2));
      consumer.assign(partitions); consumer.seekToBeginning(partitions);
      boolean foundRaw = false; boolean foundInvalid = false;
      long end = System.nanoTime() + TimeUnit.SECONDS.toNanos(30);
      while (System.nanoTime() < end && !(foundRaw && foundInvalid)) {
        for (var record : consumer.poll(Duration.ofMillis(300))) {
          assertNotNull(record.headers().lastHeader("kafka_dlt-original-topic"));
          if (Arrays.equals(raw, record.value())) {
            foundRaw = true; assertEquals(rawMetadata.partition(), record.partition());
          }
          if (new String(record.value(), StandardCharsets.UTF_8).contains(invalid.getEventId())) {
            foundInvalid = true; assertEquals(badMetadata.partition(), record.partition());
          }
        }
      }
      assertTrue(foundRaw, "DLT must preserve malformed bytes exactly");
      assertTrue(foundInvalid, "DLT must contain invalid business event");
      assertEquals(0, count("notifications", invalid));
      assertEquals(0, count("processed_events", invalid));
    }
  }

  @Test @Order(11) void retryableFailureHasThreeAttemptsThenDlt() throws Exception {
    var a = event();
    var attempts = new AtomicInteger();
    MethodInterceptor advice = invocation -> {
      if (invocation.getMethod().getName().equals("accept")
          && invocation.getArguments()[0] instanceof OrderPlacedEvent e
          && a.getEventId().equals(e.getEventId())) {
        attempts.incrementAndGet();
        throw new IllegalStateException("QA transient failure");
      }
      return invocation.proceed();
    };
    var advised = (Advised) inbox;
    advised.addAdvice(0, advice);
    try {
      publisher.publish(a).get(20, TimeUnit.SECONDS);
      Properties props = new Properties();
      props.put("bootstrap.servers", "localhost:9092");
      props.put("group.id", "qa-retry-observer-" + UUID.randomUUID());
      props.put("enable.auto.commit", "false");
      try (var consumer = new KafkaConsumer<String, byte[]>(props, new StringDeserializer(), new ByteArrayDeserializer())) {
        var partitions = List.of(new TopicPartition(topic + "-dlt", 0), new TopicPartition(topic + "-dlt", 1), new TopicPartition(topic + "-dlt", 2));
        consumer.assign(partitions); consumer.seekToBeginning(partitions);
        boolean found = false;
        long end = System.nanoTime() + TimeUnit.SECONDS.toNanos(30);
        while (System.nanoTime() < end && !found) {
          for (var record : consumer.poll(Duration.ofMillis(300))) {
            if (new String(record.value(), StandardCharsets.UTF_8).contains(a.getEventId())) found = true;
          }
        }
        assertTrue(found, "Retryable failure must reach DLT");
        assertEquals(3, attempts.get());
        assertEquals(0, count("notifications", a));
      }
    } finally { advised.removeAdvice(advice); }
  }
}
`);
const args = ['-B', '-ntp', ...(process.env.M52_MAVEN_ONLINE === '1' ? [] : ['-o']),
  ...(fault ? ['-Dtest=LessonTest#databaseFailureRollsBackMarkerAndRetryWorks'] : []), 'test'];
console.log(`QA fixture: ${tmp}; Java files: ${extracted}`);
const result = spawnSync('mvn', args, { cwd: tmp, encoding: 'utf8', timeout: 240000, maxBuffer: 16 * 1024 * 1024 });
const log = (result.stdout || '') + (result.stderr || '');
write('qa-tests.log', log);
console.log(log.split('\n').filter(l => /Tests run:|BUILD SUCCESS|BUILD FAILURE|\[ERROR\]/.test(l)).slice(-30).join('\n'));
if (result.error) console.log(result.error.message);
console.log('No shopcore edits. Lab uses real broker and PostgreSQL; not SMTP/outbox/HA or a crash-injection proof.');
if (fault) {
  const caught = result.status !== 0 && /Tests run: 1, Failures: 1, Errors: 0/.test(log);
  console.log(caught ? 'PASS intentional missing transaction caught by assertion' : 'FAIL fault was not caught by an assertion');
  process.exitCode = caught ? 0 : 1;
} else {
  process.exitCode = result.status === 0 ? 0 : 1;
}
