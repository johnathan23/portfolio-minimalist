import { getLocale } from "@/data/cv"

const labels = {
  es: {
    profile: "Perfil profesional", experience: "Experiencia profesional", education: "Educación",
    certifications: "Certificaciones", skills: "Habilidades", projects: "Proyectos independientes", complementaryExperience: "Experiencia complementaria", complementaryEducation: "Formación complementaria",
    freelance: "Experiencia como freelance", personal: "Proyectos personales", featuredProjects: "Proyectos destacados", projectsWorked: "Proyectos:",
    additional: "Formación adicional e intereses", languages: "Idiomas", diplomas: "Diplomas", semesters: "semestres cursados", viewProject: "Ver proyecto", viewCredential: "Ver credencial",
    courses: "Cursos", hobbies: "Hobbies", projectsCount: "proyectos", current: "Actual", specializations: "Especializaciones",
  },
  en: {
    profile: "Professional profile", experience: "Professional experience", education: "Education",
    certifications: "Certifications", skills: "Skills", projects: "Independent projects", complementaryExperience: "Complementary experience", complementaryEducation: "Complementary education",
    freelance: "Freelance experience", personal: "Personal projects", featuredProjects: "Featured projects", projectsWorked: "Projects:",
    additional: "Additional education and interests", languages: "Languages", diplomas: "Diplomas", semesters: "semesters completed", viewProject: "View project", viewCredential: "View credential",
    courses: "Courses", hobbies: "Interests", projectsCount: "projects", current: "Present", specializations: "Specializations",
  },
} as const

export const getLabels = (pathname: string) => labels[getLocale(pathname)]
