import { useState, useEffect } from 'react'
import './Projects.css'

const Projects = ({ currentTheme = 'default' }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Featured projects based on your GitHub profile
  const featuredProjects = [
    {
      id: 'sha3-shake-library',
      name: 'SHA3-SHAKE Cryptographic Library',
      description: 'Production-grade implementation of SHA-3 hash functions and SHAKE algorithms following FIPS 202 specification. Features optimized Keccak-f[1600] permutation, CLI interface with file hashing and MAC generation, plus comprehensive NIST test vector validation.',
      technologies: ['Java', 'Cryptography', 'CLI', 'NIST Standards'],
      githubUrl: 'https://github.com/BigCatSoftware/sha3-shake-library',
      liveUrl: null,
      image: '/api/placeholder/400/300',
      featured: true
    },
    {
      id: 'markov-chain-maze-analysis',
      name: 'Markov Chain System Analysis',
      description: 'Probabilistic modeling system implementing power iteration algorithms and steady-state analysis for random walk processes. Demonstrates system reliability analysis and performance optimization using advanced mathematical modeling with PyAmaze integration.',
      technologies: ['Python', 'NumPy', 'Matplotlib', 'Statistical Modeling', 'PyAmaze'],
      githubUrl: 'https://github.com/BigCatSoftware/markov-chain-maze-analysis',
      liveUrl: null,
      image: '/api/placeholder/400/300',
      featured: true
    },
    {
      id: 'naive-bayes-sentiment-classifier',
      name: 'Naive Bayes Sentiment Classifier',
      description: 'Statistical text classification using Naive Bayes with Laplace smoothing. Features comprehensive NLTK pipeline, feature extraction, and error analysis for large-scale movie review sentiment analysis.',
      technologies: ['Python', 'NLTK', 'Machine Learning', 'Text Analysis'],
      githubUrl: 'https://github.com/BigCatSoftware/naive-bayes-sentiment-classifier',
      liveUrl: null,
      image: '/api/placeholder/400/300',
      featured: true
    },
    {
      id: 'graph-algorithm-analysis',
      name: 'Graph Algorithm Analysis',
      description: 'Network analysis system implementing BFS/DFS algorithms, NetworkX integration, and Matplotlib visualizations. Provides decision tree optimization, pathfinding strategies, and performance metrics evaluation.',
      technologies: ['Python', 'NetworkX', 'Matplotlib', 'Graph Theory', 'Algorithms'],
      githubUrl: 'https://github.com/BigCatSoftware/graph-algorithm-analysis',
      liveUrl: null,
      image: '/api/placeholder/400/300',
      featured: true
    },
    {
      id: 'chip-8',
      name: 'CHIP-8 Emulator',
      description: 'Minimal emulator implementation with instruction decoding and graphics rendering. Demonstrates systems programming concepts, memory management, and low-level optimization for classic gaming hardware simulation.',
      technologies: ['C++', 'Systems Programming', 'Emulation', 'Graphics'],
      githubUrl: 'https://github.com/BigCatSoftware/chip-8',
      liveUrl: null,
      image: '/api/placeholder/400/300',
      featured: true
    },
    {
      id: 'j--',
      name: 'J-- Compiler Extensions',
      description: 'Extended Java subset compiler with scanner enhancements for multi-line comments and numeric literals, parser improvements with grammar rules, and AST node implementation for conditional expressions, loops, and exception handling.',
      technologies: ['Java', 'Compiler Design', 'AST', 'Parsing'],
      githubUrl: 'https://github.com/BigCatSoftware/j--',
      liveUrl: null,
      image: '/api/placeholder/400/300',
      featured: true
    }
  ]

  useEffect(() => {
    // Simulate loading GitHub data
    const loadProjects = async () => {
      setLoading(true)
      // In a real implementation, you would fetch from GitHub API
      setTimeout(() => {
        setProjects(featuredProjects)
        setLoading(false)
      }, 1000)
    }

    loadProjects()
  }, [])

  const getTechColor = (tech) => {
    if (currentTheme === 'uw') {
      // UW color palette - diverse colors inspired by UW branding
      const uwColors = {
        'TypeScript': '#4B0082', // UW Purple
        'Next.js': '#8B4513', // UW Gold
        'Express.js': '#2F4F4F', // Dark Slate Gray
        'Python': '#4682B4', // Steel Blue
        'Java': '#8B4513', // UW Gold
        'JavaScript': '#2F4F4F', // Dark Slate Gray
        'React': '#4B0082', // UW Purple
        'Google Cloud': '#4682B4', // Steel Blue
        'Firebase': '#8B4513', // UW Gold
        'C++': '#2F4F4F', // Dark Slate Gray
        'Machine Learning': '#4682B4', // Steel Blue
        'Cryptography': '#4B0082', // UW Purple
        'Graph Theory': '#8B4513', // UW Gold
        'Systems Programming': '#2F4F4F', // Dark Slate Gray
        'Spring Boot': '#4682B4', // Steel Blue
        'FastAPI': '#4B0082', // UW Purple
        'Vite': '#8B4513', // UW Gold
        'Microservices': '#2F4F4F', // Dark Slate Gray
        'Compiler Design': '#4682B4', // Steel Blue
        'AST': '#4B0082', // UW Purple
        'Parsing': '#8B4513' // UW Gold
      }
      return uwColors[tech] || '#4B0082'
    } else {
      // Default color palette
      const colors = {
        'TypeScript': '#3178C6',
        'Next.js': '#000000',
        'Express.js': '#000000',
        'Python': '#3776AB',
        'Java': '#ED8B00',
        'JavaScript': '#F7DF1E',
        'React': '#61DAFB',
        'Google Cloud': '#4285F4',
        'Firebase': '#FFCA28',
        'C++': '#00599C',
        'Machine Learning': '#FF6B35',
        'Cryptography': '#FF6B35',
        'Graph Theory': '#FF6B35',
        'Systems Programming': '#FF6B35',
        'Spring Boot': '#6DB33F',
        'FastAPI': '#009688',
        'Vite': '#646CFF',
        'Microservices': '#FF6B35',
        'Compiler Design': '#FF6B35',
        'AST': '#FF6B35',
        'Parsing': '#FF6B35'
      }
      return colors[tech] || '#FF6B35'
    }
  }

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A showcase of my technical projects and contributions
            </p>
          </div>
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of my technical projects and contributions
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-image">
                <div className="project-image-placeholder">
                  <span className="placeholder-text">{project.name}</span>
                </div>
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="tech-tag"
                      style={{ '--tech-color': getTechColor(tech) }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github-link"
                  >
                    <span className="link-icon">📁</span>
                    View Code
                  </a>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link live-link"
                    >
                      <span className="link-icon">🚀</span>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a 
            href="https://github.com/BigCatSoftware"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
