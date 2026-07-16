# Portfolio Minimalist

A printable portfolio/CV built with [Astro](https://astro.build/), TypeScript, and JSON-based content.

## Getting started

```bash
npm install
cp cv.example.json cv.json
cp cv_english.example.json cv_english.json
npm run dev
```

`cv.json` and `cv_english.json` are local, Git-ignored files. They are never required in the repository: when they are absent, the application renders the generic example files instead.

## CV data contract

The authoritative contract is [`schemas/cv.schema.json`](./schemas/cv.schema.json). Validate both local CV files at any time:

```bash
npm run validate:cv
npm run build
```

`build` always validates the example files and any local CV files that exist. An invalid file stops the build and prints the affected JSON path.

The interactive [CV JSON guide](./docs/cv-json-guide.html) provides English and Spanish views, examples, and the language switcher.

### Required top-level fields

Every CV must include these keys. Use an empty array (`[]`) when a list has no entries; do not use `null` or remove the property.

| Field | Purpose |
| --- | --- |
| `basics` | Name, title, contact details, location, and social profiles. |
| `work` | Professional experience. |
| `education` | Formal education. |
| `diplomas`, `courses`, `certificates` | Additional training and credentials. |
| `skills`, `languages`, `hobbies` | Profile information. |
| `projects` | Projects linked to a work entry or grouped as complementary experience. |

### Empty values, `null`, and statuses

Use the following conventions consistently.

| Field | Meaning and rendering behavior |
| --- | --- |
| `work[].endDate: ""` or `null` | The role is current. The UI shows “Current” / “Present”, and the print version shows every highlight for that role. For `Freelance` and `Personal Projects`, the dates are intentionally hidden in print. |
| `work[].endDate: "YYYY-MM-DD"` | The role is completed. The print version keeps the first two highlights to stay compact. |
| `education[].paused: true` | Shows the study as paused. In print, the number of completed semesters is calculated from `startDate` to `endDate`, counting both calendar years in full. |
| `education[].endDate: ""` or `null` | The study is current. In print, semesters are calculated through the current calendar year. |
| `projects[].company: "Company name"` | The value must match a `work[].name`. The project is grouped under that experience on screen. |
| `projects[].company: "Freelance"` | Groups the project under **Freelance experience** on screen. |
| `projects[].company: "Personal"` | Groups the project under **Personal projects** on screen. |
| `projects[].url: null` | No public project link is shown. Use a full URL to show the **View project ↗** action on screen. |
| `projects[].github: null` | The project has no public source repository. |

`company` is required for every project. Do not use `null` or an empty string: the validator rejects them. Dates must use `YYYY-MM-DD`. URLs must be full URLs such as `https://example.com`; empty strings are not valid URLs.

### Featured courses for print

Use `featuredCourses` inside a course provider to curate the highest-impact courses in priority order. `printLimit` controls how many entries from that list appear in the printed **Complementary education** section; the full `courses` list remains available on screen.

```json
{
  "courses": ["Architecture", "Cloud", "Testing"],
  "featuredCourses": ["Architecture", "Cloud"],
  "printLimit": 2
}
```

Every `featuredCourses` item must also exist in `courses`.

### Featured skills for print

Use `featuredSkills` to define the strongest skills in priority order and `skillsPrintLimit` to limit the printed list. Keep each featured skill present in the `skills` array.

### Minimal examples

```json
{
  "work": [{
    "name": "Example Studio",
    "position": "Software Developer",
    "startDate": "2024-01-01",
    "endDate": "",
    "summary": "Built web applications.",
    "highlights": ["Delivered a feature", "Improved performance"]
  }],
  "projects": [{
    "name": "Example Product",
    "company": "Example Studio",
    "isActive": true,
    "description": "A concise description of the product.",
    "highlights": ["Responsive UI"],
    "url": "https://example.com/product",
    "github": null
  }]
}
```

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
