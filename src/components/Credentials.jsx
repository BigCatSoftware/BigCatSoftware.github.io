import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, FileText, Loader2, ShieldCheck } from 'lucide-react'
import confetti from 'canvas-confetti'

const CREDENTIAL_CODE = '25C9-NTAN-TNRJ'
const CHAR_STAGGER_SEC = 0.06
const LOADING_DELAY_MS = 1200
const CASCADE_STEP_MS = 400
const VERIFY_URL = 'https://apps.registrar.washington.edu/cecredential/verify/'

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

const codeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: CHAR_STAGGER_SEC } },
}

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

const STATUS = {
  idle:       { text: 'Awaiting verification...',        tone: 'text-text-muted' },
  loading:    { text: 'Awaiting verification...',        tone: 'text-text-muted' },
  connecting: { text: 'Connecting to UW Registrar...',   tone: 'text-text-muted' },
  validating: { text: 'Validating credential ID...',     tone: 'text-text-muted' },
  verified:   { text: 'Verified ✓',                 tone: 'text-accent' },
}

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 38,
    gravity: 0.85,
    origin: { y: 0.5 },
    colors: ['#7287fd', '#fe640b'],
    ticks: 200,
  })
}

export default function Credentials() {
  const [phase, setPhase] = useState('idle')

  function startVerify() {
    if (phase !== 'idle') return
    setPhase('loading')
    setTimeout(() => setPhase('connecting'), LOADING_DELAY_MS)
    setTimeout(() => setPhase('validating'), LOADING_DELAY_MS + CASCADE_STEP_MS)
    setTimeout(() => {
      setPhase('verified')
      fireConfetti()
    }, LOADING_DELAY_MS + CASCADE_STEP_MS * 2)
  }

  const status = STATUS[phase]
  const isWorking = phase === 'loading' || phase === 'connecting' || phase === 'validating'

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

            {/* Character-by-character reveal on scroll-into-view */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={codeContainerVariants}
              className="mt-4 font-mono font-medium tracking-[0.05em] text-accent text-[clamp(2rem,4vw,3rem)]"
              aria-label={CREDENTIAL_CODE}
            >
              {CREDENTIAL_CODE.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  aria-hidden="true"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Status line, fades between phases */}
            <div className="mt-6 min-h-[1.75rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={status.tone}
                  aria-live="polite"
                >
                  {status.text}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Verify button / Open verification link */}
            <div className="mt-6">
              {phase === 'verified' ? (
                <a
                  href={VERIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-2 px-6 py-3 font-medium text-[var(--color-bg)] shadow-soft transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Open verification on UW Registrar
                  <span aria-hidden="true">→</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={startVerify}
                  disabled={isWorking}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-2 px-6 py-3 font-medium text-[var(--color-bg)] shadow-soft transition hover:brightness-95 disabled:cursor-wait disabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  {isWorking ? (
                    <>
                      <Loader2 size={18} strokeWidth={2} aria-hidden="true" className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" />
                      Verify Credential
                    </>
                  )}
                </button>
              )}
            </div>

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

          {/* Resume: distinctly secondary section below the widget */}
          <motion.div variants={itemVariants} className="mt-16">
            {/* Desktop: inline PDF via object/iframe */}
            <div className="hidden md:block">
              <object
                data="/Tiger_Schueler_Software_Engineer_Resume.pdf"
                type="application/pdf"
                className="h-[640px] w-full rounded-xl border border-surface-2 bg-surface shadow-soft"
                aria-label="Tiger Schueler's resume, embedded as a PDF."
              >
                <iframe
                  src="/Tiger_Schueler_Software_Engineer_Resume.pdf"
                  title="Tiger Schueler Resume"
                  className="h-[640px] w-full rounded-xl border border-surface-2"
                >
                  <p className="text-white">
                    Your browser cannot display this PDF inline.{' '}
                    <a
                      href="/Tiger_Schueler_Software_Engineer_Resume.pdf"
                      className="underline"
                    >
                      Download the resume PDF
                    </a>
                    .
                  </p>
                </iframe>
              </object>
            </div>

            {/* Mobile: tap-to-open card */}
            <a
              href="/Tiger_Schueler_Software_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-surface-2 bg-surface px-6 py-5 text-text shadow-soft transition hover:border-accent md:hidden"
            >
              <FileText size={20} strokeWidth={2} aria-hidden="true" />
              <span className="font-medium">Open Resume</span>
            </a>

            {/* Download button: ghost outline (deviation from design.json filled-accent
                because Lavender on Lavender has no contrast on this section) */}
            <a
              href="/Tiger_Schueler_Software_Engineer_Resume.pdf"
              download="Tiger_Schueler_Software_Engineer_Resume.pdf"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-medium text-white transition hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              <Download size={18} strokeWidth={2} aria-hidden="true" />
              Download PDF
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
