import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schema = JSON.parse(await readFile(new URL("../schemas/cv.schema.json", import.meta.url), "utf8"));
const defaultFiles = ["cv.example.json", "cv_english.example.json", "cv.json", "cv_english.json", "src/data/es.json", "src/data/en.json"].filter(existsSync);
const files = process.argv.slice(2).length ? process.argv.slice(2) : defaultFiles;
const ajv = new Ajv({ allErrors: true, strict: false, validateFormats: true });
addFormats(ajv);
const validate = ajv.compile(schema);
let isValid = true;

const normalizeCompany = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

const validateProjectCompanies = (data) => {
  const workCompanies = new Set(data.work.map(({ name }) => normalizeCompany(name)));
  return data.projects.flatMap((project, index) => {
    const company = normalizeCompany(project.company);
    const isComplementary = company === "personal" || company === "freelance";
    return isComplementary || workCompanies.has(company)
      ? []
      : [`/projects/${index}/company must be \"Personal\", \"Freelance\", or match a work[].name value`];
  });
};

const validateFeaturedCourses = (data) => data.courses.flatMap((group, index) =>
  (group.featuredCourses ?? []).flatMap((course) =>
    group.courses.includes(course)
      ? []
      : [`/courses/${index}/featuredCourses must only contain items from courses`],
  ),
);

for (const file of files) {
  let data;
  try {
    data = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    console.error(`✗ ${file}: cannot read valid JSON (${error.message})`);
    isValid = false;
    continue;
  }

  const schemaIsValid = validate(data);
  const semanticErrors = schemaIsValid
    ? [...validateProjectCompanies(data), ...validateFeaturedCourses(data)]
    : [];
  if (schemaIsValid && semanticErrors.length === 0) {
    console.log(`✓ ${file} matches schemas/cv.schema.json`);
    continue;
  }

  isValid = false;
  console.error(`✗ ${file} does not match schemas/cv.schema.json`);
  for (const error of validate.errors ?? []) {
    console.error(`  ${error.instancePath || "/"} ${error.message}`);
  }
  for (const error of semanticErrors) {
    console.error(`  ${error}`);
  }
}

process.exitCode = isValid ? 0 : 1;
