import spanishCv from "../../cv.json"
import englishCv from "../../cv_english.json"
import type { CV } from "@/cv"

export type Locale = "es" | "en"

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
    projects: cv.projects ?? [],
  }
}

export const getCv = (pathname: string): CV =>
  normalizeCv(getLocale(pathname) === "en" ? englishCv : spanishCv)
