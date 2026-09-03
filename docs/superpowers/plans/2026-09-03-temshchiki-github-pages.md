# Temshchiki GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a Russian-language cinematic pitch landing page for the limited series «ТЕМЩИКИ» on GitHub Pages.

**Architecture:** Create an isolated `site/` Vinext/React project from the pinned OpenAI Sites scaffold, then implement a single statically renderable narrative route from typed local content. Keep downloads and original art in `public/`, validate the production output, and deploy from a root-level GitHub Actions workflow to a public `temshiki-series` repository.

**Tech Stack:** React 19, TypeScript 5.9, Vinext/Vite, Tailwind CSS 4, shadcn primitives, Vitest, Testing Library, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-03-temshchiki-github-pages-design.md`

## Global Constraints

- One public Russian-language route with full season spoilers.
- Content source is `ТЕМЩИКИ_ЗАЯВКА_СЕЗОН_1_V2.md`; technical crime mechanics remain non-reproducible.
- Theme tokens use `#090A0C`, `#12151A`, `#E8ECEF`, `#B7FF3C`, `#FF4D45`, and `#7B9AAF`.
- The first viewport must show «ТЕМЩИКИ», «4 игрока. 3 смерти. 1 выживший», the logline, `8 × 50`, period, genre, and two calls to action.
- Four characters and the empty fifth slot remain the central visual hook.
- The page includes the evolution of «ТЕМА», eight episode entries, the final counter-key choice, production information, references, and downloads.
- No authentication, CMS, database, analytics, contact form, video background, autoplay audio, or server-only behavior.
- Keyboard navigation, visible focus, reduced-motion support, 44×44 px touch targets, and mobile single-column behavior are required.
- Dota and NVIDIA receive a clearance note; the bookmaker, «ТЕМА», «Контур», and companies remain fictional.
- Repository target name is `temshiki-series`; only selected site files and downloadable materials are committed, not the review archive or temporary extraction files.

---

### Task 1: Scaffold the site and lock the content contract

**Files:**
- Create: `site/` from `@openai/create-sites@0.3.0`
- Create: `site/lib/content.ts`
- Create: `site/lib/content.test.ts`
- Modify: `site/package.json`
- Inspect: `site/app/page.tsx`, `site/app/layout.tsx`, `site/app/globals.css`, `site/vite.config.ts`, `site/.openai/hosting.json`

**Interfaces:**
- Produces: `SeriesMeta`, `Character`, `EvolutionStep`, `Episode`, `DownloadItem` TypeScript types.
- Produces: `seriesMeta`, `characters`, `evolutionSteps`, `episodes`, and `downloads` immutable arrays consumed by all page sections.

- [ ] **Step 1: Create and initialize the isolated project**

Run:

```bash
mkdir site
cd site
npm create --yes @openai/sites@0.3.0 . -- --yes --add-ons shadcn --install
```

Expected: the pinned Vinext project exists with `app/`, `components/ui/`, `.openai/hosting.json`, `vite.config.ts`, and an npm lockfile.

- [ ] **Step 2: Add the test runner without overlapping UI libraries**

Run:

```bash
cd site
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
```

Add scripts to `site/package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 3: Write the failing content-contract test**

Create `site/lib/content.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { characters, episodes, evolutionSteps, seriesMeta } from './content';

describe('pitch content contract', () => {
  it('keeps the approved series identity and complete season', () => {
    expect(seriesMeta.title).toBe('ТЕМЩИКИ');
    expect(seriesMeta.format).toBe('8 × 50');
    expect(seriesMeta.logline).toContain('Антон Шубин');
    expect(characters.map((item) => item.name)).toEqual([
      'Антон Шубин',
      'Лев Марков',
      'Максим Корнеев',
      'Кирилл Савельев',
    ]);
    expect(episodes).toHaveLength(8);
    expect(episodes[0].year).toBe('2017');
    expect(episodes[7].year).toBe('2026');
    expect(evolutionSteps.at(-1)?.label).toBe('Государственная платформа');
  });
});
```

- [ ] **Step 4: Run the contract test and confirm the red state**

Run: `cd site && npm test -- lib/content.test.ts`  
Expected: failure because `lib/content.ts` does not exist.

- [ ] **Step 5: Implement the typed content source**

Create `site/lib/content.ts` with these exact public shapes:

```ts
export type SeriesMeta = {
  title: string;
  formula: string;
  format: string;
  period: string;
  genre: string;
  logline: string;
};

