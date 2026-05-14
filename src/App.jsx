import './App.css'

import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
import TicTacToe from './components/TicTacToe'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <TicTacToe />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
