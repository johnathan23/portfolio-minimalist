# CV JSON Schema Guide

This document details the structure and properties of the `cv.json` file that powers the portfolio. The complete and authoritative schema can be found in [`../schemas/cv.schema.json`](../schemas/cv.schema.json).

## Philosophy and Conventions

- **Avoid `null` (with exceptions):** As a general rule, avoid `null`. If a list has no elements (like `highlights` in a work entry), use an empty array (`[]`). The only documented exceptions are `work.endDate`, `education.endDate`, `project.url`, and `project.github`.
- **Empty strings (`""`):** Intentionally used in certain date fields (`work.endDate`, `education.endDate`) to indicate a "current" or "ongoing" status. In other text fields, an empty string is considered invalid by the schema if the field requires content (`minLength: 1`).
- **Dates:** Must follow the `YYYY-MM-DD` format.
- **URLs:** Must be complete, including the protocol (e.g., `https://example.com`).

---

## Root Object

The main JSON object must contain the following top-level properties. All are required.

| Property | Type | Description |
| :--- | :--- | :--- |
| `basics` | `Object` | Basic personal information, contact details, and social profiles. |
| `work` | `Array<Object>` | Professional experience. |
| `education` | `Array<Object>` | Formal academic education. |
| `diplomas` | `Array<Object>` | Grouping of diplomas by area and institution. |
| `certificates` | `Array<Object>` | Individual certifications with issue and expiration dates. |
| `courses` | `Array<Object>` | Grouping of courses by area and institution. |
| `skills` | `Object` | List of skills and configuration for featured ones. |
| `languages` | `Array<Object>` | Languages and proficiency levels. |
| `hobbies` | `Array<String>` | List of hobbies or interests. |
| `projects` | `Array<Object>` | Personal projects or projects associated with work experience. |

---

## `basics`

Contains your identity, contact information, and a professional summary.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `name` | `String` | ✅ Yes | Your full name. |
| `label` | `String` | ✅ Yes | Your main title or role (e.g., "Software Engineer"). |
| `image` | `String` | ✅ Yes | Path to your profile photo. Currently, the only supported value is `"/me.webp"`. |
| `email` | `String` | ✅ Yes | Your email address. Must be a valid email format. |
| `phone` | `String` | ✅ Yes | Your phone number. |
| `url` | `String` | ❌ No | URL to your website or main portfolio. |
| `summary` | `String` | ✅ Yes | A brief paragraph describing you professionally. |
| `location` | `Object` | ✅ Yes | Contains your location details. See `location` table below. |
| `profiles` | `Array<Object>` | ✅ Yes | A list of your social media or professional platform profiles. See `profiles` table below. |

### `basics.location`

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `address` | `String` | ❌ No | Your postal address (street and number). Generally not displayed for privacy. |
| `postalCode`| `String` | ✅ Yes | Your postal code. |
| `city` | `String` | ✅ Yes | The city where you reside. |
| `countryCode`| `String` | ✅ Yes | Your country code (e.g., "US", "GB"). |
| `region` | `String` | ✅ Yes | The region, state, or province. |

### `basics.profiles`

Each object in the `profiles` array represents a social profile.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `network` | `String` | ✅ Yes | The name of the social network (e.g., "LinkedIn", "GitHub", "X"). The system will attempt to display an icon matching this name. |
| `username` | `String` | ✅ Yes | Your username on that network. |
| `url` | `String` | ✅ Yes | The full URL to your profile. |

### Example `basics`

```json
"basics": {
  "name": "John Doe",
  "label": "Full-Stack Software Developer",
  "image": "/me.webp",
  "email": "john.doe@email.com",
  "phone": "+1 555 123 4567",
  "url": "https://johndoe.dev",
  "summary": "Developer with 5 years of experience in modern web technologies, focused on building robust and scalable applications.",
  "location": {
    "postalCode": "10001",
    "city": "New York",
    "countryCode": "US",
    "region": "New York"
  },
  "profiles": [
    {
      "network": "LinkedIn",
      "username": "john-doe-dev",
      "url": "https://linkedin.com/in/john-doe-dev"
    },
    {
      "network": "GitHub",
      "username": "john-doe",
      "url": "https://github.com/john-doe"
    }
  ]
}
```

