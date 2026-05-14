import './Contact.css'

const Contact = () => {
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
        </div>
      </div>
    </section>
  )
}

export default Contact
