import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import './App.css'

import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Phaser pulls ~1.3MB into the bundle. React.lazy splits it into its own
// chunk; the IntersectionObserver wrapper holds the import back until the
// user scrolls within 400px of the section.
const TicTacToe = lazy(() => import('./components/TicTacToe'))

function TicTacToePlaceholder() {
  // Matches the real TicTacToe section's padding and inner spacing so
  // the swap on lazy-load does not cause a layout shift.
  return (
    <section id="play" className="bg-bg text-text pt-12 pb-24 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
        <p className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-text-muted">
          AN ASIDE
        </p>
        <h2 className="mt-2 font-display font-semibold leading-[1.15] tracking-[-0.01em] text-[clamp(2.5rem,4vw,3.75rem)]">
          Tic Tac Toe.
        </h2>
        <p className="mt-3 text-lg text-text-muted">Three in a row. You are X.</p>
        <div
          className="mx-auto mt-8 aspect-square w-full max-w-[480px] rounded-xl bg-surface/40"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

function LazyTicTacToe() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? (
        <Suspense fallback={<TicTacToePlaceholder />}>
          <TicTacToe />
        </Suspense>
      ) : (
        <TicTacToePlaceholder />
      )}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <LazyTicTacToe />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
