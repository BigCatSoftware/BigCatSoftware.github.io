import './Hero.css'

const Hero = ({ onNavigate }) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-name">TIGER</span>
              <span className="hero-name">SCHUELER</span>
            </h1>
            <h2 className="hero-subtitle">
              U.S. Navy Veteran • Computer Science Graduate
            </h2>
            <p className="hero-description">
              I'm a U.S. Navy veteran and a recent graduate from the 
              University of Washington Tacoma with a B.S. in Computer Science and Systems 
              and a Minor in Mathematics.
            </p>
            <p className="hero-description">
              My projects span software engineering, full-stack development, and data science, 
              with strong foundations in modern web technologies, statistical analysis, and mathematical modeling. 
              I bring analytical problem-solving skills and leadership experience from my Navy service, 
              with a proven track record of delivering scalable applications and data-driven insights.
            </p>
            <div className="hero-cta">
              <button 
                className="btn-primary"
                onClick={() => onNavigate('projects')}
              >
                View My Work
              </button>
              <button 
                className="btn-secondary"
                onClick={() => onNavigate('contact')}
              >
                Get In Touch
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">6+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-image">
                <img 
                  src="/tiger_graduation_square_crop.jpg" 
                  alt="Tiger Schueler graduation photo" 
                  className="profile-image"
                />
              </div>
              <div className="decorative-elements">
                <div className="deco-circle deco-1"></div>
                <div className="deco-circle deco-2"></div>
                <div className="deco-line deco-3"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator-container">
          <button 
            className="scroll-indicator"
            onClick={() => onNavigate('projects')}
            aria-label="Scroll to Projects section"
          >
            <div className="scroll-arrow"></div>
            <span className="scroll-text">Scroll to explore</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
