# AGENTS.md

Instructions and context for AI coding agents working in this repository. The
primary audience is AI assistants, but those assistants will often be helping
students navigate and extend this template — pitch explanations accordingly.

## About this repository

This is a SvelteKit starter template for **JOUR 73361: Coding the News**, a
course at the Craig Newmark Graduate School of Journalism at CUNY. Students
click "Use this template" on GitHub to create their own copy, then publish
data-driven stories to GitHub Pages.

- **Framework:** SvelteKit 2 with Svelte 5 (runes)
- **Build tool:** Vite 6
- **Styling:** SCSS via `vitePreprocess`
- **Adapter:** `@sveltejs/adapter-static` — the site is fully prerendered to
  plain HTML/CSS/JS
- **Hosting:** GitHub Pages, deployed by `.github/workflows/deploy.yml` on push
  to `main`
- **Docs/component gallery:** Storybook 10, published at
  `/<repo>/storybook/` alongside the main site
- **Tests:** Vitest + @testing-library/svelte in a jsdom environment

## Repository layout

```
src/
├── app.html                    HTML shell
├── app.scss                    Global styles + :root design tokens
├── lib/
│   ├── components/<Section>/   Reusable Svelte components
│   │   ├── Article/            ArticleHeader, ArticleBody, Blockquote, Byline, …
│   │   ├── Data/               BigNumber, Card, Dashboard, DatabaseHeader, Ranking*
│   │   ├── Forms/              DropdownInput, SearchInput
│   │   ├── Layout/             SiteHeader, SiteFooter
│   │   ├── Maps/               Map, MapLayer, LocatorMap, Geocoder (MapLibre GL)
│   │   ├── Media/              Image, Diptych, LottieGraphic
│   │   └── MultimediaGallery/  SlideGallery + slide types
│   ├── styles/                 SCSS partials (barrel exported)
│   │   ├── _index.scss         @forwards variables + mixins
│   │   ├── _variables.scss     Sass-only values (breakpoints)
│   │   └── _mixins.scss        mobile / tablet / desktop media queries
│   └── __mocks__/              Test-only stubs (e.g., $app/paths)
├── routes/                     SvelteKit pages (+page.svelte, +layout.svelte, …)
├── stories/<Section>/          Storybook *.stories.svelte files, mirror components/
└── tests/<Section>.test.js     Vitest files, one per component section

static/                         Served at the site root (photos, logos, favicon, …)
.github/
├── workflows/deploy.yml        Build + deploy to GitHub Pages
└── skills/                     Local agent skills (see "Agent skills" below)
```

## Conventions that agents must follow

### Svelte 5 runes only

This project uses **Svelte 5**. Always use runes:

- `let { foo } = $props()` — not `export let foo`
- `let count = $state(0)` — not a bare `let`
- `$derived(...)`, `$effect(...)`, `{@render children()}` — not slots or
  reactive `$:` statements

Do not mix Svelte 4 syntax into a Svelte 5 file.

### Import with the `$lib` alias

Always import from `$lib/...`, never with relative paths that climb out of a
directory:

```js
import Image from '$lib/components/Media/Image.svelte'; // ✅
import Image from '../../lib/components/Media/Image.svelte'; // ❌
```

The same alias works in tests (configured in `vite.config.js`).

### Respect the `base` path — **this is a common mistake**

The site is served from a subdirectory on GitHub Pages
(`https://<user>.github.io/<repo>/`). Any link or asset that starts with `/`
must be prefixed with the `base` export from `$app/paths`, or it will 404 in
production even though it works in `npm run dev`.

```svelte
<script>
  import { base } from '$app/paths';
</script>

<img src="{base}/photos/{photo.filename}" alt="…" />
<!-- ✅ -->
<a href="{base}/about">About</a>
<!-- ✅ -->

<img src="/photos/hero.jpg" />
<!-- ❌ breaks in prod -->
```

`BASE_PATH` is set automatically by the deploy workflow; locally it is empty,
which is why the bug only surfaces after deploy. **When you add any static
asset reference or internal link, use `base`.**

### Styling uses design tokens, not hard-coded values

- Global CSS custom properties live in the `:root` block of
  [src/app.scss](src/app.scss).
- Breakpoint Sass variables and mixins live in
  [src/lib/styles/](src/lib/styles/).
