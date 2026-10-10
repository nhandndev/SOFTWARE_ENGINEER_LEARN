import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(dir, '../../..');
const examDir = path.join(root, 'Exams/de-kiem-tra');
const lessonFiles = fs.readdirSync(dir).filter(f => /^LESSON_0[12]_.*\.md$/.test(f));
const examFiles = fs.readdirSync(examDir).filter(f => /^M7-3-behavioral__2026-10-08__lesson[12]-lan1(?:__DAPAN)?\.md$/.test(f));
const docs = new Map([
  ...fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f)),
  ...examFiles.map(f => path.join(examDir, f)),
].map(f => [f, fs.readFileSync(f, 'utf8')]));

function audit(contents) {
  const errors = [];
  let questions = 0, rubrics = 0, localLinks = 0;
  if (lessonFiles.length !== 2 || examFiles.length !== 4) errors.push('Expected two lessons and two exam/answer pairs');
  for (const [file, body] of contents) {
    if (body.split('\n').filter(l => l.startsWith('```')).length % 2) errors.push(`${file}: unbalanced fences`);
    for (const match of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^https?:/.test(match[1])) continue;
      const [rel, fragment] = match[1].split('#');
      const target = rel ? path.resolve(path.dirname(file), rel) : file;
      localLinks++;
      if (!fs.existsSync(target)) { errors.push(`${file}: missing target ${match[1]}`); continue; }
      if (fragment && /^b\d\d$/.test(fragment)) {
        const text = contents.get(target) ?? fs.readFileSync(target, 'utf8');
        if (!text.includes(`## ${fragment.toUpperCase()}\n`)) errors.push(`${file}: missing story anchor ${fragment}`);
      }
    }
    if (/^LESSON_\d\d_/.test(path.basename(file))) {
      if (!body.includes('## Tài liệu / video') || !body.includes('Video: tìm')) errors.push(`${file}: resources missing`);
    }
    if (/lesson[12]-lan1\.md$/.test(file)) {
      const headings = [...body.matchAll(/^## Câu (\d+)/gm)].map(m => Number(m[1]));
      if (headings.join(',') !== '1,2,3,4,5,6,7,8') errors.push(`${file}: question numbering`);
      const sections = body.split(/^## Câu \d+.*$/m).slice(1);
      questions += sections.length;
      for (const section of sections) {
        const asks = section.match(/\*\*Cần nói đủ:\*\*\n([\s\S]*?)\n\*\*Trả lời:\*\*/);
        if (!asks || asks[1].split('\n').filter(l => l.startsWith('- ')).length !== 5) errors.push(`${file}: five asks/answer slot required`);
      }
    }
    if (file.endsWith('__DAPAN.md')) {
      const rows = body.split('\n').filter(l => /^\| [1-8] \|/.test(l));
      rubrics += rows.length;
      if (rows.map(l => l.split('|')[1].trim()).join(',') !== '1,2,3,4,5,6,7,8') errors.push(`${file}: rubric numbering`);
      if ([...body.matchAll(/^## Câu \d+/gm)].length !== 8) errors.push(`${file}: eight solutions required`);
      for (const row of rows) if ([...row.matchAll(/\(1\)/g)].length !== 5 || /\([2-9]\)/.test(row)) errors.push(`${file}: five one-point criteria required`);
    }
  }
  const bank = contents.get(path.join(dir, 'STORY_BANK_TEMPLATE.md')) ?? '';
  const ids = [...bank.matchAll(/^## (B\d\d)$/gm)].map(m => m[1]);
  if (ids.join(',') !== 'B01,B02,B03,B04,B05,B06,B07,B08,B09,B10') errors.push('Story bank must have ten unique ordered IDs');
  if (questions !== 16 || rubrics !== 16) errors.push('Expected 16 questions and 16 rubrics');
  return { markdownFiles: contents.size, lessons: lessonFiles.length, questions, rubrics, localLinks, storySlots: ids.length, errors };
}

const baseline = audit(docs);
console.log(JSON.stringify(baseline, null, 2));
if (baseline.errors.length) process.exit(1);
if (process.argv.includes('--self-test')) {
  const lesson = path.join(dir, lessonFiles[0]);
  const exam = path.join(examDir, examFiles.find(f => f.endsWith('lesson1-lan1.md')));
  const answer = path.join(examDir, examFiles.find(f => f.endsWith('lesson1-lan1__DAPAN.md')));
  const bank = path.join(dir, 'STORY_BANK_TEMPLATE.md');
  const probes = [
    [lesson, s => s + '\n[broken](missing-probe.md)\n'],
    [lesson, s => s + '\n```text\n'],
    [answer, s => s.replace('(1)', '(2)')],
    [exam, s => s.replace(/^- .*\n/m, '')],
    [exam, s => s.replace('## Câu 2', '## Câu 1')],
    [bank, s => s.replace('## B02\n', '## B01\n')],
  ];
  for (const [file, mutate] of probes) {
    const altered = new Map(docs);
    altered.set(file, mutate(altered.get(file)));
    if (!audit(altered).errors.length) throw Error('Checker failed to detect structural fault');
  }
  console.log('PASS six structural fault probes; no automated grading of personal stories or oral delivery');
}
