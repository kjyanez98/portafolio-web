export type Lang = 'es' | 'en'

export type Translations = {
  nav: {
    home: string
    about: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    badge: string
    role: string
    description_prefix: string
    vision: string
    automation: string
    conjunction: string
    fullstack: string
    cta_projects: string
    cta_cv: string
  }
  about: {
    label: string
    title: [string, string]
    p1_before: string
    p1_highlight: string
    p2: string
    p3: string
    stats: Array<{ value: string; label: string }>
  }
  projects: {
    label: string
    title: string
    achievement_label: string
    category: { software: string; industrial: string; energy: string }
  }
  skills: {
    label: string
    title: string
  }
  contact: {
    label: string
    title: string
    subtitle: string
    connect: string
    name_label: string
    name_placeholder: string
    email_label: string
    email_placeholder: string
    message_label: string
    message_placeholder: string
    send: string
    footer: string
  }
}

export const translations: Record<Lang, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    hero: {
      badge: 'Disponible para nuevos proyectos',
      role: 'Fullstack Engineer',
      description_prefix: 'Desarrollo soluciones donde el mundo físico y el digital convergen. Especializado en',
      vision: 'visión artificial',
      automation: 'automatización industrial',
      conjunction: 'y',
      fullstack: 'desarrollo web fullstack',
      cta_projects: 'Ver proyectos',
      cta_cv: 'Descargar CV',
    },
    about: {
      label: 'Sobre mí',
      title: ['Del mundo físico', 'al digital'],
      p1_before: 'Soy ingeniero con experiencia en entornos industriales críticos — minas, plantas de proceso y sistemas de energía — donde desarrollé una intuición técnica que pocos programadores tienen: ',
      p1_highlight: 'el software que construyo tiene consecuencias físicas reales',
      p2: 'Esta perspectiva me llevó a especializarme en visión artificial para automatización industrial, integrando Python con sistemas de control distribuido (DCS) para crear soluciones que responden en tiempo real a eventos físicos.',
      p3: 'Hoy amplío ese perfil hacia el desarrollo fullstack con el stack PERN y data science, buscando roles donde la ingeniería de software y el mundo físico se conecten.',
      stats: [
        { value: '4+', label: 'Años en industria' },
        { value: 'PERN', label: 'Stack dominado' },
        { value: '4', label: 'Proyectos técnicos' },
        { value: '∞', label: 'Aprendizaje continuo' },
      ],
    },
    projects: {
      label: 'Proyectos',
      title: 'Trabajo técnico destacado',
      achievement_label: 'Logro técnico',
      category: {
        software: 'Software & IA',
        industrial: 'Industrial',
        energy: 'Energía',
      },
    },
    skills: {
      label: 'Habilidades',
      title: 'Stack técnico',
    },
    contact: {
      label: 'Contacto',
      title: 'Hablemos',
      subtitle: 'Abierto a oportunidades de trabajo, colaboraciones y proyectos interesantes.',
      connect: 'Conéctate conmigo',
      name_label: 'Nombre',
      name_placeholder: 'Tu nombre',
      email_label: 'Email',
      email_placeholder: 'tu@email.com',
      message_label: 'Mensaje',
      message_placeholder: 'Cuéntame sobre tu proyecto o propuesta...',
      send: 'Enviar mensaje',
      footer: 'Construido con Next.js & Tailwind CSS.',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      badge: 'Available for new projects',
      role: 'Fullstack Engineer',
      description_prefix: 'I build solutions where the physical and digital worlds converge. Specialized in',
      vision: 'computer vision',
      automation: 'industrial automation',
      conjunction: 'and',
      fullstack: 'fullstack web development',
      cta_projects: 'View projects',
      cta_cv: 'Download CV',
    },
    about: {
      label: 'About me',
      title: ['From the physical', 'to the digital'],
      p1_before: "I'm an engineer with experience in critical industrial environments — mines, process plants and energy systems — where I developed a technical intuition few programmers have: ",
      p1_highlight: 'the software I build has real physical consequences',
      p2: 'This perspective led me to specialize in computer vision for industrial automation, integrating Python with distributed control systems (DCS) to create solutions that respond in real time to physical events.',
      p3: "Today I'm expanding that profile into fullstack development with the PERN stack and data science, seeking roles where software engineering and the physical world connect.",
      stats: [
        { value: '4+', label: 'Years in industry' },
        { value: 'PERN', label: 'Mastered stack' },
        { value: '4', label: 'Technical projects' },
        { value: '∞', label: 'Continuous learning' },
      ],
    },
    projects: {
      label: 'Projects',
      title: 'Featured technical work',
      achievement_label: 'Technical achievement',
      category: {
        software: 'Software & AI',
        industrial: 'Industrial',
        energy: 'Energy',
      },
    },
    skills: {
      label: 'Skills',
      title: 'Technical stack',
    },
    contact: {
      label: 'Contact',
      title: "Let's talk",
      subtitle: 'Open to job opportunities, collaborations and interesting projects.',
      connect: 'Connect with me',
      name_label: 'Name',
      name_placeholder: 'Your name',
      email_label: 'Email',
      email_placeholder: 'you@email.com',
      message_label: 'Message',
      message_placeholder: 'Tell me about your project or proposal...',
      send: 'Send message',
      footer: 'Built with Next.js & Tailwind CSS.',
    },
  },
}
