export interface CV {
  basics: Basics
  work: Array<Work>
  education: Array<Education>
  diplomas: Array<StudyGroup>
  certificates: Array<Certificates>
  courses: Array<StudyGroup>
  skills: SkillsSection
  featuredSkills?: Array<string>
  skillsPrintLimit?: number
  specializations?: Array<Specialization>
  languages: Array<Languages>
  hobbies: Hobbies
  projects: Array<Projects>
}

interface Basics {
  name: string
  label: string
  image: string
  email: string
  phone: string
  url?: string
  summary: string
  location: Location
  profiles: Array<Profiles>
}

interface Location {
  address?: string
  postalCode: string
  city: string
  countryCode: string
  region: string
}

interface Profiles {
  network: string
  username: string
  url: string
}

interface Work {
  name: string
  position: string | null
  url: string
  startDate: DateStr | null
  endDate: DateStr | null
  summary: string
  highlights?: Highlight
}

interface Specialization {
  title: string
  description: string
  skills: Array<string>
}

type DateStr = `${string}-${string}-${string}`

interface Skill {
  name: string
  level: string
}

interface SkillsSection {
  items: Array<Skill>
}

interface Certificates {
  name: string,
  date: DateStr,
  validThrough: DateStr,
  issuer: string,
  url: string
}

interface StudyGroup {
  institution: string,
  area: string,
  studyType: string,
  courses: Array<string>
  featuredCourses?: Array<string>
}

interface Education {
  institution: string
  area: string
  paused: boolean
  studyType: string
  startDate: DateStr | null
  endDate: DateStr | null
}

interface Languages {
  language: Language
  fluency: string
}

type Language = string

type Hobbies = string[]

interface Projects {
  name: string
  company: string
  isActive: boolean
  description: string
  highlights: Highlight
  url?: string
  github?: string
}


type Highlight = Array<String>
