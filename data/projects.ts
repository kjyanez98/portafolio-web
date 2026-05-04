export type ProjectCategory = 'software' | 'industrial' | 'energy'

export type BilingualText = { es: string; en: string }

export type Project = {
  id: string
  title: string
  subtitle: BilingualText
  description: BilingualText
  achievement: BilingualText
  technologies: string[]
  category: ProjectCategory
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'vision-fugas',
    title: 'Sistema de Detección de Fugas',
    subtitle: {
      es: 'Visión Artificial & Automatización',
      en: 'Computer Vision & Automation',
    },
    description: {
      es: 'Solución de software de escritorio para la detección proactiva de fugas presurizadas en tuberías de transporte de relaves en entornos mineros. El sistema analiza patrones visuales de erupción en tiempo real mediante visión computacional.',
      en: 'Desktop software solution for the proactive detection of pressurized leaks in tailings transport pipelines in mining environments. The system analyzes visual eruption patterns in real time using computer vision.',
    },
    achievement: {
      es: 'Integración exitosa con el DCS (Distributed Control System) de la planta, habilitando respuestas automatizadas y centralizadas ante alertas críticas de seguridad.',
      en: 'Successful integration with the plant DCS (Distributed Control System), enabling automated and centralized responses to critical safety alerts.',
    },
    technologies: ['Python', 'OpenCV', 'Protocolos Industriales', 'DCS', 'Computer Vision'],
    category: 'software',
  },
  {
    id: 'instrumentacion-control',
    title: 'Instrumentación y Control Industrial',
    subtitle: {
      es: 'Planta de Procesos Mineros',
      en: 'Mining Process Plant',
    },
    description: {
      es: 'Desempeño como instrumentista a cargo de la calibración, configuración y mantenimiento de sensores y actuadores en planta de procesos mineros. Garantía de precisión en variables de control para la continuidad operativa.',
      en: 'Role as instrumentation engineer responsible for the calibration, configuration and maintenance of sensors and actuators in a mining process plant. Ensuring precision in control variables for operational continuity.',
    },
    achievement: {
      es: 'Minimización de tiempos de parada no programados y optimización de la eficiencia operativa de la planta mediante mantenimiento preventivo y correctivo de instrumentos de control.',
      en: 'Minimization of unplanned downtime and optimization of plant operational efficiency through preventive and corrective maintenance of control instruments.',
    },
    technologies: ['Sensores Industriales', 'Actuadores', 'Calibración', 'PLCs', 'SCADA'],
    category: 'industrial',
  },
  {
    id: 'ups-industrial',
    title: 'Sistemas UPS Industriales',
    subtitle: {
      es: 'Diagnóstico y Mantenimiento',
      en: 'Diagnostics & Maintenance',
    },
    description: {
      es: 'Ejecución de protocolos de diagnóstico preventivo y correctivo para sistemas de alimentación ininterrumpida de gran escala en entornos mineros. Análisis de bancos de baterías y módulos de potencia.',
      en: 'Execution of preventive and corrective diagnostic protocols for large-scale uninterruptible power supply systems in mining environments. Analysis of battery banks and power modules.',
    },
    achievement: {
      es: 'Aseguramiento de la integridad del suministro eléctrico para equipos de control críticos, garantizando cero interrupciones no planificadas en sistemas de respaldo energético.',
      en: 'Ensuring the integrity of the electrical supply for critical control equipment, guaranteeing zero unplanned interruptions in energy backup systems.',
    },
    technologies: ['UPS Industrial', 'Bancos de Baterías', 'Electrónica de Potencia', 'Protocolos de Diagnóstico'],
    category: 'industrial',
  },
  {
    id: 'sistemas-fotovoltaicos',
    title: 'Sistemas Fotovoltaicos',
    subtitle: {
      es: 'Dimensionamiento y Montaje',
      en: 'Sizing & Installation',
    },
    description: {
      es: 'Cálculo de ingeniería para dimensionamiento de arreglos solares, selección de componentes y supervisión del montaje físico. Análisis de carga, configuración de inversores y optimización de captación energética.',
      en: 'Engineering calculations for solar array sizing, component selection and supervision of physical installation. Load analysis, inverter configuration and energy capture optimization.',
    },
    achievement: {
      es: 'Optimización de la captación energética según la ubicación geográfica del proyecto, maximizando el rendimiento del sistema mediante análisis técnico preciso de irradiación solar y carga.',
      en: 'Optimization of energy capture based on the project geographic location, maximizing system performance through precise technical analysis of solar irradiation and load.',
    },
    technologies: ['Energía Solar', 'Inversores', 'Cálculo de Carga', 'Dimensionamiento', 'AutoCAD'],
    category: 'energy',
  },
]
