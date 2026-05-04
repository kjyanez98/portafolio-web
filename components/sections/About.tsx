'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

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
              {t.about.label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {t.about.title[0]}<br />{t.about.title[1]}
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                {t.about.p1_before}
                <span className="text-slate-800 dark:text-slate-200 font-semibold">
                  {t.about.p1_highlight}
                </span>
                .
              </p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {t.about.stats.map((stat) => (
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
