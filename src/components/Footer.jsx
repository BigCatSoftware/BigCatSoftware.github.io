const linkClass =
  'underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg py-10 text-center">
      <p className="font-sans text-sm text-text-muted">
        Built by Tiger Schueler{' · '}
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className={linkClass}>
          React
        </a>
        {' · '}
        <a href="https://phaser.io" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Phaser
        </a>
        {' · '}
        <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Tailwind
        </a>
        {' · '}
        {year}
      </p>
    </footer>
  )
}
