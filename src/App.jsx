import { useState, useEffect } from 'react'
import './App.css'

// Components
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [currentTheme, setCurrentTheme] = useState('default')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'education', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme)
    
    // Apply theme to document body
    document.body.className = `theme-${theme}`
    
    // Store theme preference in localStorage
    localStorage.setItem('portfolio-theme', theme)
  }

  // Reset theme to default on component mount
  useEffect(() => {
    // Always start with default theme
    setCurrentTheme('default')
    document.body.className = 'theme-default'
    localStorage.removeItem('portfolio-theme')
  }, [])

  return (
    <div className="app">
      <Navigation 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
      />
      
      <main>
        <Hero onNavigate={scrollToSection} />
        <About />
        <Projects />
        <Education />
        <Contact onThemeChange={handleThemeChange} currentTheme={currentTheme} />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
