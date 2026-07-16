import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import spanishExample from "./es.json"
import englishExample from "./en.json"
import type { CV } from "@/cv"

export type Locale = "es" | "en"

const loadLocalCv = (fileName: string, fallback: unknown) => {
  const filePath = resolve(process.cwd(), fileName)
  return existsSync(filePath) ? JSON.parse(readFileSync(filePath, "utf8")) : fallback
}

const spanishCv = loadLocalCv("src/data/es.json", spanishExample)
const englishCv = loadLocalCv("src/data/en.json", englishExample)

export const getLocale = (pathname: string): Locale =>
  pathname.startsWith("/en") || pathname.includes("/en/") ? "en" : "es"

const normalizeCv = (source: unknown): CV => {
  const cv = source as CV

  return {
    ...cv,
    diplomas: cv.diplomas ?? [],
    certificates: cv.certificates ?? [],
    courses: cv.courses ?? [],
    languages: cv.languages ?? [],
    hobbies: cv.hobbies ?? [],
    projects: cv.projects,
    work: cv.work,
  }
}

export const getCv = (pathname: string): CV =>
  normalizeCv(getLocale(pathname) === "en" ? englishCv : spanishCv)

export const getUnfilteredProjects = (pathname: string) => {
  const cv = (getLocale(pathname) === "en" ? englishCv : spanishCv) as CV
  return cv.projects ?? []
}

export const getComplementaryWork = (_pathname: string) => {
  return []
}
