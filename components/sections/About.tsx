'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Años en industria' },
  { value: 'PERN', label: 'Stack dominado' },
  { value: '4', label: 'Proyectos técnicos' },
  { value: '∞', label: 'Aprendizaje continuo' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Sobre mí
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Del mundo físico<br />al digital
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Soy ingeniero con experiencia en entornos industriales críticos — minas, plantas de
                proceso y sistemas de energía — donde desarrollé una intuición técnica que pocos
                programadores tienen:{' '}
                <span className="text-slate-800 dark:text-slate-200 font-semibold">
                  el software que construyo tiene consecuencias físicas reales
                </span>
                .
              </p>
              <p>
                Esta perspectiva me llevó a especializarme en visión artificial para automatización
                industrial, integrando Python con sistemas de control distribuido (DCS) para crear
                soluciones que responden en tiempo real a eventos físicos.
              </p>
              <p>
                Hoy amplío ese perfil hacia el desarrollo fullstack con el stack PERN y data
                science, buscando roles donde la ingeniería de software y el mundo físico se
                conecten.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
              >
                <div className="text-3xl font-bold text-sky-500 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
