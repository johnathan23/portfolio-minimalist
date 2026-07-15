import { getLocale } from "@/lib/cv"

const labels = {
  es: {
    profile: "Perfil profesional", experience: "Experiencia profesional", education: "Educación",
    certifications: "Certificaciones", skills: "Habilidades", projects: "Proyectos independientes",
    freelance: "Freelance", personal: "Personales", featuredProjects: "Proyectos destacados",
    additional: "Formación adicional e intereses", languages: "Idiomas", diplomas: "Diplomas",
    courses: "Cursos", hobbies: "Hobbies", projectsCount: "proyectos", current: "Actual",
  },
  en: {
    profile: "Professional profile", experience: "Professional experience", education: "Education",
    certifications: "Certifications", skills: "Skills", projects: "Independent projects",
    freelance: "Freelance", personal: "Personal", featuredProjects: "Featured projects",
    additional: "Additional education and interests", languages: "Languages", diplomas: "Diplomas",
    courses: "Courses", hobbies: "Interests", projectsCount: "projects", current: "Present",
  },
} as const

export const getLabels = (pathname: string) => labels[getLocale(pathname)]
