export type ProjectCategory = 'software' | 'industrial' | 'energy'

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  achievement: string
  technologies: string[]
  category: ProjectCategory
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'vision-fugas',
    title: 'Sistema de Detección de Fugas',
    subtitle: 'Visión Artificial & Automatización',
    description:
      'Solución de software de escritorio para la detección proactiva de fugas presurizadas en tuberías de transporte de relaves en entornos mineros. El sistema analiza patrones visuales de erupción en tiempo real mediante visión computacional.',
    achievement:
      'Integración exitosa con el DCS (Distributed Control System) de la planta, habilitando respuestas automatizadas y centralizadas ante alertas críticas de seguridad.',
    technologies: ['Python', 'OpenCV', 'Protocolos Industriales', 'DCS', 'Visión Artificial'],
    category: 'software',
  },
  {
    id: 'instrumentacion-control',
    title: 'Instrumentación y Control Industrial',
    subtitle: 'Planta de Procesos Mineros',
    description:
      'Desempeño como instrumentista a cargo de la calibración, configuración y mantenimiento de sensores y actuadores en planta de procesos mineros. Garantía de precisión en variables de control para la continuidad operativa.',
    achievement:
      'Minimización de tiempos de parada no programados y optimización de la eficiencia operativa de la planta mediante mantenimiento preventivo y correctivo de instrumentos de control.',
    technologies: ['Sensores Industriales', 'Actuadores', 'Calibración', 'PLCs', 'SCADA'],
    category: 'industrial',
  },
  {
    id: 'ups-industrial',
    title: 'Sistemas UPS Industriales',
    subtitle: 'Diagnóstico y Mantenimiento',
    description:
      'Ejecución de protocolos de diagnóstico preventivo y correctivo para sistemas de alimentación ininterrumpida de gran escala en entornos mineros. Análisis de bancos de baterías y módulos de potencia.',
    achievement:
      'Aseguramiento de la integridad del suministro eléctrico para equipos de control críticos, garantizando cero interrupciones no planificadas en sistemas de respaldo energético.',
    technologies: ['UPS Industrial', 'Bancos de Baterías', 'Electrónica de Potencia', 'Protocolos de Diagnóstico'],
    category: 'industrial',
  },
  {
    id: 'sistemas-fotovoltaicos',
    title: 'Sistemas Fotovoltaicos',
    subtitle: 'Dimensionamiento y Montaje',
    description:
      'Cálculo de ingeniería para dimensionamiento de arreglos solares, selección de componentes y supervisión del montaje físico. Análisis de carga, configuración de inversores y optimización de captación energética.',
    achievement:
      'Optimización de la captación energética según la ubicación geográfica del proyecto, maximizando el rendimiento del sistema mediante análisis técnico preciso de irradiación solar y carga.',
    technologies: ['Energía Solar', 'Inversores', 'Cálculo de Carga', 'Dimensionamiento', 'AutoCAD'],
    category: 'energy',
  },
]
