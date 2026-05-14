import './App.css'

import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
import TicTacToe from './components/TicTacToe'
import Credentials from './components/Credentials'
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
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
