import { cpSync, existsSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const project = join(root, '..');
const dist = join(project, 'dist');

if (!existsSync(dist)) {
  console.error('dist/ missing. Run vite build first.');
  process.exit(1);
}

// Remove legacy static folders
for (const name of ['css', 'js', 'assets']) {
  const p = join(project, name);
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

// Copy built assets + images + index.html into project root for static hosting
for (const name of readdirSync(dist)) {
  const from = join(dist, name);
  const to = join(project, name);
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
}

console.log('Published dist → moccasins-for-markers/ for Vercel static hosting.');