export type Character = {
  id: 'anton' | 'lev' | 'max' | 'kirill';
  name: string;
  role: string;
  city: string;
  function: string;
  desire: string;
  flaw: string;
};

export type EvolutionStep = { year: string; label: string; detail: string };
export type Episode = {
  number: number;
  year: string;
  title: string;
  choice: string;
  consequence: string;
  summary: string;
};
export type DownloadItem = { label: string; href: string; description: string };
```

Populate all values from the approved V2 application. Use the eight episode titles «Патч», «Заказ», «Мира», «Оракул», «Сотрудники», «Правда», «Исполнители», «Суверенитет» and the eight years from the causal map.

- [ ] **Step 6: Verify content and commit the foundation**

Run: `cd site && npm test -- lib/content.test.ts`  
Expected: one passing suite and one passing test.

Commit:

```bash
git add site
git commit -m "feat: scaffold Temshchiki pitch site"
```

---

### Task 2: Build the branded first viewport and first meaningful preview

**Files:**
- Create: `site/components/section-nav.tsx`
- Create: `site/components/hero.tsx`
- Create: `site/components/hero.test.tsx`
- Modify: `site/app/globals.css`
- Modify: `site/app/page.tsx`
- Modify: `site/app/layout.tsx`

**Interfaces:**
- Consumes: `seriesMeta: SeriesMeta` from `site/lib/content.ts`.
- Produces: `SectionNav()` and `Hero({ meta }: { meta: SeriesMeta })`.
- Produces: stable section IDs `idea`, `team`, `evolution`, `episodes`, and `materials`.

- [ ] **Step 1: Write the failing first-viewport test**

Create `site/components/hero.test.tsx`:

```tsx
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { seriesMeta } from '@/lib/content';
import { Hero } from './hero';

