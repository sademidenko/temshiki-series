import { access, readdir, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const output = process.env.STATIC_OUTPUT ?? 'dist/client';
const repositoryPath = process.env.PAGES_BASE_PATH ?? '/temshiki-series';

const requiredFiles = [
  'index.html',
  '.nojekyll',
  'og.png',
  'hero/temshchiki-hero.webp',
  'materials/temshchiki-season-1-v2.md',
  'materials/temshchiki-story-bank-2023-2026.md',
  'materials/temshchiki-team-questions.md',
  '_next/static/css',
];

for (const file of requiredFiles) {
  await access(`${output}/${file}`, constants.R_OK);
}

const html = await readFile(`${output}/index.html`, 'utf8');
if (!html.includes('ТЕМЩИКИ') || !html.includes(`${repositoryPath}/_next/`)) {
  throw new Error('Static page is missing title or repository base path');
}
if (!html.includes('4 игрока. 3 смерти. 1 выживший')) {
  throw new Error('Static page is missing the pre-rendered hero formula');
}
if (html.includes('"/_next/')) {
  throw new Error('Static page still references assets without the repository base path');
}

const cssDir = `${output}/_next/static/css`;
const cssFiles = (await readdir(cssDir)).filter((name) => name.endsWith('.css'));
if (cssFiles.length === 0) throw new Error('No stylesheet was emitted');
for (const name of cssFiles) {
  const css = await readFile(`${cssDir}/${name}`, 'utf8');
  const fontUrls = css.match(/url\([^)]*\.woff2\)/g) ?? [];
  if (fontUrls.length === 0) throw new Error(`${name} has no bundled fonts`);
  const unprefixed = fontUrls.filter((url) => !url.includes(`${repositoryPath}/_next/`));
  if (unprefixed.length > 0) {
    throw new Error(`${name} references fonts without the base path: ${unprefixed.join(', ')}`);
  }
}

console.log(
  `verified ${requiredFiles.length} paths and ${cssFiles.length} stylesheet(s) in ${output} with base path ${repositoryPath}`,
);
