'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/SocialIcons'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kevinkjyh500@gmail.com',
    href: 'mailto:kevinkjyh500@gmail.com',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/kjyanez98',
    href: 'https://github.com/kjyanez98/',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/kevinjara',
    href: 'https://linkedin.com/in/kevinjara',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contacto desde portafolio — ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nDe: ${form.name} (${form.email})`)
    window.location.href = `mailto:kevinkjyh500@gmail.com?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm'

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Hablemos
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Abierto a oportunidades de trabajo, colaboraciones y proyectos interesantes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">
              Conéctate conmigo
            </h3>
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-white transition-colors shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Cuéntame sobre tu proyecto o propuesta..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold transition-colors"
            >
              Enviar mensaje
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Kevin Jara. Construido con Next.js & Tailwind CSS.
        </p>
      </div>
    </section>
  )
}
