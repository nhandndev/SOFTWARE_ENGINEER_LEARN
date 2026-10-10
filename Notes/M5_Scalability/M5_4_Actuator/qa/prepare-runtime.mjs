import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = process.env.M54_QA_DIR || path.join(os.tmpdir(), 'm54-actuator-qa');
const write = (file, body) => {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body);
};
// Mechanically extract the literal lesson snippets; no separately maintained sample classes.
for (const file of fs.readdirSync(docs).filter(f => /^LESSON_\d\d_/.test(f))) {
  const body = fs.readFileSync(path.join(docs, file), 'utf8');
  for (const match of body.matchAll(/<!-- verify: (.*?) -->\n```java\n([\s\S]*?)\n```/g)) {
    write(`src/main/java/${match[1]}`, match[2] + '\n');
  }
  for (const match of body.matchAll(/<!-- verify-yaml: (.*?) -->\n```yaml\n([\s\S]*?)\n```/g)) {
    write(`src/main/resources/${match[1]}`, match[2] + '\n');
  }
}
write('pom.xml', `<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>4.1.1</version><relativePath/></parent>
<groupId>com.shopcore</groupId><artifactId>actuator-doc-qa</artifactId><version>0.0.1</version>
<properties><java.version>21</java.version></properties>
<dependencies>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc</artifactId></dependency>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-actuator</artifactId></dependency>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-security</artifactId></dependency>
<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-webmvc-test</artifactId><scope>test</scope></dependency>
</dependencies></project>
`);
write('src/test/java/com/shopcore/observability/ActuatorRuntimeTest.java', `package com.shopcore.observability;

import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.*;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ActuatorRuntimeTest {
    ConfigurableApplicationContext context;
    Path directory;
    String base;
    final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(3)).build();
    final JsonMapper json = JsonMapper.builder().build();

    @SpringBootApplication
    static class TestApplication {
        @Bean UserDetailsService qaUsers() {
            return new InMemoryUserDetailsManager(
                    User.withUsername("ops").password("{noop}qa-only").roles("OPS").build(),
                    User.withUsername("ordinary").password("{noop}qa-only").roles("USER").build());
        }
        @Bean QaController qaController(CatalogLookupMetrics metrics) { return new QaController(metrics); }
    }

    @RestController
    static class QaController {
        final CatalogLookupMetrics metrics;
        QaController(CatalogLookupMetrics metrics) { this.metrics = metrics; }
        @GetMapping("/qa/lookup")
        Map<String, Object> lookup(@RequestParam(defaultValue="false") boolean fail,
                @RequestParam(defaultValue="0") int page) {
            return metrics.measure(() -> {
                if (fail) throw new IllegalArgumentException("qa failure");
                return Map.of("page", page);
            });
        }
    }

    @BeforeAll void start() throws Exception {
        directory = Files.createTempDirectory("m54-directory-");
        context = SpringApplication.run(TestApplication.class,
                "--server.port=0", "--ACTUATOR_PASSWORD=qa-only",
                "--shopcore.upload.directory=" + directory,
                "--logging.level.root=WARN", "--debug=false");
        base = "http://127.0.0.1:" + context.getEnvironment().getProperty("local.server.port");
    }
    @AfterAll void stop() throws Exception {
        if (context != null) context.close();
        if (directory != null) Files.deleteIfExists(directory);
    }
    HttpResponse<String> get(String route, String username) throws Exception {
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(base + route))
                .timeout(Duration.ofSeconds(5)).GET();
        if (username != null) request.header("Authorization", "Basic " + Base64.getEncoder().encodeToString(
                (username + ":qa-only").getBytes(StandardCharsets.UTF_8)));
        return client.send(request.build(), HttpResponse.BodyHandlers.ofString());
    }
    JsonNode body(HttpResponse<String> response) { return json.readTree(response.body()); }
    MeterRegistry registry() { return context.getBean(MeterRegistry.class); }
    double attempts() { return registry().get("shopcore.catalog.lookup.attempts").counter().count(); }
    long count(String outcome) { return registry().get("shopcore.catalog.lookup").tag("outcome", outcome).timer().count(); }

    @Test void anonymousHealthHidesDetails() throws Exception {
        var response = get("/actuator/health", null);
        assertEquals(200, response.statusCode());
        assertEquals("UP", body(response).get("status").asString());
        assertFalse(body(response).has("components"));
        assertFalse(response.body().contains(directory.toString()));
    }
    @Test void anonymousMetricsDenied() throws Exception { assertEquals(401, get("/actuator/metrics", null).statusCode()); }
    @Test void ordinaryRoleDenied() throws Exception { assertEquals(403, get("/actuator/metrics", "ordinary").statusCode()); }
    @Test void opsReadsMetrics() throws Exception { assertEquals(200, get("/actuator/metrics", "ops").statusCode()); }
    @Test void infoContributorProtectedAndPresent() throws Exception {
        assertEquals(401, get("/actuator/info", null).statusCode());
        var response = get("/actuator/info", "ops");
        assertEquals(200, response.statusCode());
        assertEquals("shopcore", body(response).get("application").get("name").asString());
    }
    @Test void sensitiveEndpointUnavailableEvenToOps() throws Exception {
        assertEquals(404, get("/actuator/env", "ops").statusCode());
        assertEquals(404, get("/actuator/heapdump", "ops").statusCode());
    }
    @Test void fallbackChainProtectsBusinessRoute() throws Exception { assertEquals(401, get("/qa/lookup", null).statusCode()); }
    @Test void downChangesRootAndReadinessNotLiveness() throws Exception {
        Files.delete(directory);
        try {
            var root = get("/actuator/health", "ops");
            assertEquals(503, root.statusCode());
            assertEquals("DOWN", body(root).get("status").asString());
            assertEquals("directory_unavailable", body(root).get("components").get("uploadDirectory")
                    .get("details").get("reason").asString());
            assertFalse(root.body().contains(directory.toString()));
            assertEquals(503, get("/actuator/health/readiness", null).statusCode());
            assertEquals(200, get("/actuator/health/liveness", null).statusCode());
        } finally { Files.createDirectories(directory); }
        assertEquals(200, get("/actuator/health/readiness", null).statusCode());
    }
    @Test void bindingErrorDoesNotEnterCustomHelper() throws Exception {
        double before = attempts();
        assertEquals(400, get("/qa/lookup?page=abc", "ops").statusCode());
        assertEquals(before, attempts());
    }
    @Test void helperCountsSuccessAndErrorWithoutSwallowing() {
        var helper = context.getBean(CatalogLookupMetrics.class);
        double before = attempts(); long ok = count("success"), error = count("error");
        assertEquals("ok", helper.measure(() -> "ok"));
        var failure = new IllegalArgumentException("expected");
        assertSame(failure, assertThrows(IllegalArgumentException.class,
                () -> helper.measure(() -> { throw failure; })));
        assertEquals(before + 2, attempts());
        assertEquals(ok + 1, count("success"));
        assertEquals(error + 1, count("error"));
    }
    @Test void inFlightOnlyCountsAttemptUntilCompletion() throws Exception {
        var helper = context.getBean(CatalogLookupMetrics.class);
        var entered = new CountDownLatch(1); var release = new CountDownLatch(1);
        double before = attempts(); long completed = count("success") + count("error");
        ExecutorService executor = Executors.newSingleThreadExecutor();
        try {
            var future = executor.submit(() -> helper.measure(() -> {
                entered.countDown();
                try { if (!release.await(3, TimeUnit.SECONDS)) throw new IllegalStateException("timeout"); }
                catch (InterruptedException exception) { Thread.currentThread().interrupt(); throw new IllegalStateException(exception); }
                return "done";
            }));
            assertTrue(entered.await(2, TimeUnit.SECONDS));
            assertEquals(before + 1, attempts());
            assertEquals(completed, count("success") + count("error"));
            release.countDown(); assertEquals("done", future.get(3, TimeUnit.SECONDS));
            assertEquals(completed + 1, count("success") + count("error"));
        } finally { release.countDown(); executor.shutdownNow(); }
    }
    @Test void endpointShowsCountUnitsAndBoundedTags() throws Exception {
        var helper = context.getBean(CatalogLookupMetrics.class);
        helper.measure(() -> "value");
        var response = get("/actuator/metrics/shopcore.catalog.lookup?tag=outcome:success", "ops");
        assertEquals(200, response.statusCode());
        var metric = body(response);
        assertEquals("seconds", metric.get("baseUnit").asString());
        boolean found = false;
        for (JsonNode measurement : metric.get("measurements")) {
            if (measurement.get("statistic").asString().equals("COUNT")) {
                assertEquals(count("success"), measurement.get("value").asDouble()); found = true;
            }
        }
        assertTrue(found);
        registry().getMeters().stream().filter(m -> m.getId().getName().startsWith("shopcore.catalog"))
            .forEach(m -> m.getId().getTags().forEach(t -> {
                assertEquals("outcome", t.getKey());
                assertTrue(Set.of("success", "error").contains(t.getValue()));
            }));
    }
    @Test void httpTimerAppearsAfterCompletedRequest() throws Exception {
        assertEquals(200, get("/qa/lookup", "ops").statusCode());
        assertEquals(200, get("/actuator/metrics/http.server.requests", "ops").statusCode());
    }
}
`);
if (process.env.M54_FAULT === 'public-metrics') {
  const file = path.join(out, 'src/main/java/com/shopcore/observability/ActuatorSecurityConfiguration.java');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('.anyRequest().hasRole("OPS")', '.anyRequest().permitAll()'));
}
console.log(`Extracted four Java classes and YAML into ${out}; QA-only users/controller are not learner source.`);
