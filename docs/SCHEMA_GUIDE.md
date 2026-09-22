# CV JSON Schema Guide

The files [`src/data/es.json`](../src/data/es.json) and [`src/data/en.json`](../src/data/en.json) contain the Spanish and English portfolio data. Keep the same structure in both files, translating text values as needed. This guide and the example file do not replace either locale file.

The authoritative contract is [`schemas/cv.schema.json`](../schemas/cv.schema.json).

```bash
npm run validate:cv
npm run build
```

## Quick Start

1. Copy [`src/data/example.json`](../src/data/example.json) or one of the locale files.
2. Change values while keeping property names unchanged.
3. Use double quotes, `true`/`false` for booleans, and `null` only where documented.
4. Run `npm run validate:cv` before committing.

The schema rejects unknown properties inside objects. Misspelled properties, trailing commas, and empty required strings fail validation.

## General Conventions

| Data | Accepted format |
| --- | --- |
| Text | Non-empty string when required. |
| Date | `YYYY-MM-DD`, for example `2026-09-22`. |
| URL | Complete URL including a protocol, such as `https://example.com`. |
| Optional URL | Use `null` where supported. `work.url` also accepts `""`. |
| Unknown or ongoing date | Use `null` where allowed. `work.endDate` also accepts `""` for a current job. |
| Empty list | Use `[]`, never `null`. |
| Boolean | Use `true` or `false` without quotes. |

## Top-Level Properties

Required: `basics`, `work`, `education`, `diplomas`, `certificates`, `courses`, `skills`, `languages`, `hobbies`, and `projects`.

Optional: `professionalCertificates`, legacy `profesionalCertificates`, `specializations`, `pricing`, `featuredSkills`, and `skillsPrintLimit`.

## `basics`

Required fields are `name`, `label`, `image`, `email`, `phone`, `summary`, `location`, and `profiles`. `url` is optional and must be omitted when there is no valid URL. The current photo path is `/me.webp`, served from `public/me.webp`.

`location` requires `postalCode`, `city`, `countryCode`, and `region`; `address` is optional. Use a two-letter country code such as `CO`, `US`, or `ES`.

Each profile requires `network`, `username`, and `url`. Known icon names include `LinkedIn`, `GitHub`, and `X`; other network names remain valid but may not have an icon.

## `work`

Each item requires `name`, `position`, `startDate`, `endDate`, and `summary`. `position` may be `null`. `startDate` may be a date or `null`; `endDate` may be a date, `null`, or `""`. Use `null` or `""` for a current job. `url` and `highlights` are optional; use `[]` when there are no highlights.

## `education`

Each item requires `institution`, `area`, `studyType`, `startDate`, `endDate`, and `paused`. Dates may be a date or `null`. `paused: true` means the studies are paused. `studyType` is free text, for example `Bachelor's Degree` or `Master's Degree`.

## `diplomas` and `courses`

Both arrays use the same structure. Each group requires `institution`, `area`, `studyType`, and `courses`.

- `featuredCourses` is optional; every value must exactly match an item in `courses`.
- `printLimit` is optional and must be an integer greater than or equal to `1`.

## Certificates

`certificates` items require `name`, `date`, `validThrough`, `issuer`, and `url`. Dates use `YYYY-MM-DD` and are intended for certificates with expiration dates.

`professionalCertificates` items require `name`, `issuer`, and `taughtBy`. `url` is optional and accepts a URL or `null`; dates are not required. The misspelled `profesionalCertificates` alias is supported only for compatibility.

## `skills`

`skills.items` contains objects with `name` and `level`. The schema accepts any non-empty level string, but the UI only groups these exact values:

| Spanish file (`es.json`) | English file (`en.json`) | Meaning |
| --- | --- | --- |
| `Master` | `Master` | Deep or exceptional mastery. |
| `Experto` | `Expert` | Expert proficiency. |
| `Avanzado` | `Advanced` | Strong, autonomous proficiency. |
| `Intermedio` | `Intermediate` | Functional proficiency. |
| `Basico` | `Basic` | Fundamental knowledge. |

Use the value matching the locale. The Spanish value is intentionally `Basico` without an accent because that is what the UI recognizes. Other values pass schema validation but will not appear in a visible skill group.

`featuredSkills` is a top-level array of exact skill names shown in print. The UI does not automatically verify that they exist in `skills.items`. Unknown skill names use a fallback icon.

## `languages`

Each item requires `language` and `fluency`. `fluency` is free text. Recommended values are `C2`, `C1`, `B2`, `B1`, `A2`, and `A1`. `C2` renders as `Native` in English and `Nativo` in Spanish. Values such as `Bilingual` or `Fluent` are displayed exactly as written.

## `hobbies`, `specializations`, and `projects`

`hobbies` is a list of non-empty strings.

Each `specializations` item requires `title`, `description`, and `skills`. This section appears in the printable CV.

Each project requires `name`, `company`, `isActive`, `description`, `highlights`, `url`, and `github`.

- `company` must be `Personal`, `Freelance`, or match a `work[].name` value. Comparison ignores case, spaces, and special characters.
- `isActive: true` means the project is ongoing.
- `highlights` is a list of strings; use `[]` when empty.
- `url` and `github` accept a URL or `null`.

## `pricing`

This optional object requires `currency`, `baseRate`, `features`, and `teamComposition`.

- `currency` is text such as `USD` or `COP`.
- `baseRate` and feature `price` values must be at least `0`.
- Each feature requires `id`, `label`, `price`, and positive integer `order`.
- Each team composition requires `id`, `label`, `priceModifier`, and `timeModifier`. Modifiers may be positive, zero, or negative.

## Common Problems

| Problem | Fix |
| --- | --- |
| A skill level does not appear | Check the exact locale-specific spelling. |
| `featuredCourses` fails | Every value must exist in that group's `courses`. |
| A project fails on `company` | Use `Personal`, `Freelance`, or a company listed in `work`. |
| A URL fails | Include `https://`, or use `null` where supported. |
| A current job fails | Use `endDate: ""` or `endDate: null`, never `"Current"`. |
| The JSON looks correct but fails | Run `npm run validate:cv`; the output includes the failing JSON path. |
