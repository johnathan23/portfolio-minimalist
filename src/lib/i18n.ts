import { getLocale } from "@/lib/cv"

const labels = {
  es: {
    profile: "Perfil profesional", experience: "Experiencia profesional", education: "Educación",
    certifications: "Certificaciones", skills: "Habilidades", projects: "Proyectos independientes",
    freelance: "Experiencia como freelance", personal: "Experiencia personal", featuredProjects: "Proyectos destacados", projectsWorked: "Proyectos:",
    additional: "Formación adicional e intereses", languages: "Idiomas", diplomas: "Diplomas", semesters: "semestres cursados", viewProject: "Ver proyecto",
    courses: "Cursos", hobbies: "Hobbies", projectsCount: "proyectos", current: "Actual",
  },
  en: {
    profile: "Professional profile", experience: "Professional experience", education: "Education",
    certifications: "Certifications", skills: "Skills", projects: "Independent projects",
    freelance: "Freelance experience", personal: "Personal experience", featuredProjects: "Featured projects", projectsWorked: "Projects:",
    additional: "Additional education and interests", languages: "Languages", diplomas: "Diplomas", semesters: "semesters completed", viewProject: "View project",
    courses: "Courses", hobbies: "Interests", projectsCount: "projects", current: "Present",
  },
} as const

export const getLabels = (pathname: string) => labels[getLocale(pathname)]
