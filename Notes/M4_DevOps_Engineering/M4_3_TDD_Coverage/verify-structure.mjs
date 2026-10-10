import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
const examDir = path.join(root, 'Exams/de-kiem-tra');
const notes = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
const exams = fs.readdirSync(examDir).filter(f => /^M4-3-tdd-coverage__2026-10-07__lesson[1-4]-lan1(?:__DAPAN)?\.md$/.test(f)).map(f => path.join(examDir, f));
const errors = [];
let questions = 0;
let rubrics = 0;
let links = 0;
if (notes.filter(f => /LESSON_\d\d_/.test(f)).length !== 4) errors.push('Expected 4 lessons');
if (exams.length !== 8) errors.push('Expected 4 exam/answer pairs');
for (const file of [...notes, ...exams, path.join(dir, '../README.md')]) {
  const text = fs.readFileSync(file, 'utf8');
  if ((text.match(/^```/gm) || []).length % 2) errors.push(`${file}: fence`);
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    links++;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`${file}: link ${target}`);
  }
  if (!exams.includes(file)) continue;
  const sequence = [...text.matchAll(/^## Câu (\d+)/gm)].map(m => m[1]).join(',');
  if (sequence !== '1,2,3,4,5,6,7,8') errors.push(`${file}: headings`);
  if (file.endsWith('__DAPAN.md')) {
    const rows = text.split('\n').filter(l => /^\| [1-8] \|/.test(l));
    if (rows.length !== 8) errors.push(`${file}: rubric rows`);
    for (const row of rows) {
      rubrics++;
      const total = [...row.matchAll(/\((\d+(?:\.\d+)?)\)/g)].reduce((n, m) => n + Number(m[1]), 0);
      if (total !== 5) errors.push(`${file}: rubric total ${row}`);
    }
  } else {
    questions += 8;
    if ((text.match(/\*\*Trả lời:\*\*/g) || []).length !== 8) errors.push(`${file}: answer slots`);
  }
}
console.log(JSON.stringify({ markdownFiles: notes.length + exams.length + 1, questions, rubrics, links, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
