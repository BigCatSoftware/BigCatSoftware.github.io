import { useState } from 'react'
import './Education.css'

const Education = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  const education = [
    {
      institution: 'University of Washington Tacoma',
      degree: 'Bachelor of Science in Computer Science and Systems',
      minor: 'Minor in Mathematics',
      graduationDate: '2025',
      gpa: '3.6',
      location: 'Tacoma, WA',
      highlights: [
        'Strong focus on backend technologies (Java, Python)',
        'SQL and database design expertise',
        'Statistical analysis and mathematical modeling',
        'Full-stack development with backend emphasis'
      ],
      relevantCoursework: [
        'Data Structures and Algorithms',
        'Database Systems',
        'Software Engineering',
        'Machine Learning',
        'Statistics and Probability',
        'Linear Algebra',
        'Discrete Mathematics',
        'Computer Networks',
        'Operating Systems',
        'Web Development'
      ]
    }
  ]

  const experience = [
    {
      name: 'U.S. Navy Veteran',
      issuer: 'United States Navy',
      date: '2018-2022',
      description: 'Secret clearance (current, eligible for reactivation). Leadership experience with proven track record of team management and problem-solving skills.',
      icon: '🛡️'
    },
    {
      name: 'Mathnasium Lead Instructor',
      issuer: 'Mathnasium Learning Centers',
      date: '2023-2025',
      description: 'Led mathematics instruction for students of all ages. Developed curriculum and mentored junior instructors while maintaining high student success rates.',
      icon: '📚'
    }
  ]


  return (
    <section id="education" className="education">
      <div className="education-container">
        <div className="section-header">
          <h2 className="section-title">Education & Experience</h2>
          <p className="section-subtitle">
            Academic foundation and professional experience
          </p>
        </div>

        <div className="education-content">
          <div className="education-main">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-header">
                  <div className="education-icon">🎓</div>
                  <div className="education-info">
                    <h3 className="institution-name">{edu.institution}</h3>
                    <p className="degree">{edu.degree}</p>
                    <p className="minor">{edu.minor}</p>
                    <div className="education-meta">
                      <span className="graduation-date">{edu.graduationDate}</span>
                      <span className="gpa">GPA: {edu.gpa}</span>
                      <span className="location">{edu.location}</span>
                    </div>
                  </div>
                </div>

                <div className="education-details">
                  <div className="highlights">
                    <h4>Key Highlights</h4>
                    <ul className="highlights-list">
                      {edu.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="coursework">
                    <h4>Relevant Coursework</h4>
                    <div className="coursework-tags">
                      {edu.relevantCoursework.map((course, idx) => (
                        <span key={idx} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="certifications-section">
            <h3>Professional Experience</h3>
            <div className="certifications-grid">
              {experience.map((exp, index) => (
                <div key={index} className="certification-card">
                  <div className="cert-icon">{exp.icon}</div>
                  <div className="cert-content">
                    <h4 className="cert-name">{exp.name}</h4>
                    <p className="cert-issuer">{exp.issuer}</p>
                    <p className="cert-date">{exp.date}</p>
                    <p className="cert-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="diploma-section">
          <h3>Official Diploma</h3>
          <div className="diploma-container">
            <div className="diploma-image">
              <img 
                src="/diploma_image.png" 
                alt="Tiger Schueler University of Washington Diploma" 
                className="diploma-img"
              />
            </div>
            <div className="diploma-verification">
              <h4>Verify This Diploma</h4>
              <p>
                This diploma can be verified online through the University of Washington's 
                official verification system.
              </p>
              <div className="verification-info">
                <div className="cedid-code">
                  <span className="code-label">CeDiD Code:</span>
                  <button 
                    onClick={() => copyToClipboard('25C9-NTAN-TNRJ')}
                    className="code-link"
                    title="Click to copy code"
                  >
                    25C9-NTAN-TNRJ
                    <span className="copy-hint">copy</span>
                    {copied && <span className="copy-feedback">✓ Copied!</span>}
                  </button>
                </div>
                <a 
                  href="https://apps.registrar.washington.edu/cecredential/verify/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary verification-btn"
                >
                  Verify Diploma Online
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="education-cta">
          <a 
            href="/Tiger_Schueler_Software_Engineer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default Education
