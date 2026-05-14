import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import GithubMark from './icons/GithubMark'
import LinkedinMark from './icons/LinkedinMark'

const links = [
  {
    label: 'Email',
    href: 'mailto:tiger.schueler.dev@gmail.com',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tigerschueler/',
    Icon: LinkedinMark,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/BigCatSoftware',
    Icon: GithubMark,
  },
]

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Contact() {
  return (
    <section id="contact" className="bg-bg text-text py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(2.5rem,4vw,3.75rem)]"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg leading-[1.7] text-text-muted"
          >
            For collaborations, hiring conversations, or just to say hello.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center"
          >
            {links.map(({ label, href, Icon }) => {
              const isExternal = href.startsWith('http')
              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border px-6 py-3 font-medium text-text transition-colors duration-[220ms] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Icon
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-[220ms] group-hover:-translate-y-0.5"
                  />
                  <span>{label}</span>
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
