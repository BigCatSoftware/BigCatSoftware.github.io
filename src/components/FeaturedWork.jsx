import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GithubMark from './icons/GithubMark'

const projects = [
  {
    id: 'bnb-etl',
    orgTag: 'BNBUILDERS',
    title: 'ETL Pipeline Platform',
    summary: 'Production data infrastructure replacing a third-party SaaS sync tool.',
    tags: ['C#', '.NET 10', 'ASP.NET Core MVC', 'T-SQL', 'Azure SQL', 'Oracle'],
    description:
      'A .NET 10 ETL platform I built from scratch that moves hundreds of millions of rows a day from Oracle ERP into Azure SQL. ASP.NET Core MVC operator console for monitoring runs and queueing reruns.',
    repoUrl: null,
    Thumbnail: BnbEtlThumbnail,
  },
  {
    id: 'sha3',
    title: 'SHA3-SHAKE Cryptographic Library',
    summary: 'FIPS 202 compliant SHA-3 and SHAKE implementation in Java.',
    tags: ['Java', 'Cryptography', 'FIPS 202', 'SHA-3 / SHAKE'],
    description:
      'SHA-3 and SHAKE implementation conforming to FIPS 202, with an optimized Keccak-f[1600] permutation. CLI for file hashing and MAC generation, validated against the full NIST test vector suite.',
    repoUrl: 'https://github.com/BigCatSoftware/sha3-shake-library',
    Thumbnail: Sha3Thumbnail,
  },
  {
    id: 'jminus',
    title: 'j-- Compiler Extensions',
    summary: 'Java-subset compiler extended across scanner, parser, and AST.',
    tags: ['Java', 'Compiler Design', 'AST', 'Parsing'],
    description:
      'Extensions to a Java-subset compiler: scanner support for multi-line comments and numeric literals, additional grammar rules in the parser, and new AST nodes for conditionals, loops, and exception handling.',
    repoUrl: 'https://github.com/BigCatSoftware/j--',
    Thumbnail: JminusThumbnail,
  },
  {
    id: 'dungeon',
    title: 'Procedural Dungeon Generation',
    summary: 'LibGDX dungeon crawler with BSP-generated levels.',
    tags: ['Java', 'LibGDX', 'BSP Algorithm', 'Procedural Generation'],
    description:
      'A LibGDX dungeon crawler with procedurally generated levels. A Binary Space Partitioning tree recursively subdivides a 50x50 grid into rectangular leaves; each leaf becomes a room, and doors are placed where adjacent rooms share a wall.',
    repoUrl: 'https://github.com/BigCatSoftware/Dungeon-Adventure',
    Thumbnail: DungeonThumbnail,
  },
]

function BnbEtlThumbnail() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full text-text-muted">
      <g opacity="0.45">
        <path d="M40,55 Q100,55 160,105" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M40,105 Q100,80 160,55" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M40,105 Q100,105 160,105" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M40,105 Q100,130 160,155" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M40,155 Q100,155 160,105" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </g>
      <g fill="currentColor">
        <circle cx="40" cy="55" r="7" />
        <circle cx="40" cy="105" r="7" />
        <circle cx="40" cy="155" r="7" />
      </g>
      <g fill="var(--color-accent)">
        <circle cx="160" cy="55" r="7" />
        <circle cx="160" cy="105" r="7" />
        <circle cx="160" cy="155" r="7" />
      </g>
    </svg>
  )
}

function Sha3Thumbnail() {
  const cells = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const isHighlight = (row * 5 + col) % 4 === 0
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={30 + col * 28}
          y={30 + row * 28}
          width="22"
          height="22"
          rx="4"
          fill={isHighlight ? 'var(--color-accent)' : 'currentColor'}
          opacity={isHighlight ? 0.9 : 0.35}
        />,
      )
    }
  }
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full text-text-muted">
      {cells}
    </svg>
  )
}

function JminusThumbnail() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="15">
      <text x="22" y="50" fill="var(--color-accent)">class</text>
      <text x="74" y="50" fill="var(--color-text)">Lex</text>
      <text x="112" y="50" fill="var(--color-text-muted)">{'{'}</text>
      <text x="34" y="78" fill="var(--color-accent-2)">if</text>
      <text x="60" y="78" fill="var(--color-text-muted)">(tok ==</text>
      <text x="34" y="106" fill="var(--color-accent-2)">while</text>
      <text x="86" y="106" fill="var(--color-text-muted)">(...)</text>
      <text x="34" y="134" fill="var(--color-accent)">return</text>
      <text x="100" y="134" fill="var(--color-text-muted)">node;</text>
      <text x="22" y="162" fill="var(--color-text-muted)">{'}'}</text>
    </svg>
  )
}

function DungeonThumbnail() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full text-text-muted">
      <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="100" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="140" y1="80" x2="140" y2="180" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <rect x="32" y="32" width="56" height="56" fill="var(--color-accent)" opacity="0.35" />
      <rect x="112" y="32" width="56" height="36" fill="var(--color-accent-2)" opacity="0.35" />
      <rect x="32" y="112" width="56" height="56" fill="var(--color-accent)" opacity="0.25" />
      <rect x="112" y="92" width="20" height="76" fill="var(--color-accent-2)" opacity="0.25" />
      <rect x="148" y="92" width="20" height="76" fill="var(--color-accent)" opacity="0.25" />
    </svg>
  )
}

function ProjectRow({ project }) {
  const Thumbnail = project.Thumbnail
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 200, damping: 24 })
  const ySpring = useSpring(y, { stiffness: 200, damping: 24 })
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [6, -6])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group grid items-start gap-8 md:grid-cols-[30%_1fr] md:gap-12"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="aspect-square rounded-xl border border-border bg-surface p-6 transition-colors group-hover:border-accent"
      >
        <Thumbnail />
      </motion.div>

      <div className="space-y-4">
        {project.orgTag && (
          <span className="inline-block rounded bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bg">
            {project.orgTag}
          </span>
        )}

        <h3 className="font-display text-3xl font-semibold leading-[1.2] tracking-[-0.01em] md:text-4xl">
          {project.title}
        </h3>

        <p className="text-lg text-text-muted">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-bg px-2.5 py-1 font-mono text-xs text-text-muted ring-1 ring-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="leading-[1.7]">{project.description}</p>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 pt-1 text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <GithubMark size={16} />
            <span className="font-medium">View source</span>
            <ArrowRight
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover/link:translate-x-1"
            />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-bg text-text py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 space-y-3"
        >
          <p className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-text-muted">
            SELECTED
          </p>
          <h2 className="font-display font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(2.5rem,4vw,3.75rem)]">
            Featured Work
          </h2>
        </motion.div>

        <div className="space-y-20">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
