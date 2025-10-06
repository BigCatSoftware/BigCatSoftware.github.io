import { useState } from 'react'
import TicTacToe from './TicTacToe'
import './Contact.css'

const Contact = ({ onThemeChange, currentTheme }) => {
  const [isUWTheme, setIsUWTheme] = useState(false)

  const handleGameWin = (winner, winCount = 0) => {
    if (winner === 'theme-unlock') {
      // Apply UW theme
      setIsUWTheme(true)
      if (onThemeChange) {
        onThemeChange('uw')
      }
      
      // Play celebration sounds
      playCelebrationSounds()
      
      // Trigger confetti
      triggerConfetti()
    } else if (winner === 'victory-celebration') {
      // Immediate victory music for mobile
      playVictorySounds()
    } else if (winner === 'X') {
      // Player won - play sounds and confetti
      playCelebrationSounds()
      triggerConfetti()
      
      // Check if this is the 3rd win for special victory sounds
      if (winCount >= 3) {
        setTimeout(() => {
          playVictorySounds()
        }, 2000) // Delay to let regular celebration finish
      }
    }
  }

  const playClickSound = (isPlayer = true) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      if (isPlayer) {
        // Player click sound - satisfying "pop" with slight reverb
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        const filter = audioContext.createBiquadFilter()
        
        oscillator.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Quick frequency sweep for satisfying pop
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
        oscillator.type = 'sine'
        
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(1000, audioContext.currentTime)
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } else {
        // AI click sound - subtle "beep" with different character
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        const filter = audioContext.createBiquadFilter()
        
        oscillator.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // AI sound - higher pitch, more mechanical
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.08)
        oscillator.type = 'square' // More mechanical sound
        
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(800, audioContext.currentTime)
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.08)
      }
    } catch (error) {
      console.log('Click audio not supported:', error)
    }
  }

  const playCelebrationSounds = () => {
    // Create audio context for sound effects
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Birthday confetti sound (using Web Audio API)
      const createTone = (frequency, duration, type = 'sine') => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        oscillator.type = type
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }
      
      // Play a celebratory melody
      setTimeout(() => createTone(523.25, 0.2), 0)    // C5
      setTimeout(() => createTone(659.25, 0.2), 100)  // E5
      setTimeout(() => createTone(783.99, 0.2), 200)  // G5
      setTimeout(() => createTone(1046.50, 0.4), 300) // C6
      
      // Kazoo whistle effect
      setTimeout(() => {
        createTone(880, 0.3, 'sawtooth') // A5 with sawtooth for kazoo effect
        setTimeout(() => createTone(1108.73, 0.3, 'sawtooth'), 150) // C#6
      }, 500)
      
    } catch (error) {
      console.log('Audio not supported:', error)
    }
  }

  const playVictorySounds = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Hand clapping sound (using noise and filtering)
      const createClapSound = () => {
        const bufferSize = audioContext.sampleRate * 0.1 // 0.1 second
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
        const data = buffer.getChannelData(0)
        
        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.3
        }
        
        const source = audioContext.createBufferSource()
        const gainNode = audioContext.createGain()
        const filter = audioContext.createBiquadFilter()
        
        source.buffer = buffer
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(1000, audioContext.currentTime)
        filter.Q.setValueAtTime(1, audioContext.currentTime)
        
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        source.connect(filter)
        filter.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        source.start(audioContext.currentTime)
      }
      
      // Crowd cheering sound (multiple overlapping tones)
      const createCheerSound = () => {
        const frequencies = [440, 523.25, 659.25, 783.99, 880, 1046.50] // A4, C5, E5, G5, A5, C6
        
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
            oscillator.type = 'sine'
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 1.5)
          }, index * 100)
        })
      }
      
      // Victory fanfare melody
      const playVictoryFanfare = () => {
        const melody = [
          { freq: 523.25, duration: 0.3 }, // C5
          { freq: 659.25, duration: 0.3 }, // E5
          { freq: 783.99, duration: 0.3 }, // G5
          { freq: 1046.50, duration: 0.6 }, // C6
          { freq: 783.99, duration: 0.3 }, // G5
          { freq: 1046.50, duration: 0.6 }, // C6
          { freq: 1318.51, duration: 1.0 }, // E6
        ]
        
        melody.forEach((note, index) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime)
            oscillator.type = 'sine'
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.duration)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + note.duration)
          }, index * 400)
        })
      }
      
      // Trumpet-like sound for grand finale
      const playTrumpetFanfare = () => {
        const trumpetNotes = [
          { freq: 440, duration: 0.4 }, // A4
          { freq: 554.37, duration: 0.4 }, // C#5
          { freq: 659.25, duration: 0.4 }, // E5
          { freq: 880, duration: 0.8 }, // A5
        ]
        
        trumpetNotes.forEach((note, index) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime)
            oscillator.type = 'sawtooth' // Trumpet-like sound
            
            gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.duration)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + note.duration)
          }, index * 500)
        })
      }
      
      // Fireworks sound effect
      const playFireworks = () => {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            // Create a "whoosh" sound
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3)
            oscillator.type = 'sawtooth'
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.3)
          }, i * 300)
        }
      }
      
      // Extended victory sequence
      let currentTime = 0
      
      // 1. Initial clapping (5 claps)
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createClapSound(), currentTime + i * 200)
      }
      currentTime += 1000
      
      // 2. First cheer wave
      setTimeout(() => createCheerSound(), currentTime)
      currentTime += 2000
      
      // 3. Victory fanfare melody
      setTimeout(() => playVictoryFanfare(), currentTime)
      currentTime += 3000
      
      // 4. More clapping (8 claps)
      for (let i = 0; i < 8; i++) {
        setTimeout(() => createClapSound(), currentTime + i * 150)
      }
      currentTime += 1200
      
      // 5. Second cheer wave
      setTimeout(() => createCheerSound(), currentTime)
      currentTime += 2000
      
      // 6. Trumpet fanfare
      setTimeout(() => playTrumpetFanfare(), currentTime)
      currentTime += 2500
      
      // 7. Fireworks sound effects
      setTimeout(() => playFireworks(), currentTime)
      currentTime += 3000
      
      // 8. Final massive cheer
      setTimeout(() => {
        // Triple cheer for grand finale
        createCheerSound()
        setTimeout(() => createCheerSound(), 500)
        setTimeout(() => createCheerSound(), 1000)
      }, currentTime)
      
    } catch (error) {
      console.log('Victory audio not supported:', error)
    }
  }

  const triggerConfetti = () => {
    // Create confetti effect
    const confettiCount = 100
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        createConfettiPiece(confettiColors[Math.floor(Math.random() * confettiColors.length)])
      }, i * 10)
    }
  }

  const createConfettiPiece = (color) => {
    const confetti = document.createElement('div')
    confetti.style.position = 'fixed'
    confetti.style.width = '10px'
    confetti.style.height = '10px'
    confetti.style.backgroundColor = color
    confetti.style.left = Math.random() * window.innerWidth + 'px'
    confetti.style.top = '-10px'
    confetti.style.zIndex = '9999'
    confetti.style.borderRadius = '50%'
    confetti.style.pointerEvents = 'none'
    
    document.body.appendChild(confetti)
    
    // Animate confetti falling
    const animation = confetti.animate([
      { 
        transform: 'translateY(0px) rotate(0deg)',
        opacity: 1
      },
      { 
        transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
        opacity: 0
      }
    ], {
      duration: 3000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    })
    
    animation.onfinish = () => {
      confetti.remove()
    }
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'tiger.schueler.dev@gmail.com',
      link: 'mailto:tiger.schueler.dev@gmail.com'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/tigerschueler',
      link: 'https://www.linkedin.com/in/tigerschueler/'
    },
    {
      icon: '📁',
      label: 'GitHub',
      value: 'github.com/BigCatSoftware',
      link: 'https://github.com/BigCatSoftware'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Olympia, WA',
      link: null
    }
  ]

  const quickActions = [
    {
      title: 'View Resume',
      description: 'Download my latest resume',
      icon: '📄',
      action: () => {
        const link = document.createElement('a')
        link.href = '/Tiger_Schueler_Software_Engineer_Resume.pdf'
        link.download = 'Tiger_Schueler_Software_Engineer_Resume.pdf'
        link.click()
      }
    },
    {
      title: 'GitHub Profile',
      description: 'Explore my code repositories',
      icon: '💻',
      action: () => window.open('https://github.com/BigCatSoftware', '_blank')
    },
    {
      title: 'LinkedIn Profile',
      description: 'Connect professionally',
      icon: '🔗',
      action: () => window.open('https://www.linkedin.com/in/tigerschueler/', '_blank')
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Seeking full-time opportunities in software engineering, full-stack development, and data science
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>Let's Connect</h3>
              <p>
                I'm actively seeking full-time opportunities in software engineering, full-stack development, and data science. 
                With my background in backend development, database design, and leadership experience from the Navy, 
                I'm ready to contribute to your team's success. Let's discuss how I can bring value to your organization.
              </p>
            </div>

            <div className="contact-details">
              <h4>Contact Information</h4>
              <div className="contact-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">{info.icon}</div>
                    <div className="contact-detail">
                      <span className="contact-label">{info.label}</span>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          className="contact-value"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="contact-value">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions">
              <h4>Quick Actions</h4>
              <div className="actions-grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="action-card"
                    onClick={action.action}
                  >
                    <div className="action-icon">{action.icon}</div>
                    <div className="action-content">
                      <h5>{action.title}</h5>
                      <p>{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <TicTacToe 
              onGameWin={handleGameWin} 
              onThemeChange={onThemeChange}
              currentTheme={currentTheme}
              onPlayClickSound={playClickSound}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