---

## `work`

An array of objects, where each object represents a work experience entry.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `name` | `String` | ✅ Yes | Company name. |
| `position` | `String` or `null` | ✅ Yes | Your job title. Can be `null` if not applicable (e.g., for grouping `Freelance` projects). |
| `url` | `String` | ❌ No | Company website URL. |
| `startDate` | `String` | ✅ Yes | Start date in `YYYY-MM-DD` format. |
| `endDate` | `String` or `null` | ✅ Yes | End date. Use `""` (empty string) or `null` if it's your current job. |
| `summary` | `String` | ✅ Yes | A summary of your responsibilities in the role. |
| `highlights`| `Array<String>` | ❌ No | A list of your achievements or key tasks. Use `[]` if none. |

### Example `work`

```json
"work": [
  {
    "name": "Global Tech Inc.",
    "position": "Senior Software Engineer",
    "url": "https://globaltech.com",
    "startDate": "2020-09-01",
    "endDate": null,
    "summary": "Led the development of the main product, improving scalability and user experience.",
    "highlights": [
      "Redesigned backend architecture, reducing latency by 40%.",
      "Implemented a new CI/CD system with GitHub Actions."
    ]
  },
  {
    "name": "Creative Startup",
    "position": "Frontend Developer",
    "startDate": "2018-06-01",
    "endDate": "2020-08-31",
    "summary": "Developed user interfaces for mobile and web applications with React and React Native.",
    "highlights": []
  }
]
```

---

## `education`

An array of objects, where each object represents a stage of your academic education.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `institution`| `String` | ✅ Yes | Name of the educational institution. |
| `area` | `String` | ✅ Yes | Area of study or degree (e.g., "Computer Science"). |
| `studyType` | `String` | ✅ Yes | Type of study (e.g., "Bachelor's", "Master's"). |
| `startDate` | `String` | ✅ Yes | Start date in `YYYY-MM-DD` format. |
| `endDate` | `String` or `null` | ✅ Yes | End date. Use `""` (empty string) or `null` if you are still studying. |
| `paused` | `Boolean` | ✅ Yes | Set to `true` if studies are currently paused. `false` otherwise. |

### Example `education`

```json
"education": [
  {
    "institution": "Polytechnic University of Madrid",
    "area": "Software Engineering",
    "studyType": "Master's Degree",
    "startDate": "2021-09-01",
    "endDate": "2022-07-15",
    "paused": false
  },
  {
    "institution": "Complutense University of Madrid",
    "area": "Computer Science",
    "studyType": "Bachelor's Degree",
    "startDate": "2017-09-01",
    "endDate": "2021-06-30",
    "paused": false
  }
]
```

---

## `diplomas`, `courses`

Both are arrays of objects with the same structure, representing groupings of studies or courses.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `institution`| `String` | ✅ Yes | Name of the institution offering the diploma/course. |
| `area` | `String` | ✅ Yes | Thematic area (e.g., "Web Development", "Cloud Computing"). |
| `studyType` | `String` | ✅ Yes | Type of study (e.g., "Bootcamp", "Specialization"). |
| `courses` | `Array<String>` | ✅ Yes | List of names of specific courses/topics. Use `[]` if none. |
| `featuredCourses`| `Array<String>` | ❌ No | List of names of featured courses, in priority order. Must exist in `courses`. |
| `printLimit` | `Integer` | ❌ No | Maximum number of `featuredCourses` to display in the printed version. |

### Example `diplomas` or `courses`

```json
"courses": [
  {
    "institution": "Platzi",
    "area": "Web Development",
    "studyType": "Learning Path",
    "courses": ["Frontend Developer", "Backend with Node.js", "Databases with PostgreSQL"],
    "featuredCourses": ["Frontend Developer", "Backend with Node.js"],
    "printLimit": 2
  }
]
```

---

## `certificates`

