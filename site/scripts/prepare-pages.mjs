import { access, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';

// vinext emits hashed assets under "<output>/<assetPrefix>/_next" while
// index.html stays at the output root. GitHub Pages serves the artifact root
// as "/<repository>/", so the nested folder must become "<output>/_next".
const output = process.env.STATIC_OUTPUT ?? 'dist/client';
const prefix = (process.env.PAGES_BASE_PATH ?? '/temshiki-series').replace(/^\//, '');

if (prefix) {
  const nested = `${output}/${prefix}/_next`;
  await access(nested, constants.R_OK);
  await rm(`${output}/_next`, { recursive: true, force: true });
  await rename(nested, `${output}/_next`);
  const leftovers = await readdir(`${output}/${prefix}`);
  if (leftovers.length > 0) {
    throw new Error(`unexpected files left in ${output}/${prefix}: ${leftovers.join(', ')}`);
  }
  await rm(`${output}/${prefix}`, { recursive: true, force: true });
}

for (const stray of ['.vite', '_headers', '.assetsignore']) {
  await rm(`${output}/${stray}`, { recursive: true, force: true });
}
await writeFile(`${output}/.nojekyll`, '');
console.log(`prepared ${output} for GitHub Pages under /${prefix}`);
