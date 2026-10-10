import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const modules = [
  ['M2-2', 'Notes/M2_Database/M2_2_PostgreSQL', 'M2-2-postgres', 4],
  ['M2-3', 'Notes/M2_Database/M2_3_Flyway', 'M2-3-flyway', 3],
  ['M2-4', 'Notes/M2_Database/M2_4_Performance', 'M2-4-perf-jpa', 4],
  ['M3-1', 'Notes/M3_API_Security/M3_1_REST_Best_Practices', 'M3-1-rest-bp', 3],
  ['M3-2', 'Notes/M3_API_Security/M3_2_Security_Core', 'M3-2-security-core', 4],
  ['M3-3', 'Notes/M3_API_Security/M3_3_JWT', 'M3-3-jwt', 4],
  ['M3-4', 'Notes/M3_API_Security/M3_4_OAuth2_OIDC', 'M3-4-oauth2', 3],
  ['M3-5', 'Notes/M3_API_Security/M3_5_OpenAPI_Client', 'M3-5-openapi-client', 4],
  ['M4-1', 'Notes/M4_DevOps_Engineering/M4_1_Docker', 'M4-1-docker', 4],
  ['M4-2', 'Notes/M4_DevOps_Engineering/M4_2_GitHub_Actions_CI', 'M4-2-ci', 4],
];
const errors = [];
const warnings = [];
const files = new Set();
const examDir = 'Exams/de-kiem-tra';
const examNames = fs.readdirSync(path.join(root, examDir));
let lessons = 0;
let pairs = 0;
let questions = 0;
let tableRubrics = 0;
let bulletRubrics = 0;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const fail = (file, reason) => errors.push({ file, reason });

for (const [id, dir, prefix, expected] of modules) {
  const notes = fs.readdirSync(path.join(root, dir)).filter(f => f.endsWith('.md'));
  notes.forEach(f => files.add(`${dir}/${f}`));
  const lessonNames = notes.filter(f => /^LESSON_\d\d_/.test(f));
  if (lessonNames.length !== expected) fail(dir, `Expected ${expected} lessons`);
  for (const name of lessonNames) {
    lessons++;
    const number = Number(name.match(/^LESSON_(\d+)/)[1]);
    const matches = examNames.filter(f => f.startsWith(`${prefix}__`) && f.includes(`__lesson${number}-`) && f.endsWith('.md'));
    if (matches.length !== 2 || matches.filter(f => f.endsWith('__DAPAN.md')).length !== 1) {
      fail(name, 'Missing or ambiguous exam/answer pair');
      continue;
    }
    pairs++;
    for (const name of matches) {
      const file = `${examDir}/${name}`;
      files.add(file);
      const text = read(file);
      const answer = name.endsWith('__DAPAN.md');
      const sequence = [...text.matchAll(/^#{2,3} Câu (\d+)/gm)].map(m => Number(m[1]));
      if (sequence.join(',') !== '1,2,3,4,5,6,7,8') fail(file, 'Question headings must be 1..8');
      if (!answer) {
        questions += sequence.length;
        if ((text.match(/\*\*Trả lời:\*\*/g) || []).length !== 8) fail(file, 'Expected 8 answer slots');
        continue;
      }
      const rows = text.split('\n').filter(line => /^\|\s*[1-8]\s*\|/.test(line));
      if (rows.length) {
        if (rows.length !== 8) fail(file, 'Expected 8 rubric rows');
        for (const row of rows) {
          const points = [...row.matchAll(/\((\d+(?:[.,]\d+)?)(?:\s+[^)]*)?\)/g)].map(m => Number(m[1].replace(',', '.')));
          if (points.reduce((a, b) => a + b, 0) !== 5) fail(file, `Rubric weights not 5: ${row}`);
          tableRubrics++;
        }
      } else if (id === 'M2-2') {
        bulletRubrics += sequence.length;
        warnings.push({ file, reason: 'Legacy bullet rubric: arithmetic/meaning reviewed manually, not parsed by this script' });
      } else fail(file, 'No recognized rubric table');
    }
  }
}

for (const dir of ['Notes/QUALITY_AUDIT_2026_10_07', 'Notes/M3_API_Security']) {
  fs.readdirSync(path.join(root, dir)).filter(f => f.endsWith('.md')).forEach(f => files.add(`${dir}/${f}`));
}
for (const file of files) {
  const text = read(file);
  let fence = null;
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*(`{3,}|~{3,})/);
    if (!match) continue;
    if (!fence) fence = match[1];
    else if (match[1][0] === fence[0] && match[1].length >= fence.length) fence = null;
  }
  if (fence) {
    const known = file === `${examDir}/M2-2-postgres__2026-10-05__lesson1-lan1.md`;
    (known ? warnings : errors).push({ file, reason: known ? 'Known learner answer fence issue; left unchanged' : 'Unclosed fence' });
  }
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^(https?:|obsidian:|mailto:)/.test(target)) continue;
    if (!fs.existsSync(path.resolve(root, path.dirname(file), decodeURI(target)))) fail(file, `Missing link: ${target}`);
  }
}

let protectedChecked = 0;
const baselineFile = process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), 'PROTECTED_BASELINE.json');
if (baselineFile) {
  const baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8'));
  for (const [file, expected] of Object.entries(baseline)) {
    const actual = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
    protectedChecked++;
    if (actual !== expected) fail(file, 'Changed since pre-audit baseline');
  }
} else warnings.push({ reason: 'No baseline argument: protected files were not checked' });

console.log(JSON.stringify({ lessons, pairs, questions, tableRubrics, bulletRubrics, markdownFiles: files.size, protectedChecked, errors, warnings }, null, 2));
process.exitCode = errors.length ? 1 : 0;
