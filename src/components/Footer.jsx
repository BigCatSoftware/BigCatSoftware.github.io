import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/BigCatSoftware',
      icon: '📁'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tigerschueler/',
      icon: '💼'
    },
    {
      name: 'Email',
      url: 'mailto:tiger.schueler.dev@gmail.com',
      icon: '📧'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">TIGER</span>
              <span className="logo-text">SCHUELER</span>
            </div>
            <p className="footer-tagline">
              Full-Stack Developer & Data Scientist
            </p>
            <p className="footer-description">
              U.S. Navy veteran with expertise in modern web technologies, 
              statistical analysis, and mathematical modeling.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul className="footer-nav">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    className="footer-link"
                    onClick={() => scrollToSection(link.href)}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Connect</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-resume">
            <h4>Documents</h4>
            <div className="resume-links">
              <a 
                href="/Tiger_Schueler_Software_Engineer_Resume_2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                <span className="resume-icon">📄</span>
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} Tiger Schueler. All rights reserved.</p>
          </div>
          <div className="footer-credentials">
            <p>U.S. Navy Veteran • University of Washington Tacoma Graduate</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
