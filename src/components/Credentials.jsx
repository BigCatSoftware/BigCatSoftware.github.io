import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Download, Loader2, ShieldCheck } from 'lucide-react'
import confetti from 'canvas-confetti'
import * as pdfjsLib from 'pdfjs-dist'

// pdf.js needs its worker resolved relative to the bundler; Vite handles this
// pattern natively, producing a hashed asset URL at build time.
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const CREDENTIAL_CODE = '25C9-NTAN-TNRJ'
const CHAR_STAGGER_SEC = 0.06
const LOADING_DELAY_MS = 1200
const CASCADE_STEP_MS = 400
const COPY_FEEDBACK_MS = 1500
const VERIFY_URL = 'https://apps.registrar.washington.edu/cecredential/verify/'
const RESUME_URL = '/Tiger_Schueler_New_Software_Engineer_Resume.pdf'
const RESUME_DOWNLOAD_NAME = 'Tiger_Schueler_New_Software_Engineer_Resume.pdf'
const FLIP_DURATION_MS = 600

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
  verified:   { text: 'Verified ✓',                       tone: 'text-accent' },
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

async function renderPdfPage(pdf, pageNum, canvas) {
  if (!canvas || pageNum > pdf.numPages) return
  const page = await pdf.getPage(pageNum)
  const dpr = window.devicePixelRatio || 1
  const cssWidth = canvas.parentElement?.clientWidth ?? 400
  const unscaled = page.getViewport({ scale: 1 })
  const scale = (cssWidth / unscaled.width) * dpr
  const viewport = page.getViewport({ scale })

  canvas.width = viewport.width
  canvas.height = viewport.height
  canvas.style.width = `${viewport.width / dpr}px`
  canvas.style.height = `${viewport.height / dpr}px`

  const ctx = canvas.getContext('2d')
  await page.render({ canvasContext: ctx, viewport, canvas }).promise
}

function ResumeFlipCard() {
  const [flipped, setFlipped] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [error, setError] = useState(false)
  const frontRef = useRef(null)
  const backRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const pdf = await pdfjsLib.getDocument(RESUME_URL).promise
        if (cancelled) return
        setPageCount(pdf.numPages)
        await renderPdfPage(pdf, 1, frontRef.current)
        if (pdf.numPages >= 2) await renderPdfPage(pdf, 2, backRef.current)
      } catch (err) {
        console.error('Failed to render resume PDF:', err)
        if (!cancelled) setError(true)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  function toggleFlip() {
    if (pageCount < 2) return
    setFlipped((prev) => !prev)
  }

  const ariaLabel = error
    ? 'Resume preview failed to load.'
    : pageCount === 0
      ? 'Loading resume preview.'
      : `Resume preview, page ${flipped ? 2 : 1} of ${pageCount}. ${pageCount >= 2 ? 'Activate to flip.' : ''}`

  return (
    <div className="w-full" style={{ perspective: '1200px' }}>
      <div
        role={pageCount >= 2 ? 'button' : 'img'}
        tabIndex={pageCount >= 2 ? 0 : undefined}
        aria-label={ariaLabel}
        onClick={toggleFlip}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && pageCount >= 2) {
            e.preventDefault()
            toggleFlip()
          }
        }}
        className={`relative aspect-[8.5/11] ${pageCount >= 2 ? 'cursor-pointer' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-accent rounded-xl`}
        style={{
          transformStyle: 'preserve-3d',
          transition: `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <canvas
          ref={frontRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full rounded-xl border border-surface-2 bg-surface shadow-soft"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        />
        <canvas
          ref={backRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full rounded-xl border border-surface-2 bg-surface shadow-soft"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        />
      </div>
    </div>
  )
}

function CopyCodeButton() {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CREDENTIAL_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
    } catch (err) {
      console.error('Failed to copy credential code:', err)
    }
  }

  return (
    <button
      type="button"
      onClick={copyCode}
      aria-label={copied ? 'Credential code copied' : 'Copy credential code'}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      {copied ? (
        <Check size={18} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={18} strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  )
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
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header (centered) */}
          <div className="text-center">
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
              className="mx-auto mt-5 max-w-2xl text-lg leading-[1.7] text-white/80"
            >
              B.S. Computer Science &amp; Systems · University of Washington Tacoma · August 2025
            </motion.p>
          </div>

          {/* Three-column row: widget | diploma | resume flip card.
              Collapses to a vertical stack below md. */}
          <div className="mt-16 grid gap-8 md:grid-cols-3 md:items-center md:gap-6 lg:gap-8">
            {/* Column 1: Credential widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-surface p-6 text-left shadow-lifted md:p-7 lg:p-8"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
                CREDENTIAL ID
              </p>

              <div className="mt-3 flex items-center gap-2">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={codeContainerVariants}
                  className="font-mono font-medium tracking-[0.05em] text-accent text-[clamp(1.5rem,2.4vw,2.25rem)]"
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
                <CopyCodeButton />
              </div>

              <div className="mt-5 min-h-[1.75rem]">
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

              <div className="mt-5">
                {phase === 'verified' ? (
                  <a
                    href={VERIFY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent-2 px-5 py-2.5 font-medium text-[var(--color-bg)] shadow-soft transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Open verification
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={startVerify}
                    disabled={isWorking}
                    className="inline-flex items-center gap-2 rounded-lg bg-accent-2 px-5 py-2.5 font-medium text-[var(--color-bg)] shadow-soft transition hover:brightness-95 disabled:cursor-wait disabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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

              <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
                Verification powered by UW Registrar.
              </p>
            </motion.div>

            {/* Column 2: Diploma */}
            <motion.div variants={itemVariants} className="mx-auto w-full">
              <img
                src="/diploma_image.png"
                alt="Tiger Schueler's University of Washington Tacoma diploma."
                className="w-full rounded-xl border border-surface-2 shadow-soft"
              />
            </motion.div>

            {/* Column 3: Resume flip card + Download */}
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <ResumeFlipCard />
              <a
                href={RESUME_URL}
                download={RESUME_DOWNLOAD_NAME}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-white px-5 py-2.5 font-medium text-white transition hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                <Download size={18} strokeWidth={2} aria-hidden="true" />
                Download PDF
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
