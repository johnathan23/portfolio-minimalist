export interface CV {
  basics: Basics
  work: Array<Work>
  education: Array<Education>
  certificates: Array<Certificates>
  courses: Array<Courses>
  skills: Array<Skills>
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
  position: string
  url: string
  startDate: DateStr
  endDate: DateStr | null
  summary: string
  highlights?: Highlight
}

type DateStr = `${string}-${string}-${string}`

interface Skills {
  name: string
  level: string
}

interface Certificates {
  name: string,
  date: DateStr,
  validThrough: DateStr,
  issuer: string,
  url: string
}

interface Courses {
  institution: string,
  area: string,
  studyType: string,
  courses: Array<string>
}

interface Education {
  institution: string
  area: string
  paused: boolean
  studyType: string
  startDate: DateStr
  endDate: DateStr
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
