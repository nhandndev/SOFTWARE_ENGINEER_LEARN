import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
const examDir = path.join(root, 'Exams/de-kiem-tra');
const notes = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
const exams = fs.readdirSync(examDir).filter(f => /^M5-2-kafka__2026-10-07__lesson[1-5]-lan1(?:__DAPAN)?\.md$/.test(f)).map(f => path.join(examDir, f));
const errors = [];
let questions = 0;
let rubrics = 0;
let links = 0;
let sources = 0;
if (notes.filter(f => /LESSON_\d\d_/.test(f)).length !== 5) errors.push('Expected five lessons');
if (exams.length !== 10) errors.push('Expected five exam/answer pairs');
for (const file of [...notes, ...exams, path.join(dir, '../README.md')]) {
  const body = fs.readFileSync(file, 'utf8');
  if ((body.match(/^```/gm) || []).length % 2) errors.push(`${file}: unbalanced fences`);
  if (/LESSON_\d\d_/.test(path.basename(file))) {
    if (!body.includes('## Tài liệu / video') || !body.includes('https://') || !body.includes('Video:')) errors.push(`${file}: missing resources`);
    sources += [...body.matchAll(/<!-- verify: [^>]+ -->/g)].length;
  }
  for (const match of body.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    links++;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`${file}: link ${target}`);
  }
  if (!exams.includes(file)) continue;
  const sequence = [...body.matchAll(/^## Câu (\d+)/gm)].map(m => m[1]).join(',');
  if (sequence !== '1,2,3,4,5,6,7,8') errors.push(`${file}: question headings`);
  if (file.endsWith('__DAPAN.md')) {
    const rows = body.split('\n').filter(l => /^\| [1-8] \|/.test(l));
    if (rows.length !== 8) errors.push(`${file}: rubric rows`);
    for (const row of rows) {
      rubrics++;
      const total = [...row.matchAll(/\((\d+(?:\.\d+)?)\)/g)].reduce((sum, m) => sum + Number(m[1]), 0);
      if (total !== 5) errors.push(`${file}: rubric total ${total}`);
    }
  } else {
    questions += 8;
    if ((body.match(/\*\*Trả lời:\*\*/g) || []).length !== 8) errors.push(`${file}: answer slots`);
    if (!body.includes('PHONG_VAN') || !body.includes('34')) errors.push(`${file}: mode/threshold`);
  }
}
if (sources !== 6) errors.push(`Expected six Java sources, found ${sources}`);
console.log(JSON.stringify({ markdownFiles: notes.length + exams.length + 1, questions, rubrics, links, javaSources: sources, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
