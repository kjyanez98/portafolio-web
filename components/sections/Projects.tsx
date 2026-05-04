'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Cpu, Wrench, Zap } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/SocialIcons'
import { projects, type ProjectCategory } from '@/data/projects'

type CategoryConfig = {
  label: string
  icon: React.ElementType
  badge: string
}

const categoryConfig: Record<ProjectCategory, CategoryConfig> = {
  software: {
    label: 'Software & IA',
    icon: Cpu,
    badge:
      'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  },
  industrial: {
    label: 'Industrial',
    icon: Wrench,
    badge:
      'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  energy: {
    label: 'Energía',
    icon: Zap,
    badge:
      'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  },
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Proyectos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Trabajo técnico destacado
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const config = categoryConfig[project.category]
            const Icon = config.icon

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-500/10 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.badge}`}
                  >
                    <Icon size={11} />
                    {config.label}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && (
                      <a
                        href={project.github}
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        <GitHubIcon size={15} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        aria-label="Demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-3">
                  {project.subtitle}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Logro técnico
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{project.achievement}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
