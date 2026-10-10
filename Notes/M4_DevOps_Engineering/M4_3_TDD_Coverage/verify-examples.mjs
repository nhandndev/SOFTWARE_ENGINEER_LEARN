import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const dir = path.dirname(fileURLToPath(import.meta.url));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'm43-qa-'));
console.log(`QA fixture/logs: ${temp}`);
const lesson = n => fs.readFileSync(path.join(dir, fs.readdirSync(dir).find(f => f.startsWith(`LESSON_0${n}_`))), 'utf8');
const blocks = (text, lang) => [...text.matchAll(new RegExp('```' + lang + '\\n([\\s\\S]*?)\\n```', 'g'))].map(m => m[1]);
const put = (file, data) => {
  const target = path.join(temp, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data);
};
const run = (label, expected, args = []) => {
  const result = spawnSync('mvn', ['-o', '-B', '-ntp', ...args, 'clean', 'verify'], { cwd: temp, encoding: 'utf8', timeout: 120000 });
  const log = `${result.stdout || ''}\n${result.stderr || ''}`;
  put(`qa-${label}.log`, log);
  if (result.error || (expected === 0 ? result.status !== 0 : result.status === 0 || result.status === null)) {
    throw new Error(`${label}: expected ${expected === 0 ? 'success' : 'failure'}, exit=${result.status}\n${log.slice(-9000)}`);
  }
  console.log(`PASS ${label}: expected Maven ${expected === 0 ? 'success' : 'failure'}`);
  return log;
};
const l1 = blocks(lesson(1), 'java');
const l2 = blocks(lesson(2), 'java');
const xml = blocks(lesson(3), 'xml');
const pom = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion><groupId>qa</groupId><artifactId>lesson-fixture</artifactId><version>1</version>
${xml[0].replace('</properties>', '<test.extraArgLine></test.extraArgLine><maven.compiler.release>21</maven.compiler.release><project.build.sourceEncoding>UTF-8</project.build.sourceEncoding></properties>')}
<dependencies>
<dependency><groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><version>6.0.3</version><scope>test</scope></dependency>
<dependency><groupId>org.mockito</groupId><artifactId>mockito-core</artifactId><version>5.23.0</version><scope>test</scope></dependency>
</dependencies><build>${xml[1].replace('<plugins>', `<plugins>
<plugin><groupId>org.apache.maven.plugins</groupId><artifactId>maven-clean-plugin</artifactId><version>3.5.0</version></plugin>
<plugin><groupId>org.apache.maven.plugins</groupId><artifactId>maven-resources-plugin</artifactId><version>3.3.1</version></plugin>
<plugin><groupId>org.apache.maven.plugins</groupId><artifactId>maven-compiler-plugin</artifactId><version>3.14.1</version></plugin>
<plugin><groupId>org.apache.maven.plugins</groupId><artifactId>maven-jar-plugin</artifactId><version>3.4.2</version></plugin>`).replace('<artifactId>maven-surefire-plugin</artifactId>', '<artifactId>maven-surefire-plugin</artifactId><version>3.5.6</version>').replace('<argLine>@{jacocoArgLine}</argLine>', '<argLine>@{jacocoArgLine} ${test.extraArgLine}</argLine>')}
</build></project>`;
put('pom.xml', pom);
const policyFile = 'src/main/java/com/shopcore/shipping/ShippingFeePolicy.java';
const policyTest = 'src/test/java/com/shopcore/shipping/ShippingFeePolicyTest.java';
put(policyFile, l1[1]);
put(policyTest, l1[0]);
const redLog = run('red-assertion', 1);
if (!/AssertionFailedError/.test(redLog)) throw new Error('Red was not an assertion failure');
put(policyFile, l1[2]);
put(policyTest, l1[3]);
run('green-policy', 0);
put('src/main/java/com/shopcore/shipping/UnitPriceReader.java', l2[0]);
put('src/main/java/com/shopcore/shipping/ShippingQuoteService.java', l2[1]);
put('src/test/java/com/shopcore/shipping/ShippingQuoteServiceTest.java', l2[2]);
// Only the two existing common API signatures are stubbed; no Spring/DB behavior is claimed.
put('src/main/java/com/shopcore/common/ErrorCode.java', 'package com.shopcore.common; public enum ErrorCode { INVALID_PARAMETER, PRODUCT_NOT_FOUND }');
put('src/main/java/com/shopcore/common/AppException.java', 'package com.shopcore.common; public class AppException extends RuntimeException { private final ErrorCode errorCode; public AppException(ErrorCode code) { errorCode=code; } public ErrorCode getErrorCode() { return errorCode; } }');
const mockitoAgent = path.join(os.homedir(), '.m2/repository/org/mockito/mockito-core/5.23.0/mockito-core-5.23.0.jar');
run('green-service-and-policy', 0, [`-Dtest.extraArgLine=-javaagent:${mockitoAgent}`]);
const passingXml = fs.readFileSync(path.join(temp, 'target/site/jacoco/jacoco.xml'), 'utf8');
if (!passingXml.includes('type="LINE"')) throw new Error('Missing LINE counters');
put(policyTest, l1[0]);
fs.rmSync(path.join(temp, 'src/test/java/com/shopcore/shipping/ShippingQuoteServiceTest.java'));
const lowLog = run('low-coverage', 1);
if (!/coverage checks have not been met|coverage ratio.*minimum/i.test(lowLog)) throw new Error('Failure did not come from coverage check');
put(policyTest, l1[3]);
put('pom.xml', pom.replace('<argLine>@{jacocoArgLine} ${test.extraArgLine}</argLine>', '<argLine>${test.extraArgLine}</argLine>'));
const missingLog = run('missing-agent', 0);
if (!/missing execution data/i.test(missingLog)) throw new Error('Expected JaCoCo missing-data skip');
if (fs.existsSync(path.join(temp, 'target/jacoco.exec')) || fs.existsSync(path.join(temp, 'target/site/jacoco/jacoco.xml'))) throw new Error('Expected no clean coverage data');
console.log('PASS missing-data file guard would reject otherwise-successful Maven run');
put('pom.xml', pom);
put(policyTest, 'package com.shopcore.shipping; class ShippingFeePolicyTest {}');
const zeroLog = run('zero-tests', 1);
if (!/No tests were executed/i.test(zeroLog)) throw new Error('Expected failIfNoTests failure');
put(policyTest, l1[3]);
put(policyFile, l1[2].replace('>= 0', '> 0'));
const boundaryLog = run('fault-boundary', 1);
if (!/AssertionFailedError/.test(boundaryLog)) throw new Error('Fault not caught by assertion');
put(policyFile, l1[2]);
put('src/test/java/com/shopcore/shipping/ShippingQuoteServiceTest.java', l2[2]);
run('restored-suite', 0, [`-Dtest.extraArgLine=-javaagent:${mockitoAgent}`]);
const failsafe = blocks(lesson(4), 'xml')[0].replace('<artifactId>maven-failsafe-plugin</artifactId>', '<artifactId>maven-failsafe-plugin</artifactId><version>3.5.5</version>').replace('<argLine>@{jacocoArgLine}</argLine>', '<argLine>@{jacocoArgLine} ${test.extraArgLine}</argLine>');
put('pom.xml', pom.replace('<plugins>', `<plugins>${failsafe}`));
const itFile = 'src/test/java/com/shopcore/shipping/ShippingFlowIT.java';
put(itFile, l1[0].replaceAll('ShippingFeePolicyTest', 'ShippingFlowIT'));
run('two-suites-agent', 0, [`-Dtest.extraArgLine=-javaagent:${mockitoAgent}`]);
put(itFile, l1[0].replaceAll('ShippingFeePolicyTest', 'ShippingFlowIT').replace('assertEquals(0,', 'assertEquals(1,'));
const itLog = run('failsafe-failure', 1, [`-Dtest.extraArgLine=-javaagent:${mockitoAgent}`]);
if (!/failsafe.*verify|maven-failsafe-plugin/i.test(itLog)) throw new Error('Expected Failsafe verification');
put(itFile, l1[0].replaceAll('ShippingFeePolicyTest', 'ShippingFlowIT'));
run('two-suites-restored', 0, [`-Dtest.extraArgLine=-javaagent:${mockitoAgent}`]);
const workflow = blocks(lesson(4), 'yaml')[0];
put('workflow.yml', workflow);
console.log(`QA fixture/logs: ${temp}`);
console.log('No shopcore files modified. MVC/JPA/DB/remote CI are not exercised by this fixture.');
