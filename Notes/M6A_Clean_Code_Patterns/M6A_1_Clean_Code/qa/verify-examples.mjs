import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'clean-code-qa-'));
const sources = [];
for (const file of fs.readdirSync(dir).filter(f => /^LESSON_\d\d_/.test(f))) {
  const body = fs.readFileSync(path.join(dir, file), 'utf8');
  for (const m of body.matchAll(/<!-- verify: (.*?) -->\n```java\n([\s\S]*?)\n```/g)) {
    const target = path.join(temp, m[1]);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    let source = m[2];
    if (process.argv.includes('--fault') && m[1].endsWith('ShippingFeeAfter.java')) {
      const changed = source.replace('compareTo(new BigDecimal("500")) >= 0', 'compareTo(new BigDecimal("500")) > 0');
      if (changed === source) throw Error('Fault mutation not applied');
      source = changed;
    }
    fs.writeFileSync(target, source);
    sources.push(target);
  }
}
if (sources.length !== 3) throw Error('Expected three literal lesson classes');
const test = path.join(temp, 'learning/clean/ExampleChecks.java');
fs.writeFileSync(test, `package learning.clean;
import java.math.BigDecimal;
import java.util.Currency;
public class ExampleChecks {
    static int checks;
    static void check(boolean value, String message) {
        checks++;
        if (!value) throw new AssertionError(message);
    }
    static void error(Runnable action, String message) {
        try { action.run(); throw new AssertionError("Expected error: " + message); }
        catch (IllegalArgumentException exception) { check(message.equals(exception.getMessage()), "error contract: " + exception); }
    }
    static BigDecimal decimal(String value) { return new BigDecimal(value); }
    public static void main(String[] args) {
        ShippingFeeBefore before = new ShippingFeeBefore();
        ShippingFeeAfter after = new ShippingFeeAfter();
        String[][] cases = {
            {"STANDARD", "0", "25"}, {"STANDARD", "499.99", "25"},
            {"STANDARD", "500", "0"}, {"STANDARD", "500.00", "0"},
            {"STANDARD", "500.01", "0"}, {"EXPRESS", "0", "40"}, {"EXPRESS", "1000", "40"}
        };
        for (String[] row : cases) {
            BigDecimal expected = decimal(row[2]);
            BigDecimal a = before.calculate(row[0], decimal(row[1]));
            BigDecimal b = after.calculate(row[0], decimal(row[1]));
            check(a.compareTo(expected) == 0, "before oracle " + row[0] + " " + row[1]);
            check(b.compareTo(expected) == 0, "after oracle " + row[0] + " " + row[1]);
            check(a.equals(b), "before/after representation " + row[1]);
        }
        error(() -> before.calculate(null, null), "method is required");
        error(() -> after.calculate(null, null), "method is required");
        error(() -> before.calculate("STANDARD", null), "subtotal must be non-negative");
        error(() -> after.calculate("STANDARD", null), "subtotal must be non-negative");
        error(() -> before.calculate("STANDARD", decimal("-1")), "subtotal must be non-negative");
        error(() -> after.calculate("STANDARD", decimal("-1")), "subtotal must be non-negative");
        error(() -> before.calculate("UNKNOWN", decimal("10")), "unsupported method");
        error(() -> after.calculate("UNKNOWN", decimal("10")), "unsupported method");
        error(() -> before.calculate("UNKNOWN", null), "subtotal must be non-negative");
        error(() -> after.calculate("UNKNOWN", null), "subtotal must be non-negative");
        Currency usd = Currency.getInstance("USD");
        ProductPrice price = new ProductPrice(decimal("1.00"), usd);
        ProductPrice sum = price.add(new ProductPrice(decimal("2.00"), usd));
        check(sum.getAmount().equals(decimal("3.00")), "sum representation");
        check(sum.getCurrency().equals(usd), "sum currency");
        check(price.getAmount().equals(decimal("1.00")), "source not mutated");
        check(sum != price, "new object");
        check(new ProductPrice(BigDecimal.ZERO, usd).getAmount().signum() == 0, "zero allowed");
        error(() -> new ProductPrice(null, usd), "amount must be non-negative");
        error(() -> new ProductPrice(decimal("-0.01"), usd), "amount must be non-negative");
        error(() -> new ProductPrice(BigDecimal.ONE, null), "currency is required");
        error(() -> price.add(null), "currency mismatch");
        error(() -> price.add(new ProductPrice(BigDecimal.ONE, Currency.getInstance("VND"))), "currency mismatch");
        System.out.println("PASS " + checks + " explicit checks; pure Java lesson samples only");
    }
}
`);
sources.push(test);
const executable = name => process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', name) : name;
const classes = path.join(temp, 'classes');
fs.mkdirSync(classes);
const compile = spawnSync(executable('javac'), ['--release', '21', '-d', classes, ...sources], { encoding: 'utf8' });
if (compile.error) throw compile.error;
if (compile.status !== 0) { process.stderr.write(compile.stderr); process.exit(compile.status ?? 1); }
const run = spawnSync(executable('java'), ['-cp', classes, 'learning.clean.ExampleChecks'], { encoding: 'utf8' });
if (run.error) throw run.error;
process.stdout.write(run.stdout); process.stderr.write(run.stderr);
console.log('QA temp:', temp);
process.exitCode = run.status ?? 1;
