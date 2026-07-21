# Portfolio Minimalist

A printable portfolio/CV built with [Astro](https://astro.build/), TypeScript, and JSON-based content.

## Getting started

```bash
npm install
npm run dev
```

Your CV data is managed through `src/data/en.json` (English) and `src/data/es.json` (Spanish). You should modify these files directly to customize your curriculum. These files are part of the project's source code and are not Git-ignored.

## CV JSON Documentation

For a complete and detailed guide on the structure of your CV data files (`src/data/en.json`, `src/data/es.json`), including all properties, types, requirements, and handling of null or empty values, please refer to the [CV JSON Schema Guide](./docs/SCHEMA_GUIDE.md).

The authoritative contract for the CV data structure remains [`schemas/cv.schema.json`](./schemas/cv.schema.json). You can validate your CV data files at any time with:

```bash
npm run validate:cv
npm run build
```

`build` always validates your CV data files (`src/data/en.json`, `src/data/es.json`) that exist. An invalid file stops the build and prints the affected JSON path.


## GitHub Pages configuration

Set your public site URL and repository base path in [`astro.config.mjs`](./astro.config.mjs):

```js
export default defineConfig({
  site: "https://your-username.github.io/your-repository",
  base: "/your-repository/",
});
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server. |
| `npm run validate:cv` | Validates example and available local CV JSON files. |
| `npm run build` | Validates the CV files, checks Astro, and creates `dist/`. |
| `npm run preview` | Serves the production build locally. |
