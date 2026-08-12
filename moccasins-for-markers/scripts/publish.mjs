import { cpSync, existsSync, rmSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const project = join(root, '..');
const dist = join(project, 'dist');
const viteIndex = join(project, 'index.vite.html');
const indexHtml = join(project, 'index.html');

function prepareViteIndex() {
  if (!existsSync(viteIndex)) {
    console.error('index.vite.html missing');
    process.exit(1);
  }
  cpSync(viteIndex, indexHtml);
  console.log('Prepared index.html from index.vite.html');
}

function publish() {
  if (!existsSync(dist)) {
    console.error('dist/ missing. Run vite build first.');
    process.exit(1);
  }

  for (const name of readdirSync(dist)) {
    const from = join(dist, name);
    const to = join(project, name);
    if (existsSync(to)) rmSync(to, { recursive: true, force: true });
    cpSync(from, to, { recursive: true });
  }

  const html = readFileSync(indexHtml, 'utf8');
  if (!html.includes('/moccasins-for-markers/assets/')) {
    console.error('Published index.html does not reference built assets. Aborting.');
    process.exit(1);
  }

  console.log('Published dist → moccasins-for-markers/ for Vercel static hosting.');
}

const mode = process.argv[2] || 'publish';
if (mode === 'prepare') prepareViteIndex();
else publish();
