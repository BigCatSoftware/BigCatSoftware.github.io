import './App.css'

import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import TicTacToe from './components/TicTacToe'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <main>
        <Hero onNavigate={scrollToSection} />
        <About />
        <Projects />
        <TicTacToe />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
