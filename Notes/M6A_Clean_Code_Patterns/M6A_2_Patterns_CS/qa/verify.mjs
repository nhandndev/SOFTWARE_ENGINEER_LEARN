import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const moduleDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(moduleDir, '../../..');
const lessons = fs.readdirSync(moduleDir).filter(f => /^LESSON_\d\d_.*\.md$/.test(f)).sort();
const examsDir = path.join(root, 'Exams/de-kiem-tra');
const exams = fs.readdirSync(examsDir).filter(f => /^M6A-2-patterns-cs__2026-10-08__lesson[1-4]-lan1(?:__DAPAN)?\.md$/.test(f));
const files = [
  ...fs.readdirSync(moduleDir).filter(f => f.endsWith('.md')).map(f => path.join(moduleDir, f)),
  ...exams.map(f => path.join(examsDir, f)),
];
const documents = new Map(files.map(f => [f, fs.readFileSync(f, 'utf8')]));

function audit(docs) {
  const errors = [];
  let questions = 0, rubrics = 0, links = 0, snippets = 0;
  if (lessons.length !== 4 || exams.length !== 8) errors.push('Expected four lessons and four exam/answer pairs');
  for (const [file, content] of docs) {
    if (content.split('\n').filter(l => l.startsWith('```')).length % 2) errors.push(`${file}: fence imbalance`);
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|#)/.test(match[1])) continue;
      const target = path.resolve(path.dirname(file), match[1].split('#')[0]);
      links++;
      if (!fs.existsSync(target)) errors.push(`${file}: missing link ${match[1]}`);
    }
    if (path.basename(file).startsWith('LESSON_0')) {
      if (!content.includes('## Tài liệu / video') || !content.includes('Video: tìm')) errors.push(`${file}: resources missing`);
      snippets += [...content.matchAll(/<!-- verify: .*? -->\n```java\n/g)].length;
    }
    if (/lesson[1-4]-lan1\.md$/.test(file)) {
      const sections = content.split(/^## Câu \d+.*$/m).slice(1);
      if (sections.length !== 8) errors.push(`${file}: expected eight questions`);
      questions += sections.length;
      for (const section of sections) {
        const asks = section.match(/\*\*Cần nói đủ:\*\*\n([\s\S]*?)\n\*\*Trả lời:\*\*/);
        if (!asks || asks[1].split('\n').filter(l => l.startsWith('- ')).length !== 5) {
          errors.push(`${file}: expected five public asks and answer slot`);
        }
      }
    }
    if (file.endsWith('__DAPAN.md')) {
      const rows = content.split('\n').filter(l => /^\| [1-8] \|/.test(l));
      rubrics += rows.length;
      if (rows.length !== 8 || [...content.matchAll(/^## Câu \d+/gm)].length !== 8) errors.push(`${file}: incomplete rubric/solutions`);
      for (const row of rows) if ([...row.matchAll(/\(1\)/g)].length !== 5 || /\([2-9]\)/.test(row)) {
        errors.push(`${file}: expected five one-point criteria`);
      }
    }
  }
  if (questions !== 32 || rubrics !== 32 || snippets !== 5) errors.push('Counts must be 32 questions, 32 rubrics, five literal samples');
  return { markdownFiles: docs.size, lessons: lessons.length, questions, rubrics, links, snippets, errors };
}

if (process.argv.includes('--self-test')) {
  if (audit(documents).errors.length) throw Error('Fix baseline audit errors before running checker fault probes');
  const lesson = path.join(moduleDir, lessons[0]);
  const exam = path.join(examsDir, exams.find(f => f.endsWith('lesson1-lan1.md')));
  const answer = path.join(examsDir, exams.find(f => f.endsWith('lesson1-lan1__DAPAN.md')));
  const mutations = [
    [lesson, s => s + '\n```java\n'],
    [lesson, s => s + '\n[broken](missing-file-for-fault.md)\n'],
    [lesson, s => s.replace('Video: tìm', 'Video: missing')],
    [exam, s => s.replace(/^- .*\n/m, '')],
    [answer, s => s.replace('(1)', '(2)')],
  ];
  for (const [file, mutate] of mutations) {
    const changed = new Map(documents);
    changed.set(file, mutate(changed.get(file)));
    if (!audit(changed).errors.length) throw Error('Checker failed to detect injected structural fault');
  }
  console.log('PASS five structural fault probes; not a semantic review substitute');
}
const report = audit(documents);
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exit(1);

const fault = process.argv.find(s => s.startsWith('--fault='))?.split('=')[1];
const faults = {
  adapter: ['IntegrationExample.java', 'BigDecimal.valueOf(cents, 2)', 'BigDecimal.valueOf(cents, 1)'],
  copy: ['CreationFamilyExample.java', 'return new ReportTemplate(newName, columns);', 'return this;'],
  guard: ['CompositionExample.java', 'if (!allowed.getAsBoolean())', 'if (allowed.getAsBoolean())'],
  wrapper: ['CompositionExample.java', 'return prefix + next.read();', 'return next.read() + prefix;'],
};
if (fault && !faults[fault]) throw Error('Unknown fault');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'patterns-cs-qa-'));
const sources = [];
let applied = false;
for (const file of lessons) {
  const content = fs.readFileSync(path.join(moduleDir, file), 'utf8');
  for (const match of content.matchAll(/<!-- verify: (.*?) -->\n```java\n([\s\S]*?)\n```/g)) {
    const target = path.join(temp, match[1]);
    let source = match[2];
    if (fault && match[1].endsWith(faults[fault][0])) {
      const changed = source.replace(faults[fault][1], faults[fault][2]);
      if (changed === source) throw Error('Fault not applied');
      source = changed;
      applied = true;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, source);
    sources.push(target);
  }
}
if (fault && !applied) throw Error('No fault target');
sources.push(path.join(moduleDir, 'qa/PatternChecks.java'));
const classes = path.join(temp, 'classes');
fs.mkdirSync(classes);
const executable = name => process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', name) : name;
for (const [name, args] of [
  ['javac', ['--release', '21', '-d', classes, ...sources]],
  ['java', ['-cp', classes, 'learning.patterns.PatternChecks']],
]) {
  const result = spawnSync(executable(name), args, { encoding: 'utf8' });
  if (result.error) throw result.error;
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  if (result.status !== 0) {
    console.log('QA temp:', temp);
    process.exit(result.status ?? 1);
  }
}
console.log('QA temp:', temp);