- In component `<style lang="scss">` blocks, use
  `@use '$lib/styles' as *;` and apply `@include mobile { … }`,
  `@include tablet { … }`, `@include desktop { … }` instead of raw media
  queries. Use CSS custom properties (`var(--spacing-sm)`, `var(--color-accent)`,
  etc.) rather than literal colors / spacings / font sizes.

### Design tokens must stay documented

[src/stories/DesignTokens.mdx](src/stories/DesignTokens.mdx) is the canonical
reference for every design token. **Keep it in sync.** Whenever you add,
remove, or change any of the following, update `DesignTokens.mdx` in the same
change:

- A CSS custom property in the `:root` block of [src/app.scss](src/app.scss)
- A SCSS variable in [src/lib/styles/\_variables.scss](src/lib/styles/_variables.scss)
- A SCSS mixin in [src/lib/styles/\_mixins.scss](src/lib/styles/_mixins.scss)
- The barrel file [src/lib/styles/\_index.scss](src/lib/styles/_index.scss)
  (e.g., a new partial is added)

| Change                              | What to update in DesignTokens.mdx                                     |
| ----------------------------------- | ---------------------------------------------------------------------- |
| New color token                     | Add a row to the relevant color table (swatch + token + value + usage) |
| Renamed or removed token            | Remove or rename the corresponding row/entry                           |
| New spacing step                    | Add a row to the Spacing section                                       |
| New layout token                    | Add a row to the Layout table                                          |
| New border/transition/opacity token | Add a row to the relevant table                                        |
| New SCSS variable                   | Add a row to the SCSS Variables table                                  |
| New SCSS mixin                      | Add a code block to the SCSS Mixins section                            |
| Changed breakpoint value            | Update both the SCSS Variables table and the mixin descriptions        |

### Adding a component requires three pieces

Every component in `src/lib/components/<Section>/Name.svelte` **must** ship
with both of its partners:

1. **Component** — `src/lib/components/<Section>/Name.svelte`
2. **Storybook story** — `src/stories/<Section>/Name.stories.svelte`
3. **Test coverage** — an entry in `src/tests/<Section>.test.js` (one test
   file per section, not per component)

A PR that adds a new component without its story and test is incomplete. The
same applies when renaming or removing a component — update all three places.

## Before declaring work complete

Run all three, in any order:

```bash
npm run lint        # ESLint
npm run format      # Prettier (writes changes)
npm run test        # Vitest, once
```

If you started a dev server (`npm run dev`) or Storybook (`npm run storybook`),
visually verify the change in a browser before reporting success.

## Agent skills in this repo

The [.github/skills/](.github/skills/) directory contains local skill scripts
that agents should prefer over generic alternatives:

- **[browser-screenshots](.github/skills/browser-screenshots/SKILL.md)** — use
  for any screenshot, GIF, or video of a URL or local dev server. Runs via
  Playwright (`node .github/skills/browser-screenshots/scripts/capture.cjs …`).
  Do **not** use the Vercel plugin's screenshot tool — use this script.
- **[page-scroll-video](.github/skills/page-scroll-video/SKILL.md)** — scripted
  scroll-through recordings.
- **[vscode-screenshots](.github/skills/vscode-screenshots/SKILL.md)** — VS
  Code window captures for tutorial material.
- **[class-script-writing](.github/skills/class-script-writing/SKILL.md)** —
  conventions for writing the weekly class tutorial scripts.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main` and every pull
request:

1. `npm ci`
2. `npm run test`
3. `npm run build` with `BASE_PATH=/<repo-name>`
4. `npm run build-storybook` into `build/storybook/`
5. Uploads `build/` to GitHub Pages (only on `main`, not PRs)

For the deploy to work, the repo owner must set **Settings → Pages → Source**
to **GitHub Actions**.

## Helping students

When a student is stuck:

- Prefer editing `src/routes/+page.svelte` and the components under
  `src/lib/components/` — that is where their story content lives.
- Point them at the Storybook gallery (`npm run storybook`, then
  http://localhost:6006) as the canonical reference for available components
  and their props.
- Explain _why_ a change matters (base paths, design tokens, Svelte 5 runes)
  rather than just applying it silently — the goal is learning, not just a
  working site.
