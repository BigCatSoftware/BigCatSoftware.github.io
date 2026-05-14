import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

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

export default function Credentials() {
  return (
    <section id="credentials" className="bg-accent py-32 md:py-44">
      <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-white"
          >
            VERIFIABLE CREDENTIALS
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mt-3 font-display font-semibold leading-[1.15] tracking-[-0.01em] text-white text-[clamp(2.75rem,4.5vw,4rem)]"
          >
            Credentials
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-lg leading-[1.7] text-white/80"
          >
            B.S. Computer Science &amp; Systems · University of Washington Tacoma · August 2025
          </motion.p>

          {/* Widget card */}
          <motion.div
            variants={itemVariants}
            className="mt-12 rounded-2xl bg-surface p-8 text-left shadow-lifted md:p-12"
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              CREDENTIAL ID
            </p>
            <p className="mt-4 font-mono font-medium tracking-[0.05em] text-accent text-[clamp(2rem,4vw,3rem)]">
              25C9-NTAN-TNRJ
            </p>

            <p className="mt-6 text-text-muted">Awaiting verification...</p>

            <button
              type="button"
              disabled
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-2 px-6 py-3 font-medium text-[var(--color-bg)] shadow-soft transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
              Verify Credential
            </button>

            <p className="mt-8 font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              Verification powered by UW Registrar.
            </p>
          </motion.div>

          {/* Diploma */}
          <motion.div variants={itemVariants} className="mx-auto mt-10 max-w-sm">
            <img
              src="/diploma_image.png"
              alt="Tiger Schueler's University of Washington Tacoma diploma."
              className="rounded-xl border border-surface-2 shadow-soft"
            />
          </motion.div>

          {/* Resume placeholder (wired in commit 13) */}
          <motion.p
            variants={itemVariants}
            className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-white/70"
          >
            Resume embed and download arrives in commit 13.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