An array of objects, where each object represents an obtained certification.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `name` | `String` | ✅ Yes | Name of the certification. |
| `date` | `String` | ✅ Yes | Issue date in `YYYY-MM-DD` format. |
| `validThrough`| `String` | ✅ Yes | Expiration date in `YYYY-MM-DD` format. |
| `issuer` | `String` | ✅ Yes | Entity that issued the certification (e.g., "AWS", "Google"). |
| `url` | `String` | ✅ Yes | URL to the certificate. |

### Example `certificates`

```json
"certificates": [
  {
    "name": "AWS Certified Solutions Architect - Associate",
    "date": "2023-03-10",
    "validThrough": "2026-03-10",
    "issuer": "AWS",
    "url": "https://www.credly.com/badges/..."
  }
]
```

---

## `skills`

An object that describes your professional skills.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `items` | `Array<Object>` | ✅ Yes | List of individual skills. See `skill` table below. |
| `featured` | `Array<String>` | ❌ No | List of names of featured skills, in priority order. Must exist in `items`. |
| `skillsPrintLimit`| `Integer` | ❌ No | Maximum number of `featured` skills to display in the printed version. |

### `skills.items`

Each object in the `items` array describes a skill.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `name` | `String` | ✅ Yes | Name of the skill (e.g., "JavaScript", "Docker"). |
| `level` | `String` | ✅ Yes | Proficiency level (e.g., "Advanced", "Intermediate"). |

### Example `skills`

```json
"skills": {
  "items": [
    { "name": "JavaScript", "level": "Advanced" },
    { "name": "React", "level": "Advanced" },
    { "name": "Node.js", "level": "Intermediate" },
    { "name": "TypeScript", "level": "Advanced" },
    { "name": "AWS", "level": "Intermediate" }
  ],
  "featured": ["React", "Node.js", "AWS"],
  "skillsPrintLimit": 3
}
```

---

## `languages`

An array of objects, where each object describes a language.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `language` | `String` | ✅ Yes | Name of the language (e.g., "Spanish", "English"). |
| `fluency` | `String` | ✅ Yes | Fluency level (e.g., "Native", "Bilingual", "Advanced"). |

### Example `languages`

```json
"languages": [
  { "language": "Spanish", "fluency": "Native" },
  { "language": "English", "fluency": "Bilingual" }
]
```

---

## `hobbies`

An array of strings, where each string is a hobby or interest.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `(element)` | `String` | ✅ Yes | Name of the hobby (e.g., "Reading", "Hiking"). |

### Example `hobbies`

```json
"hobbies": [
  "Reading",
  "Hiking",
  "Photography"
]
```

---

## `projects`

An array of objects, where each object describes a project.

| Property | Type | Required | Description and Behavior |
| :--- | :--- | :--- | :--- |
| `name` | `String` | ✅ Yes | Name of the project. |
| `company` | `String` | ✅ Yes | Company or category the project belongs to. Must be the `name` of a `work` entry, or one of these keywords: `"Freelance"` or `"Personal"`. |
| `isActive` | `Boolean` | ✅ Yes | `true` if the project is active/ongoing, `false` if completed. |
| `description`| `String` | ✅ Yes | A brief description of the project. |
| `highlights`| `Array<String>` | ✅ Yes | List of key features or achievements of the project. Use `[]` if none. |
| `url` | `String` or `null` | ❌ No | URL of the deployed project. Use `null` if no public URL. |
| `github` | `String` or `null` | ❌ No | URL of the GitHub repository. Use `null` if no public repository. |

### Example `projects`

```json
"projects": [
  {
    "name": "Task Management Application",
    "company": "Global Tech Inc.",
    "isActive": false,
    "description": "Internal tool to optimize team task assignment and tracking.",
    "highlights": [
      "Slack integration for automatic notifications.",
      "Intuitive user interface with React."
    ],
    "url": "https://tasks-app.globaltech.com",
    "github": null
  },
  {
    "name": "Personal Blog",
    "company": "Personal",
    "isActive": true,
    "description": "Personal blog where I share articles on web development and technology.",
    "highlights": [
      "Developed with Astro and Tailwind CSS.",
      "Optimized for SEO and performance."
    ],
    "url": "https://johndoe.dev/blog",
    "github": "https://github.com/john-doe/personal-blog"
  }
]
```
