export type SkillCategory = {
  name: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Lenguajes',
    icon: 'Code2',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    name: 'Frontend & Backend',
    icon: 'Layout',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    name: 'Visión Artificial',
    icon: 'Eye',
    skills: ['OpenCV', 'Computer Vision', 'Procesamiento de Imágenes', 'Detección de Patrones'],
  },
  {
    name: 'Automatización Industrial',
    icon: 'Settings',
    skills: ['PLCs', 'SCADA', 'DCS', 'Instrumentación', 'Protocolos Industriales'],
  },
  {
    name: 'Energía & Electricidad',
    icon: 'Zap',
    skills: ['Sistemas Fotovoltaicos', 'UPS Industrial', 'Electrónica de Potencia'],
  },
  {
    name: 'Herramientas & DevOps',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Vercel', 'Docker', 'Linux'],
  },
]
