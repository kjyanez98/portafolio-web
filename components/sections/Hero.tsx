'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/SocialIcons'
import { useLanguage } from '@/contexts/LanguageContext'

const socialLinks = [
  { href: 'https://github.com/kjyanez98', icon: GitHubIcon, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/kevin-ya%C3%B1ez-huayllas-848438208/', icon: LinkedInIcon, label: 'LinkedIn' },
  { href: 'mailto:kevinkjyh500@gmail.com', icon: Mail, label: 'Email' },
]

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-10" />
      <div
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(14 165 233 / 0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-sm font-medium mb-8 border border-sky-200 dark:border-sky-800"
        >
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          {t.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight"
        >
          Kevin Jara
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl sm:text-3xl font-semibold text-sky-500 dark:text-sky-400 mb-6"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.description_prefix}{' '}
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{t.hero.vision}</span>,{' '}
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{t.hero.automation}</span>{' '}
          {t.hero.conjunction}{' '}
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{t.hero.fullstack}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors text-center"
          >
            {t.hero.cta_projects}
          </a>
          <a
            href="/cv.pdf"
            className="px-8 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-500 dark:hover:text-sky-400 font-semibold transition-colors text-center"
          >
            {t.hero.cta_cv}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-3 rounded-lg text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={20} className="text-slate-400 dark:text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
