import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.08 },
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

export default function About() {
  return (
    <section id="about" className="bg-bg text-text py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-10 md:grid-cols-[auto_minmax(0,42rem)] md:gap-16 lg:gap-24"
        >
          <motion.h2
            variants={itemVariants}
            className="font-display font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(2.5rem,4vw,3.75rem)]"
          >
            About
          </motion.h2>

          <div className="space-y-6 font-sans text-lg leading-[1.7]">
            <motion.p variants={itemVariants}>
              I&apos;m a Data Engineer in the Pacific Northwest. By day I&apos;m in C# and T-SQL, building production data infrastructure at BNBuilders. The current main project is a .NET 10 ETL platform I built from scratch to move hundreds of millions of rows a day from Oracle ERP into Azure SQL.
            </motion.p>

            <motion.p variants={itemVariants}>
              Background: B.S. in Computer Science &amp; Systems from UW Tacoma with a math minor. Before that, four years in the Navy: Aviation Ordnance and Mount Captain on a .50 cal crew aboard USS Nimitz, deployed April 2020 to March 2021. And a few years before that, teaching martial arts (3rd Dan ITF black belt).
            </motion.p>

            <motion.p variants={itemVariants}>
              Off the clock, I&apos;m a husband and father of two. I&apos;m a Christian; I read scripture, theology, and the church fathers, and keep a steady stack of programming and software books going on the side. When there&apos;s time left, I&apos;m either picking up MonoGame to build a hobby game in C# or replaying old Nintendo games on the Switch.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
