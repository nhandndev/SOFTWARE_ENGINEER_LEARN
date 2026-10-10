import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const dir = path.dirname(fileURLToPath(import.meta.url));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'm44-qa-'));
const put = (file, value) => {
  const target = path.join(temp, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value);
};
const sources = [];
for (const name of fs.readdirSync(dir).filter(f => /^LESSON_/.test(f))) {
  const text = fs.readFileSync(path.join(dir, name), 'utf8');
  for (const match of text.matchAll(/<!-- verify: ([^\n]+) -->\n```(?:java|yaml)\n([\s\S]*?)\n```/g)) {
    const [relative, content] = match.slice(1);
    put(relative.startsWith('resources/') ? `src/main/${relative}` : `src/main/java/${relative}`, content);
    if (relative.endsWith('.java')) sources.push(relative);
  }
}
const run = (label, command, args) => {
  const r = spawnSync(command, args, { cwd: temp, encoding: 'utf8', timeout: 120000 });
  const output = `${r.stdout || ''}\n${r.stderr || ''}`;
  put(`qa-${label}.log`, output);
  if (r.error || r.status !== 0) throw new Error(`${label}: exit=${r.status}\n${output.slice(-9000)}`);
  return output;
};
console.log(`QA fixture/logs: ${temp}`);
const javaHome = process.env.JAVA_HOME;
if (!javaHome) throw new Error('Set JAVA_HOME to JDK21 before running');
const core = sources.filter(f => /shipping\/(domain|application)\//.test(f));
run('pure-core', path.join(javaHome, 'bin/javac'), ['--release', '21', '-d', 'pure-core', ...core.map(f => `src/main/java/${f}`)]);
console.log(`PASS core compiles without Spring/SLF4J/JPA classpath (${core.length} files)`);
put('pom.xml', `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>4.1.1</version><relativePath/></parent>
<groupId>qa</groupId><artifactId>logging-fixture</artifactId><version>1</version><properties><java.version>21</java.version></properties>
<dependencies>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency>
<dependency><groupId>org.springframework</groupId><artifactId>spring-test</artifactId><scope>test</scope></dependency>
<dependency><groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><scope>test</scope></dependency>
</dependencies></project>`);
put('src/test/java/qa/ExamplesTest.java', `package qa;
import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import com.shopcore.logging.*;
import com.shopcore.shipping.application.*;
import com.shopcore.shipping.domain.ShippingFeePolicy;
import com.shopcore.shipping.infrastructure.ShippingConfiguration;
import jakarta.servlet.ServletException;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import static org.junit.jupiter.api.Assertions.*;

class ExamplesTest {
  @AfterEach void clean() { MDC.clear(); }

  @Test void levelsAndContent() {
    Logger logger = (Logger) LoggerFactory.getLogger(SafeProductLog.class);
    Level previous = logger.getLevel();
    var appender = new ListAppender<ILoggingEvent>();
    appender.start(); logger.addAppender(appender); logger.setLevel(Level.INFO);
    try {
      var sample = new SafeProductLog(); sample.created(10); sample.details(10);
      assertEquals(1, appender.list.size());
      assertEquals(Level.INFO, appender.list.getFirst().getLevel());
      assertEquals("event=product_created productId=10", appender.list.getFirst().getFormattedMessage());
    } finally { logger.detachAppender(appender); appender.stop(); logger.setLevel(previous); }
  }

  @Test void acceptedIdAndResponseAndUnrelatedKey() throws Exception {
    var request = new MockHttpServletRequest(); request.addHeader("X-Request-ID", "demo_A");
    var response = new MockHttpServletResponse(); MDC.put("tenantMarker", "keep");
    new RequestIdFilter().doFilter(request, response, (req, res) -> assertEquals("demo_A", MDC.get("requestId")));
    assertEquals("demo_A", response.getHeader("X-Request-ID"));
    assertNull(MDC.get("requestId")); assertEquals("keep", MDC.get("tenantMarker"));
  }

  @Test void explicitChildDebugNotBlockedByRootInfo() {
    Logger root = (Logger) LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);
    Logger child = (Logger) LoggerFactory.getLogger("com.shopcore.qa.child");
    Level oldRoot = root.getLevel(); Level oldChild = child.getLevel();
    try { root.setLevel(Level.INFO); child.setLevel(Level.DEBUG); assertTrue(child.isDebugEnabled()); }
    finally { root.setLevel(oldRoot); child.setLevel(oldChild); }
  }

  @Test void throwableIsLastArgumentNotJustMessage() {
    Logger logger = (Logger) LoggerFactory.getLogger("com.shopcore.qa.throwable");
    var appender = new ListAppender<ILoggingEvent>(); appender.start(); logger.addAppender(appender);
    Level old = logger.getLevel(); logger.setLevel(Level.ERROR);
    try {
      var ex = new IllegalStateException("Safe synthetic exception");
      logger.error("event=product_lookup_failed productId={}", 10, ex);
      assertEquals(1, appender.list.size());
      assertEquals("event=product_lookup_failed productId=10", appender.list.getFirst().getFormattedMessage());
      assertEquals(IllegalStateException.class.getName(), appender.list.getFirst().getThrowableProxy().getClassName());
    } finally { logger.detachAppender(appender); appender.stop(); logger.setLevel(old); }
  }

  @Test void restoresPreviousOnThrow() {
    MDC.put("requestId", "outer");
    var request = new MockHttpServletRequest(); request.addHeader("X-Request-ID", "inner");
    assertThrows(ServletException.class, () -> new RequestIdFilter().doFilter(request, new MockHttpServletResponse(), (req, res) -> {
      assertEquals("inner", MDC.get("requestId")); throw new ServletException("synthetic safe failure");
    }));
    assertEquals("outer", MDC.get("requestId"));
  }

  @Test void sequentialMissingHeaderDoesNotReuseId() throws Exception {
    var filter = new RequestIdFilter(); var first = new MockHttpServletRequest(); first.addHeader("X-Request-ID", "A");
    filter.doFilter(first, new MockHttpServletResponse(), (req, res) -> assertEquals("A", MDC.get("requestId")));
    var second = new MockHttpServletResponse();
    filter.doFilter(new MockHttpServletRequest(), second, (req, res) -> assertNotEquals("A", MDC.get("requestId")));
    assertNotNull(second.getHeader("X-Request-ID")); assertNull(MDC.get("requestId"));
  }

  @Test void invalidAndDuplicateHeadersGenerateNewId() throws Exception {
    for (String input : new String[]{"x".repeat(100), "bad\\nID", "bad space"}) {
      var request = new MockHttpServletRequest(); request.addHeader("X-Request-ID", input);
      var response = new MockHttpServletResponse();
      new RequestIdFilter().doFilter(request, response, (req, res) -> assertNotEquals(input, MDC.get("requestId")));
      assertTrue(response.getHeader("X-Request-ID").matches("[A-Za-z0-9_-]{1,64}"));
    }
    var request = new MockHttpServletRequest(); request.addHeader("X-Request-ID", "A"); request.addHeader("X-Request-ID", "B");
    new RequestIdFilter().doFilter(request, new MockHttpServletResponse(), (req, res) -> {
      assertNotEquals("A", MDC.get("requestId")); assertNotEquals("B", MDC.get("requestId"));
    });
  }

  @Test void workerDoesNotInheritAndScopedCopyRestores() throws Exception {
    MDC.put("requestId", "caller");
    try (var executor = Executors.newSingleThreadExecutor()) {
      assertNull(executor.submit(() -> MDC.get("requestId")).get());
      Map<String,String> captured = MDC.getCopyOfContextMap();
      assertEquals("caller", executor.submit(() -> {
        var previous = MDC.getCopyOfContextMap();
        try { MDC.setContextMap(captured); return MDC.get("requestId"); }
        finally { if (previous == null) MDC.clear(); else MDC.setContextMap(previous); }
      }).get());
      assertNull(executor.submit(() -> MDC.get("requestId")).get());
    }
  }

  @Test void policyBoundariesAndInvalidData() {
    var policy = new ShippingFeePolicy();
    assertEquals(0, new BigDecimal("30000").compareTo(policy.calculate(BigDecimal.ZERO)));
    assertEquals(0, new BigDecimal("30000").compareTo(policy.calculate(new BigDecimal("499999.99"))));
    assertEquals(0, policy.calculate(new BigDecimal("500000.00")).compareTo(BigDecimal.ZERO));
    assertEquals(0, policy.calculate(new BigDecimal("600000")).compareTo(BigDecimal.ZERO));
    assertThrows(IllegalArgumentException.class, () -> policy.calculate(null));
    assertThrows(IllegalArgumentException.class, () -> policy.calculate(new BigDecimal("-1")));
  }

  @Test void useCaseContractAndShortCircuit() {
    var calls = new AtomicInteger();
    ProductPricePort port = id -> { calls.incrementAndGet(); return id == 10 ? Optional.of(new BigDecimal("250000")) : Optional.empty(); };
    var useCase = new QuoteShipping(port, new ShippingFeePolicy());
    assertEquals(0, useCase.quote(10, 1).compareTo(new BigDecimal("30000")));
    assertEquals(0, useCase.quote(10, 2).compareTo(BigDecimal.ZERO));
    assertThrows(ProductMissingException.class, () -> useCase.quote(20, 1));
    int before = calls.get();
    assertThrows(IllegalArgumentException.class, () -> useCase.quote(10, 0));
    assertThrows(IllegalArgumentException.class, () -> useCase.quote(0, 1));
    assertEquals(before, calls.get());
    var corrupt = new QuoteShipping(id -> Optional.of(new BigDecimal("-1")), new ShippingFeePolicy());
    assertThrows(IllegalArgumentException.class, () -> corrupt.quote(10, 1));
  }

  @Test void springComposition() {
    try (var context = new AnnotationConfigApplicationContext(ShippingConfiguration.class)) {
      assertEquals(0, context.getBean(QuoteShipping.class).quote(10, 2).compareTo(BigDecimal.ZERO));
      assertEquals(1, context.getBeansOfType(ProductPricePort.class).size());
    }
  }

  @Configuration(proxyBeanMethods = false)
  static class QaConfig {}

  @Test void bootStructuredOutput() {
    try (var context = new SpringApplicationBuilder(QaConfig.class).web(WebApplicationType.NONE).run()) {
      MDC.put("requestId", "qa_json");
      new ProductEvents().created(10);
      LoggerFactory.getLogger("com.shopcore.qa").atInfo()
        .addKeyValue("event", "qa_escape").addKeyValue("qaValue", "synthetic\\\"line\\nnext")
        .log("Safe synthetic escaping check");
    } finally { MDC.remove("requestId"); }
    LoggerFactory.getLogger("com.shopcore.qa").atInfo().addKeyValue("event", "qa_after_scope").log("After scope");
  }
}
`);
const output = run('maven-tests', 'mvn', ['-o', '-B', '-ntp', 'test']);
const events = output.split(/\r?\n/).filter(line => line.startsWith('{')).map(line => JSON.parse(line));
const event = events.find(e => e.requestId === 'qa_json' && e.event === 'product_created');
if (!event || event.productId !== 10 || event.level !== 'INFO' || !event['@timestamp'] || !event.logger_name) throw new Error('Boot JSON schema/MDC/key-value check failed');
const escaped = events.filter(e => e.event === 'qa_escape');
if (escaped.length !== 1 || escaped[0].qaValue !== 'synthetic"line\nnext') throw new Error('Escaping check failed');
const afterScope = events.find(e => e.event === 'qa_after_scope');
if (!afterScope || Object.hasOwn(afterScope, 'requestId')) throw new Error('MDC leaked into following Boot log event');
if (events.some(e => /password|authorization|jwtSecret/i.test(Object.keys(e).join(' ')))) throw new Error('Unexpected sensitive field in fixture');
console.log('PASS 12 JUnit tests: levels/throwable, filter lifecycle, invalid headers, executor scope, rules, port, Spring wiring');
console.log('PASS Boot real JSON output: parse, level, requestId, event, numeric productId, quote/newline escaping');
console.log('PASS following JSON event has no stale requestId');

const filterFile = 'src/main/java/com/shopcore/logging/RequestIdFilter.java';
const filterSource = fs.readFileSync(path.join(temp, filterFile), 'utf8');
put(filterFile, filterSource.replace('MDC.remove("requestId");', '/* deliberate fault: cleanup omitted */'));
const brokenCleanup = spawnSync('mvn', ['-o', '-B', '-ntp', '-Dtest=ExamplesTest#acceptedIdAndResponseAndUnrelatedKey', 'test'], { cwd: temp, encoding: 'utf8', timeout: 120000 });
const cleanupOutput = `${brokenCleanup.stdout || ''}\n${brokenCleanup.stderr || ''}`;
put('qa-fault-cleanup.log', cleanupOutput);
if (brokenCleanup.status === 0 || !cleanupOutput.includes('AssertionFailedError')) throw new Error('Deliberate cleanup fault was not caught by assertion');
put(filterFile, filterSource);
const policyFile = 'src/main/java/com/shopcore/shipping/domain/ShippingFeePolicy.java';
const policySource = fs.readFileSync(path.join(temp, policyFile), 'utf8');
put(policyFile, policySource.replace('>= 0', '> 0'));
const brokenBoundary = spawnSync('mvn', ['-o', '-B', '-ntp', '-Dtest=ExamplesTest#policyBoundariesAndInvalidData', 'test'], { cwd: temp, encoding: 'utf8', timeout: 120000 });
const boundaryOutput = `${brokenBoundary.stdout || ''}\n${brokenBoundary.stderr || ''}`;
put('qa-fault-boundary.log', boundaryOutput);
if (brokenBoundary.status === 0 || !boundaryOutput.includes('AssertionFailedError')) throw new Error('Deliberate boundary fault was not caught by assertion');
put(policyFile, policySource);
run('restored-tests', 'mvn', ['-o', '-B', '-ntp', 'test']);
console.log('PASS deliberate missing-cleanup and wrong-boundary faults caught; restored suite passes');
console.log('Not exercised: servlet filter order with Security, ERROR/ASYNC dispatch, JPA/DB, collector, real provider or secret-redaction system.');