describe('Hero', () => {
  it('presents the title, formula, format, logline and both actions', () => {
    render(<Hero meta={seriesMeta} />);
    expect(screen.getByRole('heading', { name: 'ТЕМЩИКИ' })).toBeVisible();
    expect(screen.getByText('4 игрока. 3 смерти. 1 выживший')).toBeVisible();
    expect(screen.getByText('8 × 50')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Смотреть проект' })).toHaveAttribute('href', '#idea');
    expect(screen.getByRole('link', { name: 'Скачать заявку' })).toHaveAttribute(
      'href',
      './materials/temshchiki-season-1-v2.md',
    );
  });
});
```

- [ ] **Step 2: Run the Hero test and confirm the red state**

Run: `cd site && npm test -- components/hero.test.tsx`  
Expected: failure because `components/hero.tsx` does not exist.

- [ ] **Step 3: Apply the approved theme before component styling**

In `site/app/globals.css`, define shared tokens for background, graphite surface, text, signal green, danger red, steel blue, three spacing levels, square corner treatment, focus outline, motion duration, and reduced-motion overrides. Set `color-scheme: dark`, smooth anchor scrolling, a readable Cyrillic sans stack, and a monospace metadata stack.

- [ ] **Step 4: Implement navigation and Hero**

Use semantic `<header>`, `<nav>`, `<main>`, `<h1>`, and links. The Hero must include `seriesMeta.formula`, the complete logline, three metadata chips, a link to `#idea`, and the direct material path from the test. Implement the sticky navigation with the five IDs in the interface block and a mobile horizontal scroller.

- [ ] **Step 5: Replace all scaffold placeholder content and metadata**

Set `lang="ru"`, page title `ТЕМЩИКИ — мини-сериал`, and description `Четверо друзей превращают ночные партии в Dota в платформу власти.` Remove the generated loading skeleton and English metadata completely.

- [ ] **Step 6: Verify, start the retained preview, and show the first slice**

Run:

```bash
cd site
npm test -- components/hero.test.tsx
npm run dev
```

Expected: the test passes; the exact development URL returns HTTP 200 and displays the branded Hero rather than scaffold content. Open that URL once in Codex and retain the browser tab for later updates.

- [ ] **Step 7: Commit the meaningful slice**

```bash
git add site/app site/components site/lib site/package.json site/package-lock.json
git commit -m "feat: add cinematic pitch hero"
```

---

### Task 3: Implement the narrative sections and interactions

**Files:**
- Create: `site/components/character-grid.tsx`
- Create: `site/components/evolution-timeline.tsx`
- Create: `site/components/episode-list.tsx`
- Create: `site/components/final-choice.tsx`
- Create: `site/components/narrative.test.tsx`
- Modify: `site/app/page.tsx`
- Modify: `site/app/globals.css`

**Interfaces:**
- Consumes: `characters`, `evolutionSteps`, and `episodes` from `site/lib/content.ts`.
- Produces: `CharacterGrid`, `EvolutionTimeline`, `EpisodeList`, and `FinalChoice` section components.
- Episode disclosure uses native `<details>` and `<summary>` so text remains available without client state.

- [ ] **Step 1: Write the failing narrative test**

Create `site/components/narrative.test.tsx`:

```tsx
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CharacterGrid } from './character-grid';
import { EpisodeList } from './episode-list';

describe('narrative sections', () => {
  it('renders four friends, the missing fifth and all episodes', () => {
    const { rerender } = render(<CharacterGrid />);
    expect(screen.getAllByTestId('character-card')).toHaveLength(4);
    expect(screen.getByText('Позиция 5 свободна')).toBeVisible();
    rerender(<EpisodeList />);
    expect(screen.getAllByTestId('episode-card')).toHaveLength(8);
    expect(screen.getByText('Суверенитет')).toBeVisible();
    expect(screen.getByText(/выдаёт Льва/i)).toBeVisible();
  });
});
```

- [ ] **Step 2: Confirm the red state**

Run: `cd site && npm test -- components/narrative.test.tsx`  
Expected: module-not-found failures for the new components.

- [ ] **Step 3: Implement the four-player grid and empty fifth slot**

Render the four approved roles as numbered cards with name, role, city, function, desire, and flaw. Add a visually empty dashed fifth card with the accessible label `Позиция 5 свободна`; do not portray Ruden as literal position five.

- [ ] **Step 4: Implement the eight-step evolution timeline**

Render every `EvolutionStep` in causal order. Desktop uses an eight-column track; mobile uses a vertical numbered sequence. The last step changes from signal green to steel blue to express state capture.

- [ ] **Step 5: Implement the episode disclosure list**

Render each episode as a native disclosure with number, year, title, Anton's irreversible choice, consequence, and summary. Episode 1 is open by default. Preserve focus styling and a 44 px summary target.

- [ ] **Step 6: Implement the final counter-key choice**

Build a two-branch semantic comparison: `Сжечь систему — уйти со Львом` and `Восстановить контроль — выдать Льва`. End with the explicit outcome `Антон выбирает систему` and the closed-center epilogue.

- [ ] **Step 7: Compose the complete page**

Add concise sections for high concept, Anton–Lev–Ruden power triangle, world and tone, production potential, references, and clearance. Keep each prose block under 90 words and use the five navigation IDs exactly.

- [ ] **Step 8: Verify and commit the complete narrative**

Run: `cd site && npm test -- components/narrative.test.tsx`  
Expected: one passing suite with both character and episode assertions satisfied.

Commit:

```bash
git add site/app site/components site/lib
git commit -m "feat: add complete season narrative"
```

---

### Task 4: Add original art, downloads, metadata, and social sharing

**Files:**
- Create: `site/public/hero/temshchiki-hero.webp`
- Create: `site/public/og.png`
- Create: `site/public/materials/temshchiki-season-1-v2.md`
- Create: `site/public/materials/temshchiki-story-bank-2023-2026.md`
- Create: `site/public/materials/temshchiki-team-questions.md`
- Create: `site/components/materials.tsx`
- Create: `site/components/materials.test.tsx`
- Modify: `site/components/hero.tsx`
- Modify: `site/app/layout.tsx`

**Interfaces:**
- Consumes: three approved Markdown sources from the repository root.
- Produces: three stable public download URLs matching `downloads` in `site/lib/content.ts`.
- Produces: root Open Graph and X metadata using `/og.png`.

- [ ] **Step 1: Generate one cohesive original master image**

Dispatch exactly one image-only subagent with one image-generation request. The brief requires a 1200×630 landscape image combining four anonymous young male silhouettes, an industrial Russian city, Moscow data glow, server racks, a departing truck, charcoal/green/steel palette, exact Cyrillic title `ТЕМЩИКИ`, and no third-party logos. The subagent saves the result outside `site/` and does not edit site source or call Sites tools.

- [ ] **Step 2: Inspect and integrate the image**

Reject incorrect Cyrillic, extra figures, branded logos, distorted faces, or unreadable contrast. Save the approved image as `site/public/og.png`; create the hero crop as `site/public/hero/temshchiki-hero.webp` while keeping the title area outside the focal crop. Use the same visual language in the Hero with descriptive alt text.

- [ ] **Step 3: Copy the three approved documents to stable public names**

Copy:

```text
ТЕМЩИКИ_ЗАЯВКА_СЕЗОН_1_V2.md -> site/public/materials/temshchiki-season-1-v2.md
БАНК_ТЕМОК_2023-2026.md -> site/public/materials/temshchiki-story-bank-2023-2026.md
ТЕМЩИКИ_ВОПРОСЫ_КОМАНДЕ.md -> site/public/materials/temshchiki-team-questions.md
```

- [ ] **Step 4: Write the failing download test**

Create `site/components/materials.test.tsx`:

```tsx
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Materials } from './materials';

it('offers all approved project materials', () => {
  render(<Materials />);
  expect(screen.getAllByRole('link')).toHaveLength(3);
  expect(screen.getByRole('link', { name: /заявка v2/i })).toHaveAttribute(
    'href',
    './materials/temshchiki-season-1-v2.md',
  );
});
```

- [ ] **Step 5: Implement materials and metadata**

Render three download cards with `download` attributes and file descriptions. In `site/app/layout.tsx`, set Russian title and description plus Open Graph and X title, description, and `/og.png`; use a trusted production origin built from the known GitHub Pages URL after repository creation.

- [ ] **Step 6: Verify the assets and links**

Run:

```bash
cd site
npm test -- components/materials.test.tsx
test -s public/og.png
test -s public/hero/temshchiki-hero.webp
test -s public/materials/temshchiki-season-1-v2.md
test -s public/materials/temshchiki-story-bank-2023-2026.md
test -s public/materials/temshchiki-team-questions.md
```

Expected: test pass and all five asset checks exit successfully.

- [ ] **Step 7: Commit assets and metadata**

```bash
git add site/app site/components site/lib site/public
git commit -m "feat: add pitch artwork and materials"
```

---

### Task 5: Make the build GitHub Pages compatible

**Files:**
- Modify: `site/next.config.ts`
- Modify: `site/vite.config.ts`
- Modify: `site/package.json`
- Create: `site/scripts/verify-static-build.mjs`
- Create: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: environment variable `PAGES_BASE_PATH`, defaulting to an empty string locally and set to `/temshiki-series` in CI.
- Produces: a static deploy directory containing `index.html`, all hashed assets, `og.png`, hero art, and the three downloads.

- [ ] **Step 1: Write the failing static-build verifier**

Create `site/scripts/verify-static-build.mjs`:

```js
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const output = process.env.STATIC_OUTPUT ?? 'dist/client';
await access(`${output}/index.html`, constants.R_OK);
await access(`${output}/og.png`, constants.R_OK);
await access(`${output}/materials/temshchiki-season-1-v2.md`, constants.R_OK);
const html = await readFile(`${output}/index.html`, 'utf8');
if (!html.includes('ТЕМЩИКИ') || !html.includes('temshchiki-series')) {
  throw new Error('Static page is missing title or repository base path');
}
```

- [ ] **Step 2: Run the verifier before static export**

Run: `cd site && STATIC_OUTPUT=dist/client node scripts/verify-static-build.mjs`  
Expected: failure because `dist/client/index.html` does not exist.

- [ ] **Step 3: Configure static export and base path**

Set `output: 'export'` in `site/next.config.ts`, because Vinext reads static-export mode from this file. Set `basePath` and `assetPrefix` to `process.env.PAGES_BASE_PATH ?? ''`, enable `trailingSlash`, and disable image optimization. All public document and image links inside page content use `./materials/...` and `./hero/...`, so they resolve under both `/` and `/temshchiki-series/`. Add package scripts:

```json
{
  "scripts": {
    "build:pages": "PAGES_BASE_PATH=/temshchiki-series vinext build",
    "verify:pages": "STATIC_OUTPUT=dist/client node scripts/verify-static-build.mjs"
  }
}
```

Expected build log: `Pre-rendering all routes (output: 'export')`; the deployable static output is `site/dist/client` and contains rendered HTML rather than a server shell.

- [ ] **Step 4: Add the official Pages deployment workflow**

Create `.github/workflows/pages.yml` with `contents: read`, `pages: write`, `id-token: write`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4`, and `actions/deploy-pages@v4`. Use Node 22, `npm ci`, `npm test`, and `npm run build:pages` with `working-directory: site`; upload `site/dist/client`.

- [ ] **Step 5: Run the complete local validation**

Run:

```bash
cd site
npm test
npm run lint
npm run build:pages
npm run verify:pages
```

Expected: all suites pass, lint exits zero, the static build exits zero, and the verifier confirms the title, repository path, social image, and main download.

- [ ] **Step 6: Commit Pages support**

```bash
git add .github/workflows/pages.yml site
git commit -m "ci: publish pitch site to GitHub Pages"
```

---

### Task 6: Perform browser QA and publish the repository

**Files:**
- Modify only if validation exposes a defect: `site/app/globals.css`, `site/components/*.tsx`, `site/lib/content.ts`

**Interfaces:**
- Consumes: the retained local preview and verified static build.
- Produces: public repository `sademidenko/temshiki-series` and its GitHub Pages URL.

- [ ] **Step 1: Verify GitHub authentication before mutation**

Run: `gh auth status`  
Expected: account `sademidenko` reports authenticated. The current pre-build check reports an invalid token; if it remains invalid, pause only publication and request `gh auth login -h github.com` from the user while preserving the finished local site.

- [ ] **Step 2: Run explicit desktop and mobile browser QA**

Using the retained preview tab, inspect 1440×900 and 390×844 layouts. Verify the first viewport, all anchors, eight disclosures, three downloads, visible focus, reduced-motion behavior, absence of horizontal overflow, and legibility of the final-choice block. Record and fix only observed defects, then rerun the tests and build.

- [ ] **Step 3: Create and push the public repository**

After authentication succeeds, run:

```bash
gh repo create temshiki-series --public --source=. --remote=origin --push
```

Expected: public repository `sademidenko/temshiki-series` exists and the current branch is pushed without the untracked review archive or `tmp/` material.

- [ ] **Step 4: Enable Pages through GitHub Actions**

Run:

```bash
gh api --method POST repos/sademidenko/temshiki-series/pages -f build_type=workflow
gh run list --workflow pages.yml --limit 1
```

Expected: Pages uses GitHub Actions and the latest workflow appears.

- [ ] **Step 5: Wait for deployment and verify the public result**

Run:

```bash
gh run watch --exit-status
curl -I https://sademidenko.github.io/temshiki-series/
```

Expected: workflow concludes successfully and the public URL returns HTTP 200.

- [ ] **Step 6: Verify public metadata and downloads**

Open `https://sademidenko.github.io/temshiki-series/` in the existing Codex browser tab. Confirm the title, description, `og:image`, all five navigation targets, eight episodes, and these HTTP 200 paths:

```text
https://sademidenko.github.io/temshiki-series/og.png
https://sademidenko.github.io/temshiki-series/materials/temshchiki-season-1-v2.md
https://sademidenko.github.io/temshiki-series/materials/temshchiki-story-bank-2023-2026.md
https://sademidenko.github.io/temshiki-series/materials/temshchiki-team-questions.md
```

- [ ] **Step 7: Record the final publication commit if QA required fixes**

```bash
git add site
git commit -m "fix: polish published pitch experience"
git push
```

Skip this commit when Task 6 produced no source changes.
