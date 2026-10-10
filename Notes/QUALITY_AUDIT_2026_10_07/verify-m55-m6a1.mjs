import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const modules = [
  { topic: 'M5-5-system-design', dir: 'Notes/M5_Scalability/M5_5_System_Design', lessons: 4 },
  { topic: 'M6A-1-clean-code', dir: 'Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code', lessons: 5 }
];
function check(file, body) {
  const errors = [];
  let links = 0, rubrics = 0;
  if ((body.match(/^```/gm) || []).length % 2) errors.push('fences');
  for (const m of body.matchAll(/\]\(([^)]+)\)/g)) {
    const target = m[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    links++;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`link: ${target}`);
  }
  const name = path.basename(file);
  if (/^LESSON_\d\d_/.test(name) && (!body.includes('## Tài liệu / video') || !body.includes('Video:') || !body.includes('https://'))) errors.push('resources');
  if (/^M(?:5-5-system-design|6A-1-clean-code)__/.test(name)) {
    const sequence = [...body.matchAll(/^## Câu (\d+)/gm)].map(m => m[1]).join(',');
    if (sequence !== '1,2,3,4,5,6,7,8') errors.push('question headings');
    if (name.endsWith('__DAPAN.md')) {
      const rows = body.split('\n').filter(l => /^\| [1-8] \|/.test(l));
      if (rows.length !== 8) errors.push('rubric count');
      for (const row of rows) {
        rubrics++;
        const total = [...row.matchAll(/\((\d+(?:\.\d+)?)\)/g)].reduce((sum, m) => sum + Number(m[1]), 0);
        if (total !== 5) errors.push('rubric total');
      }
    } else {
      if ((body.match(/\*\*Trả lời:\*\*/g) || []).length !== 8 || !body.includes('PHONG_VAN') || !body.includes('34/40')) errors.push('exam format');
      for (const question of body.split(/^## Câu /m).slice(1)) {
        if ((question.match(/^- /gm) || []).length !== 5) errors.push('Expected five public criteria');
      }
    }
  }
  return { errors, links, rubrics };
}

if (process.argv.includes('--self-test')) {
  const file = path.join(root, 'Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson1-lan1__DAPAN.md');
  const text = fs.readFileSync(file, 'utf8');
  assert(check(file, text.replace('(1)', '(2)')).errors.includes('rubric total'));
  assert(check(file, text + '\n[bad](nonexistent-file.md)').errors.some(e => e.startsWith('link:')));
  assert(check(file, text + '\n```java').errors.includes('fences'));
  assert(check(file, text.replace('## Câu 8', '## Câu 9')).errors.includes('question headings'));
  const lesson = path.join(root, modules[0].dir, 'LESSON_01_REQUIREMENTS_SCALING_LB.md');
  assert(check(lesson, fs.readFileSync(lesson, 'utf8').replace('Video:', 'Removed:')).errors.includes('resources'));
  const exam = file.replace('__DAPAN', '');
  assert(check(exam, fs.readFileSync(exam, 'utf8').replace(/^- .+\n/m, '')).errors.includes('Expected five public criteria'));
  console.log('PASS six checker fault probes; not a semantic quality proof');
}
const errors = [];
let markdownFiles = 0, links = 0, rubrics = 0;
for (const module of modules) {
  const dir = path.join(root, module.dir);
  const notes = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
  const lessons = notes.filter(f => /^LESSON_\d\d_/.test(path.basename(f)));
  if (lessons.length !== module.lessons) errors.push(`Lesson count ${module.topic}`);
  const exams = fs.readdirSync(path.join(root, 'Exams/de-kiem-tra'))
    .filter(f => new RegExp(`^${module.topic}__2026-10-07__lesson[1-${module.lessons}]-lan1(?:__DAPAN)?\\.md$`).test(f))
    .map(f => path.join(root, 'Exams/de-kiem-tra', f));
  if (exams.length !== module.lessons * 2) errors.push(`Exam count ${module.topic}`);
  for (const file of [...notes, ...exams, path.join(dir, '../README.md')]) {
    const result = check(file, fs.readFileSync(file, 'utf8'));
    markdownFiles++; links += result.links; rubrics += result.rubrics;
    errors.push(...result.errors.map(e => `${file}: ${e}`));
  }
}
console.log(JSON.stringify({ markdownFiles, lessons: 9, questions: 72, rubrics, localLinks: links, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
