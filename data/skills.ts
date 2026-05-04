export type SkillCategory = {
  name: { es: string; en: string }
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: { es: 'Lenguajes', en: 'Languages' },
    icon: 'Code2',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    name: { es: 'Frontend & Backend', en: 'Frontend & Backend' },
    icon: 'Layout',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    name: { es: 'Visión Artificial', en: 'Computer Vision' },
    icon: 'Eye',
    skills: ['OpenCV', 'Computer Vision', 'Image Processing', 'Pattern Detection'],
  },
  {
    name: { es: 'Automatización Industrial', en: 'Industrial Automation' },
    icon: 'Settings',
    skills: ['PLCs', 'SCADA', 'DCS', 'Instrumentation', 'Industrial Protocols'],
  },
  {
    name: { es: 'Energía & Electricidad', en: 'Energy & Electrical' },
    icon: 'Zap',
    skills: ['Photovoltaic Systems', 'Industrial UPS', 'Power Electronics'],
  },
  {
    name: { es: 'Herramientas & DevOps', en: 'Tools & DevOps' },
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Vercel', 'Docker', 'Linux'],
  },
]
