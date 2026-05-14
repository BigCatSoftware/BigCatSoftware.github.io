import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-bg text-text py-32 md:py-44"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 md:grid-cols-[45%_55%] md:gap-16"
        >
          {/* Portrait column */}
          <motion.div variants={itemVariants} className="order-1">
            <img
              src="/tiger_graduation_square_crop.jpg"
              alt="Tiger Schueler receiving his diploma at UW Tacoma graduation."
              className="mx-auto w-full max-w-[480px] -rotate-2 rounded-2xl border border-border shadow-lifted md:mx-0"
            />
          </motion.div>

          {/* Text column */}
          <div className="relative isolate order-2">
            {/* Ambient gradient sits behind the text on its own stacking layer. */}
            <div
              className="hero-ambient pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
            />

            <motion.p
              variants={itemVariants}
              className="font-mono text-xl font-semibold uppercase tracking-[0.22em] text-text md:text-2xl"
            >
              TIGER SCHUELER
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display font-bold leading-[1.15] tracking-[-0.02em] text-[clamp(2.5rem,5vw,4.5rem)]"
            >
              Building durable software in C# and .NET.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 font-display text-xl leading-[1.7] text-text-muted md:text-2xl"
            >
              Data Engineer at BNBuilders, Pacific Northwest.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-[var(--color-bg)] shadow-soft transition hover:brightness-95 hover:shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                View Work
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-text px-6 py-3 font-medium text-text transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
