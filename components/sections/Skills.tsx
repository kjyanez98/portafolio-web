'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Layout, Eye, Settings, Zap, Wrench } from 'lucide-react'
import { skillCategories } from '@/data/skills'
import { useLanguage } from '@/contexts/LanguageContext'

const iconMap = { Code2, Layout, Eye, Settings, Zap, Wrench } as const

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang, t } = useLanguage()

  return (
    <section id="skills" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
            {t.skills.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            {t.skills.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]

            return (
              <motion.div
                key={category.icon}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-800 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {category.name[lang]}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
