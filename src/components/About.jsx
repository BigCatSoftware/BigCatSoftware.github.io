import './About.css'

const About = () => {
  const skills = {
    languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'R'],
    dataScience: ['pandas', 'NumPy', 'NLTK', 'NetworkX', 'Matplotlib', 'scikit-learn', 'TensorFlow'],
    statistics: ['Statistical modeling', 'Markov chain analysis', 'Probabilistic modeling']
  }

  const achievements = [
    {
      title: 'U.S. Navy Veteran - USS Nimitz',
      description: 'Served aboard USS Nimitz during COVID-19 pandemic, maintaining mission readiness under high-pressure conditions. Ensured operational readiness of 50-caliber gun mounts with zero mission failures. Managed explosive material safety protocols, fostering precision, risk management, and teamwork.',
      icon: '🛡️'
    },
    {
      title: 'University of Washington Tacoma',
      description: 'B.S. in Computer Science and Systems, Minor in Mathematics',
      icon: '🎓'
    },
    {
      title: 'Software Engineer',
      description: 'Backend development, systems programming, and application development',
      icon: '💻'
    },
    {
      title: 'Full-Stack Developer',
      description: 'Modern web technologies and microservices architecture',
      icon: '🌐'
    },
    {
      title: 'Data Scientist',
      description: 'Statistical modeling and algorithm optimization',
      icon: '📊'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A passionate developer with a unique blend of military leadership and technical expertise
          </p>
        </div>

        <div className="about-content">
          <div className="about-profile">
            <div className="profile-image-container">
              <img 
                src="/tiger_graduation.png" 
                alt="Tiger Schueler at University of Washington Tacoma graduation ceremony"
                className="profile-image"
              />
            </div>
            <div className="about-text">
              <div className="about-intro">
                <h3>Hello, I'm Tiger Schueler</h3>
                <p>
                  I'm a U.S. Navy veteran with Secret clearance and a recent graduate from the 
                  University of Washington Tacoma with a B.S. in Computer Science and Systems 
                  and a Minor in Mathematics.
                </p>
                <p>
                  My projects span software engineering, full-stack development, and data science, 
                  with strong foundations in modern web technologies, statistical analysis, and mathematical modeling. 
                  I bring analytical problem-solving skills and leadership experience from my Navy service, 
                  with a proven track record of delivering scalable applications and data-driven insights.
                </p>
              </div>
            </div>

          </div>

          <div className="achievements-skills-grid">
            <div className="achievements-section">
              <h4>Key Achievements</h4>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h5>{achievement.title}</h5>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h4>Technical Skills</h4>
              <div className="skills-grid">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} className="skill-category">
                    <h5 className="skill-category-title">
                      {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h5>
                    <div className="skill-tags">
                      {skillList.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <a 
            href="https://www.linkedin.com/in/tigerschueler/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn
          </a>
          <a 
            href="/Tiger_Schueler_Software_Engineer_Resume_2.pdf"
            download="Tiger_Schueler_Software_Engineer_Resume_2.pdf"
            className="btn-secondary"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
