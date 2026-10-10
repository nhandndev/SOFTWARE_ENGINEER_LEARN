import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
const examDir = path.join(root, 'Exams/de-kiem-tra');
const notes = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
const exams = fs.readdirSync(examDir).filter(f => /^M5-3-microservices__2026-10-07__lesson[1-2]-lan1(?:__DAPAN)?\.md$/.test(f)).map(f => path.join(examDir, f));

function checkText(file, body, exists = fs.existsSync) {
  const errors = [];
  let links = 0;
  let rubrics = 0;
  if ((body.match(/^```/gm) || []).length % 2) errors.push('fences');
  for (const match of body.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    links++;
    if (!exists(path.resolve(path.dirname(file), target))) errors.push(`link: ${target}`);
  }
  const base = path.basename(file);
  if (/^LESSON_\d\d_/.test(base) && (!body.includes('## Tài liệu / video') || !body.includes('Video:') || !body.includes('https://'))) errors.push('resources');
  if (/^M5-3-microservices__/.test(base)) {
    const sequence = [...body.matchAll(/^## Câu (\d+)/gm)].map(m => m[1]).join(',');
    if (sequence !== '1,2,3,4,5,6,7,8') errors.push('question headings');
    if (base.endsWith('__DAPAN.md')) {
      const rows = body.split('\n').filter(l => /^\| [1-8] \|/.test(l));
      if (rows.length !== 8) errors.push('rubric count');
      for (const row of rows) {
        rubrics++;
        const total = [...row.matchAll(/\((\d+(?:\.\d+)?)\)/g)].reduce((sum, m) => sum + Number(m[1]), 0);
        if (total !== 5) errors.push(`rubric total: ${total}`);
      }
    } else if ((body.match(/\*\*Trả lời:\*\*/g) || []).length !== 8 || !body.includes('PHONG_VAN') || !body.includes('34')) errors.push('exam format');
  }
  if (/^ADR_/.test(base)) {
    for (const section of ['Context', 'Options', 'Decision', 'Consequences', 'Revisit Triggers', 'Validation And Limits']) {
      if (!body.includes(`## ${section}\n`)) errors.push(`ADR section: ${section}`);
    }
    if (!/^- Status: Proposed/m.test(body)) errors.push('example/template must remain Proposed');
  }
  return { errors, links, rubrics };
}

if (process.argv.includes('--self-test')) {
  const file = exams.find(f => f.endsWith('__DAPAN.md'));
  const body = fs.readFileSync(file, 'utf8');
  assert(checkText(file, body.replace('(1)', '(2)')).errors.some(e => e.startsWith('rubric total')));
  assert(checkText(file, body + '\n[broken](no-such-review.md)').errors.some(e => e.startsWith('link:')));
  assert(checkText(file, body + '\n```java').errors.includes('fences'));
  const adr = path.join(dir, 'ADR_EXAMPLE_SHOPCORE_MONOLITH.md');
  assert(checkText(adr, fs.readFileSync(adr, 'utf8').replace('- Status: Proposed', '- Status: Accepted')).errors.includes('example/template must remain Proposed'));
  console.log('PASS 4 checker fault probes; these validate the checker, not architecture quality');
}

const errors = [];
let links = 0;
let rubrics = 0;
if (notes.filter(f => /^LESSON_\d\d_/.test(path.basename(f))).length !== 2) errors.push('Expected two lessons');
if (exams.length !== 4) errors.push('Expected two exam/answer pairs');
for (const file of [...notes, ...exams, path.join(dir, '../README.md')]) {
  const result = checkText(file, fs.readFileSync(file, 'utf8'));
  links += result.links;
  rubrics += result.rubrics;
  errors.push(...result.errors.map(error => `${file}: ${error}`));
}
console.log(JSON.stringify({ markdownFiles: notes.length + exams.length + 1, questions: exams.filter(f => !f.endsWith('__DAPAN.md')).length * 8, rubrics, localLinks: links, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
