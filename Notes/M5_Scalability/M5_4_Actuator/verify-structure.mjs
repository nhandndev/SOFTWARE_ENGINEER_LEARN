import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
const examDir = path.join(root, 'Exams/de-kiem-tra');
const notes = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
const exams = fs.readdirSync(examDir).filter(f => /^M5-4-actuator__2026-10-07__lesson[1-2]-lan1(?:__DAPAN)?\.md$/.test(f)).map(f => path.join(examDir, f));

function check(file, body) {
  const errors = [];
  let links = 0;
  let rubrics = 0;
  if ((body.match(/^```/gm) || []).length % 2) errors.push('fences');
  for (const m of body.matchAll(/\]\(([^)]+)\)/g)) {
    const target = m[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    links++;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`link: ${target}`);
  }
  const name = path.basename(file);
  if (/^LESSON_\d\d_/.test(name) && (!body.includes('## Tài liệu / video') || !body.includes('Video:') || !body.includes('https://'))) errors.push('resources');
  if (/^M5-4-actuator__/.test(name)) {
    const sequence = [...body.matchAll(/^## Câu (\d+)/gm)].map(m => m[1]).join(',');
    if (sequence !== '1,2,3,4,5,6,7,8') errors.push('question headings');
    if (name.endsWith('__DAPAN.md')) {
      const rows = body.split('\n').filter(l => /^\| [1-8] \|/.test(l));
      if (rows.length !== 8) errors.push('rubric count');
      for (const row of rows) {
        rubrics++;
        const points = [...row.matchAll(/\((\d+(?:\.\d+)?)\)/g)].map(m => Number(m[1]));
        const total = points.reduce((sum, value) => sum + value, 0);
        if (total !== 5) errors.push('rubric total');
        if (points.length !== 5 || points.some(value => value !== 1)) errors.push('five one-point criteria');
      }
    } else {
      if ((body.match(/\*\*Trả lời:\*\*/g) || []).length !== 8 || !body.includes('PHONG_VAN') || !body.includes('34/40')) errors.push('exam format');
      for (const section of body.split(/^## Câu \d+[^\n]*$/m).slice(1)) {
        const prompt = section.split('**Trả lời:**')[0];
        if ((prompt.match(/^- /gm) || []).length !== 5) errors.push('five public asks');
      }
    }
  }
  return { errors, links, rubrics };
}

if (process.argv.includes('--self-test')) {
  const file = exams.find(f => f.endsWith('__DAPAN.md'));
  const body = fs.readFileSync(file, 'utf8');
  assert.deepEqual(check(file, body).errors, [], 'Answer baseline must be valid');
  assert(check(file, body.replace('(1)', '(2)')).errors.includes('rubric total'));
  assert(check(file, body + '\n[broken](missing-file.md)').errors.some(e => e.startsWith('link:')));
  assert(check(file, body + '\n```java').errors.includes('fences'));
  assert(check(file, body.replace('## Câu 8', '## Câu 9')).errors.includes('question headings'));
  assert(check(file, body.replace('(1);', '(0);').replace('(1);', '(2);')).errors.includes('five one-point criteria'));
  const exam = exams.find(f => !f.endsWith('__DAPAN.md'));
  const prompt = fs.readFileSync(exam, 'utf8');
  assert.deepEqual(check(exam, prompt).errors, [], 'Exam baseline must be valid');
  assert(check(exam, prompt.replace(/^- .+\n/m, '')).errors.includes('five public asks'));
  console.log('PASS 6 checker fault probes (not a semantic quality proof)');
}

const errors = [];
let links = 0;
let rubrics = 0;
let questions = 0;
if (notes.filter(f => /^LESSON_\d\d_/.test(path.basename(f))).length !== 2) errors.push('Expected two lessons');
if (exams.length !== 4) errors.push('Expected two exam/answer pairs');
for (const file of [...notes, ...exams, path.join(dir, '../README.md')]) {
  const body = fs.readFileSync(file, 'utf8');
  const result = check(file, body);
  if (exams.includes(file) && !file.endsWith('__DAPAN.md')) questions += (body.match(/^## Câu \d+/gm) || []).length;
  links += result.links;
  rubrics += result.rubrics;
  errors.push(...result.errors.map(error => `${file}: ${error}`));
}
console.log(JSON.stringify({ markdownFiles: notes.length + exams.length + 1, questions, rubrics, localLinks: links, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
