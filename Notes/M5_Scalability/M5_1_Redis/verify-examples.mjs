import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'm51-qa-'));
const port = Number(process.env.M51_REDIS_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Set M51_REDIS_PORT to an isolated localhost Redis lab, never production');
const put = (file, data) => {
  const target = path.join(temp, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data);
};
let writeBean;
for (const file of fs.readdirSync(dir).filter(f => /^LESSON_/.test(f))) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8');
  for (const m of text.matchAll(/<!-- verify: ([^\n]+) -->\n```java\n([\s\S]*?)\n```/g)) {
    if (m[1] === 'fragments/write-bean.java') writeBean = m[2];
    else put(`src/main/java/${m[1]}`, m[2]);
  }
}
const configFile = 'src/main/java/com/shopcore/catalog/CatalogCacheConfiguration.java';
let config = fs.readFileSync(path.join(temp, configFile), 'utf8');
config = config.slice(0, config.lastIndexOf('\n}')) + '\n' + writeBean + '\n}\n';
put(configFile, config);
put('pom.xml', `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>4.1.1</version><relativePath/></parent>
<groupId>qa</groupId><artifactId>redis-lesson-fixture</artifactId><version>1</version><properties><java.version>21</java.version></properties>
<dependencies>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-cache</artifactId></dependency>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-data-redis</artifactId></dependency>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-json</artifactId></dependency>
<dependency><groupId>org.springframework</groupId><artifactId>spring-tx</artifactId></dependency>
<dependency><groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><scope>test</scope></dependency>
</dependencies></project>`);
put('src/test/java/qa/RedisExamplesTest.java', `package qa;
import com.shopcore.catalog.*;
import io.lettuce.core.ClientOptions;
import io.lettuce.core.SocketOptions;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.*;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.*;
import org.springframework.core.env.MapPropertySource;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.*;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.JacksonJsonRedisSerializer;
import org.springframework.transaction.*;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.support.*;
import static org.junit.jupiter.api.Assertions.*;

class RedisExamplesTest {
  static final String PREFIX = "m51:qa:";
  AnnotationConfigApplicationContext context;
  ProductCatalogRead read;
  ProductCatalogWrite write;
  FakeSource source;
  StringRedisTemplate redis;
  CacheManager manager;
  ProductListQuery all() { return new ProductListQuery(null, null, 0, 10, null); }
  String key(ProductListQuery q) { return PREFIX + "productLists::" + q.cacheKey(); }

  @Configuration(proxyBeanMethods = false)
  @EnableTransactionManagement
  @Import(CatalogCacheConfiguration.class)
  static class TestConfig {
    @Bean LettuceConnectionFactory connectionFactory() {
      var server = new RedisStandaloneConfiguration("127.0.0.1", Integer.getInteger("m51.redis.port"));
      var client = LettuceClientConfiguration.builder().commandTimeout(Duration.ofMillis(500))
        .shutdownTimeout(Duration.ZERO).clientOptions(ClientOptions.builder().autoReconnect(false)
        .socketOptions(SocketOptions.builder().connectTimeout(Duration.ofMillis(300)).build()).build()).build();
      return new LettuceConnectionFactory(server, client);
    }
    @Bean FakeSource source() { return new FakeSource(); }
    @Bean PlatformTransactionManager transactionManager() { return new LocalTimingTransactionManager(); }
  }

  // Timing only: no JDBC resource, no claim of database rollback semantics.
  static class LocalTimingTransactionManager extends AbstractPlatformTransactionManager {
    protected Object doGetTransaction() { return new Object(); }
    protected void doBegin(Object transaction, TransactionDefinition definition) {}
    protected void doCommit(DefaultTransactionStatus status) {}
    protected void doRollback(DefaultTransactionStatus status) {}
  }

  static class FakeSource implements ProductCatalogSource {
    final AtomicInteger reads = new AtomicInteger();
    final Map<Long, ProductRow> rows = new HashMap<>(Map.of(
      10L, new ProductRow(10L, "Java", new BigDecimal("250000.00")),
      11L, new ProductRow(11L, "Spring", new BigDecimal("250000.00")),
      20L, new ProductRow(20L, "Pen", new BigDecimal("10000"))));
    public ProductListPage findList(ProductListQuery q) {
      reads.incrementAndGet();
      Comparator<ProductRow> order = switch(q.getSort()) {
        case "price,asc" -> Comparator.comparing(ProductRow::getPrice).thenComparing(ProductRow::getId);
        case "price,desc" -> Comparator.comparing(ProductRow::getPrice).reversed().thenComparing(ProductRow::getId);
        case "name,asc" -> Comparator.comparing(ProductRow::getName).thenComparing(ProductRow::getId);
        default -> Comparator.comparing(ProductRow::getId);
      };
      var filtered = rows.values().stream()
        .filter(r -> q.getCategoryId() == null || q.getCategoryId() == (r.getId() == 20 ? 2 : 1))
        .filter(r -> r.getName().toLowerCase(Locale.ROOT).contains(q.getKeyword()))
        .sorted(order).toList();
      var page = filtered.stream().skip((long)q.getPage()*q.getSize()).limit(q.getSize())
        .map(r -> new ProductRow(r.getId(), r.getName(), r.getPrice())).toList();
      return new ProductListPage(page, q.getPage(), q.getSize(), filtered.size());
    }
    public void rename(long id, String name) {
      ProductRow row = rows.get(id);
      if (row == null) throw new IllegalStateException("Synthetic product not found");
      row.setName(name);
    }
  }

  @BeforeEach void setup() {
    context = new AnnotationConfigApplicationContext();
    context.getEnvironment().getPropertySources().addFirst(new MapPropertySource("qa", Map.of("shopcore.cache.prefix", PREFIX)));
    context.register(TestConfig.class);
    context.refresh();
    read = context.getBean(ProductCatalogRead.class); write = context.getBean(ProductCatalogWrite.class);
    source = context.getBean(FakeSource.class); manager = context.getBean(CacheManager.class);
    redis = new StringRedisTemplate(context.getBean(LettuceConnectionFactory.class));
    manager.getCache("productLists").clear();
  }
  @AfterEach void close() {
    try { if (manager != null) manager.getCache("productLists").clear(); }
    finally { if (context != null) context.close(); }
  }

  @Test void keyNormalizationAndVariants() {
    var q = new ProductListQuery(null," Java ",0,10,null);
    assertEquals(q.cacheKey(), new ProductListQuery(null,"java",0,10,"id,asc").cacheKey());
    var keys = new HashSet<>(List.of(q.cacheKey(), new ProductListQuery(1L,"java",0,10,null).cacheKey(),
      new ProductListQuery(null,"spring",0,10,null).cacheKey(), new ProductListQuery(null,"java",1,10,null).cacheKey(),
      new ProductListQuery(null,"java",0,20,null).cacheKey(), new ProductListQuery(null,"java",0,10,"price,desc").cacheKey()));
    assertEquals(6, keys.size());
  }

  @Test void validatesBeforeLookup() {
    assertThrows(IllegalArgumentException.class, () -> new ProductListQuery(null,null,-1,10,null));
    assertThrows(IllegalArgumentException.class, () -> new ProductListQuery(null,null,0,1000,null));
    assertThrows(IllegalArgumentException.class, () -> new ProductListQuery(0L,null,0,10,null));
    assertThrows(IllegalArgumentException.class, () -> new ProductListQuery(null,null,0,10,"secret,asc"));
    assertEquals(0, source.reads.get());
  }

  @Test void redisStringTtlOverwriteAndExpiry() throws Exception {
    String key = "m51:qa:cli:string";
    try {
      redis.opsForValue().set(key,"old",Duration.ofSeconds(60));
      assertEquals("old",redis.opsForValue().get(key));
      assertTrue(redis.getExpire(key) > 0 && redis.getExpire(key) <= 60);
      redis.opsForValue().set(key,"new"); assertEquals(-1L,redis.getExpire(key));
      redis.expire(key,Duration.ofMillis(150));
      long deadline = System.nanoTime()+TimeUnit.SECONDS.toNanos(3);
      while (redis.hasKey(key) && System.nanoTime()<deadline) Thread.sleep(30);
      assertNull(redis.opsForValue().get(key)); assertEquals(-2L,redis.getExpire(key));
    } finally { redis.delete(key); }
  }

  @Test void redisHashFieldsAndKeyTtl() {
    String key="m51:qa:cli:hash";
    try {
      redis.opsForHash().put(key,"name","Java"); redis.opsForHash().put(key,"price","250000");
      assertEquals("Java",redis.opsForHash().get(key,"name"));
      assertEquals(2,redis.opsForHash().entries(key).size());
      redis.expire(key,Duration.ofSeconds(60)); assertTrue(redis.getExpire(key)>0);
      assertThrows(RuntimeException.class, () -> redis.opsForValue().get(key));
    } finally { redis.delete(key); }
  }

  @Test void typedJsonRoundTrip() {
    var serializer=new JacksonJsonRedisSerializer<>(ProductListPage.class);
    var before=source.findList(all()); var after=serializer.deserialize(serializer.serialize(before));
    assertInstanceOf(ProductListPage.class,after); assertInstanceOf(ProductRow.class,after.getContent().getFirst());
    assertEquals(3,after.getTotalElements()); assertEquals(1,after.getTotalPages());
    assertEquals(0,after.getContent().getFirst().getPrice().compareTo(new BigDecimal("250000")));
  }

  @Test void missThenHitRealRedisPrefixAndTtl() {
    var first=read.list(all()); var second=read.list(all());
    assertEquals(1,source.reads.get()); assertNotSame(first,second);
    assertEquals(3,second.getTotalElements()); assertEquals("Java",second.getContent().getFirst().getName());
    assertTrue(redis.opsForValue().get(key(all())).contains("content"));
    assertTrue(redis.getExpire(key(all()))>0 && redis.getExpire(key(all()))<=60);
  }

  @Test void variantsDoNotCollideAndEmptyPageCaches() {
    var first=new ProductListQuery(null,null,0,1,null); var second=new ProductListQuery(null,null,1,1,null);
    assertEquals(10L,read.list(first).getContent().getFirst().getId());
    assertEquals(11L,read.list(second).getContent().getFirst().getId());
    assertEquals(3,read.list(second).getTotalPages());
    var empty=new ProductListQuery(null,"missing",0,10,null);
    assertTrue(read.list(empty).getContent().isEmpty()); read.list(empty);
    assertEquals(3,source.reads.get());
  }

  @Test void expiredEntryReloadsSource() throws Exception {
    read.list(all()); assertEquals(1,source.reads.get());
    redis.expire(key(all()),Duration.ofMillis(250));
    Long before=redis.getExpire(key(all()),TimeUnit.MILLISECONDS);
    redis.opsForValue().get(key(all())); Thread.sleep(60);
    Long after=redis.getExpire(key(all()),TimeUnit.MILLISECONDS);
    assertTrue(after < before);
    long deadline=System.nanoTime()+TimeUnit.SECONDS.toNanos(3);
    while(redis.hasKey(key(all())) && System.nanoTime()<deadline) Thread.sleep(30);
    assertFalse(redis.hasKey(key(all())));
    read.list(all()); assertEquals(2,source.reads.get());
  }

  public static class SelfCallingRead extends ProductCatalogRead {
    public SelfCallingRead(ProductCatalogSource source) { super(source); }
    public ProductListPage internal(ProductListQuery q) { return list(q); }
  }
  @Test void directAndSelfInvocationBypassProxy() {
    var direct=new ProductCatalogRead(source); direct.list(all()); direct.list(all());
    assertEquals(2,source.reads.get());
    context.registerBean("selfCallingRead",SelfCallingRead.class,()->new SelfCallingRead(source));
    var self=context.getBean("selfCallingRead",SelfCallingRead.class);
    self.internal(all()); self.internal(all()); assertEquals(4,source.reads.get());
    assertFalse(redis.hasKey(key(all())));
  }

  @Test void renameInvalidatesAllListVariants() {
    var filtered=new ProductListQuery(1L,null,0,10,null);
    read.list(all()); read.list(filtered); assertEquals(2,source.reads.get());
    write.rename(10,"Advanced Java");
    assertFalse(redis.hasKey(key(all()))); assertFalse(redis.hasKey(key(filtered)));
    assertEquals("Advanced Java",read.list(all()).getContent().getFirst().getName());
    read.list(filtered); assertEquals(4,source.reads.get());
  }

  @Test void failedMutationDoesNotEvict() {
    read.list(all());
    assertThrows(IllegalArgumentException.class,()->write.rename(10," "));
    assertThrows(IllegalStateException.class,()->write.rename(999,"No product"));
    read.list(all()); assertEquals(1,source.reads.get()); assertTrue(redis.hasKey(key(all())));
  }

  @Test void outerCommitDefersClear() {
    read.list(all());
    var transaction=new TransactionTemplate(context.getBean(PlatformTransactionManager.class));
    transaction.execute(status->{
      // Uses cache decorator directly to isolate synchronization, independent of advisor order.
      manager.getCache("productLists").clear();
      assertTrue(redis.hasKey(key(all()))); return null;
    });
    assertFalse(redis.hasKey(key(all())));
  }

  @Test void rollbackDoesNotRunDeferredClear() {
    read.list(all());
    var transaction=new TransactionTemplate(context.getBean(PlatformTransactionManager.class));
    transaction.execute(status->{manager.getCache("productLists").clear(); status.setRollbackOnly(); return null;});
    assertTrue(redis.hasKey(key(all())));
  }
}
`);
put('src/test/java/qa/RedisOutageTest.java', `package qa;
import com.shopcore.catalog.*;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.core.env.MapPropertySource;
import static org.junit.jupiter.api.Assertions.*;
class RedisOutageTest {
  @Test void defaultGetErrorDoesNotFallBackToSource() {
    try(var context=new AnnotationConfigApplicationContext()) {
      context.getEnvironment().getPropertySources().addFirst(new MapPropertySource("qa",Map.of("shopcore.cache.prefix","m51:qa:")));
      context.register(RedisExamplesTest.TestConfig.class); context.refresh();
      var source=context.getBean(RedisExamplesTest.FakeSource.class);
      assertThrows(org.springframework.data.redis.RedisConnectionFailureException.class,
        ()->context.getBean(ProductCatalogRead.class).list(new ProductListQuery(null,null,0,10,null)));
      assertEquals(0,source.reads.get());
    }
  }
}
`);
const run = (label, test, expectFailure = false) => {
  const r=spawnSync('mvn',['-o','-B','-ntp',`-Dm51.redis.port=${port}`,`-Dtest=${test}`,'test'],{cwd:temp,encoding:'utf8',timeout:120000});
  const out=`${r.stdout || ''}\n${r.stderr || ''}`; put(`qa-${label}.log`,out);
  if(r.error || (expectFailure ? r.status===0 || !out.includes('AssertionFailedError') : r.status!==0)) throw new Error(`${label}: exit=${r.status}\n${out.slice(-10000)}`);
  console.log(`PASS ${label}${expectFailure ? ' (deliberate fault detected)' : ''}`);
};
console.log(`QA fixture/logs: ${temp}`);
if(process.env.M51_REDIS_DOWN === '1') {
  run('redis-down-default-no-fallback','RedisOutageTest');
} else {
  run('13-functional-tests','RedisExamplesTest');
  const keyFile='src/main/java/com/shopcore/catalog/ProductListQuery.java';
  const keySource=fs.readFileSync(path.join(temp,keyFile),'utf8');
  put(keyFile,keySource.replace('+ "|page=" + page','+ "|page=" + 0'));
  run('fault-missing-page','RedisExamplesTest#keyNormalizationAndVariants',true);
  put(keyFile,keySource);
  const writeFile='src/main/java/com/shopcore/catalog/ProductCatalogWrite.java';
  const writeSource=fs.readFileSync(path.join(temp,writeFile),'utf8');
  put(writeFile,writeSource.replace('@CacheEvict(cacheNames = "productLists", allEntries = true)','/* deliberate fault: no invalidation */'));
  run('fault-no-eviction','RedisExamplesTest#renameInvalidatesAllListVariants',true);
  put(writeFile,writeSource);
  run('restored-suite','RedisExamplesTest');
}
console.log('No shopcore changes. Source and transaction manager are fakes; not a PostgreSQL/HTTP/concurrency/latency benchmark.');
