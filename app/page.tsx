"use client";

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './cursor'
import Character from './character'
import Loading from './loading'
import TechStack from './techstack'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const heroStats = [
  { icon: '🧠', number: '3+', label: 'Years Experience' },
  { icon: '🚀', number: '8+', label: 'Projects Delivered' },
  { icon: '🤖', number: 'LLM', label: 'Fine-tuning & RAG Pipelines' },
]

const heroSummary = [
  { value: '8+', label: 'AI/ML Cases Delivered' },
  { value: '4+', label: 'Enterprise Data Pipelines' },
  { value: '100%', label: 'Quality & Deployment Focus' },
]

const stackPills = [
  'Python',
  'ML/DL',
  'LLMs',
  'RAG',
  'Time Series',
  'AWS',
  'NLP',
  'Gen AI',
]

const expertiseItems = [
  'Machine Learning & Predictive Modeling',
  'Time Series Forecasting (ARIMA, Prophet, LSTM)',
  'Large Language Models & Fine-tuning',
  'Retrieval-Augmented Generation (RAG)',
  'Natural Language Processing (NLP)',
  'Data Pipeline & Automation Engineering',
  'Deep Learning (ANN, CNN, TensorFlow, PyTorch)',
  'AWS Cloud Deployment & API Integration',
  'Data Visualization & Business Intelligence',
]

const experienceItems = [
  {
    date: '2024 – Present',
    role: 'Data Scientist',
    company: "LET'S ENKINDLE · India",
    bullets: [
      'Performed Time Series Analysis on large, complex datasets to uncover patterns and trends informing business decisions.',
      'Developed predictive models using Prophet, ARIMA, SARIMA, Exponential MA, and LSTM neural networks for product price forecasting.',
      'Built AI-powered document processing pipelines integrating Gemini API for unstructured data extraction and normalization.',
      'Applied advanced data visualization and summarization to communicate key findings to stakeholders.',
      'Conducted research to stay current with advancements in AI and data science; periodically retrained models with new data.',
    ],
    accent: 'accent',
  },
  {
    date: '2023 – 2024',
    role: 'Data Scientist',
    company: 'Zeta IT Innovations · India',
    bullets: [
      'Analyzed large datasets to identify trends and patterns supporting data-driven business strategies.',
      'Developed classification and regression models using logistic regression, decision trees, and neural networks.',
      'Applied data visualization techniques (Matplotlib, Seaborn, Power BI) to communicate insights across teams.',
      'Collaborated with cross-functional teams to translate analytical findings into actionable strategies.',
      'Conducted research to stay current with evolving data science practices and ML methodologies.',
    ],
    accent: 'accent2',
  },
]

const projects = [
  {
    id: 'ss-tool',
    icon: '📋',
    tag: 'Gen AI · Automation',
    title: 'S&S Statement AI Verification Tool',
    description:
      'End-to-end AI system automating stock statement verification for a pharma company with 100+ super stockists and ~13,000 monthly reports. Extracted and normalized data from PDF, scanned images, CSV, and Excel using Gemini API, reducing manual effort and compliance errors significantly.',
    skills: ['Generative AI', 'LLMs', 'Gemini API', 'Python', 'PDF/Image Processing', 'Data Normalization', 'Automation'],
    action: 'View Case Study →',
    clickable: true,
  },
  {
    icon: '🗄️',
    tag: 'LLM · RAG',
    title: 'NLP-to-SQL Query Generation (Fine-Tuned LLM + RAG)',
    description:
      'Built a system converting natural-language prompts into accurate SQL queries using a fine-tuned Defog SQLCoder model. Implemented schema-aware retrieval, vector search, and prompt optimization to reduce hallucinations and enable direct database integration.',
    skills: ['LLM Fine-tuning', 'RAG', 'HuggingFace', 'SQLCoder', 'Vector DB', 'Qdrant', 'Chroma', 'SQL'],
    action: '// Details coming soon',
  },
  {
    icon: '💬',
    tag: 'Chatbot · NLP',
    title: 'AI-Powered Conversational Chatbot',
    description:
      'Developed an intelligent chatbot with contextual understanding and multi-turn conversation support. Built a full RAG pipeline for dynamic knowledge retrieval including intent handling, vector search, and prompt engineering for accurate and up-to-date responses.',
    skills: ['LLMs', 'RAG', 'HuggingFace', 'Vector DB', 'Prompt Engineering', 'API Integration'],
    action: '// Details coming soon',
  },
  {
    icon: '📈',
    tag: 'Time Series · Forecasting',
    title: 'Allyl Chloride Price Forecast',
    description:
      'Forecasted future prices of Allyl Chloride to support pharmaceutical business growth using advanced time series models including ARIMA, SARIMA, Prophet, and LSTM, with comprehensive data preprocessing and visualization pipelines.',
    skills: ['Python', 'Pandas', 'Time Series', 'ARIMA', 'Prophet', 'LSTM', 'Data Visualization'],
    action: '// Details coming soon',
  },
  {
    icon: '⚡',
    tag: 'Time Series · Energy',
    title: 'Coal & Sulphur Price Forecast',
    description:
      'Built forecasting models for both Coal and Sulphur commodity prices, helping manufacturing industries make informed procurement decisions. Applied data cleaning, trend analysis, and multiple forecasting algorithms for reliable price predictions.',
    skills: ['Python', 'Pandas', 'SARIMA', 'Exp. Smoothing', 'Data Preprocessing', 'Visualization'],
    action: '// Details coming soon',
  },
  {
    icon: '🔧',
    tag: 'ML · Classification',
    title: 'Predict Type of Failure in Machine',
    description:
      'Multi-class classification system predicting machine failure types from multi-feature sensor datasets. Applied various ML classifiers with feature engineering and model evaluation to support predictive maintenance workflows.',
    skills: ['Python', 'Scikit-learn', 'Classification', 'Feature Engineering', 'Data Visualization'],
    action: '// Details coming soon',
  },
]

const skillCategories = [
  {
    icon: '🤖',
    name: 'Machine Learning',
    skills: [
      { label: 'Scikit-learn / Classical ML', value: '92%' },
      { label: 'Deep Learning (TF / PyTorch)', value: '85%' },
      { label: 'Time Series Analysis', value: '90%' },
      { label: 'NLP & Text Mining', value: '82%' },
    ],
  },
  {
    icon: '🧬',
    name: 'LLM & Gen AI',
    skills: [
      { label: 'LLM Fine-tuning (HuggingFace)', value: '85%' },
      { label: 'RAG Pipelines', value: '88%' },
      { label: 'Vector Databases (Qdrant/Chroma)', value: '82%' },
      { label: 'Prompt Engineering', value: '87%' },
    ],
  },
  {
    icon: '💻',
    name: 'Programming & Data',
    skills: [
      { label: 'Python (NumPy, Pandas, SciPy)', value: '93%' },
      { label: 'SQL (MySQL, MongoDB)', value: '85%' },
      { label: 'Data Visualization (Matplotlib, PBI)', value: '88%' },
      { label: 'Flask / Streamlit / REST APIs', value: '80%' },
    ],
  },
  {
    icon: '☁️',
    name: 'Cloud & Infrastructure',
    skills: [
      { label: 'AWS (Server & API Deployment)', value: '78%' },
      { label: 'Snowflake', value: '72%' },
      { label: 'Statistics & Hypothesis Testing', value: '84%' },
      { label: 'Model Deployment & REST APIs', value: '80%' },
    ],
  },
]

const tools = [
  'Prophet',
  'ARIMA',
  'SARIMA',
  'LSTM',
  'XGBoost',
  'TensorFlow',
  'PyTorch',
  'Keras',
  'NLTK',
  'HuggingFace',
  'Gemini API',
  'Qdrant',
  'Chroma',
  'Power BI',
  'Streamlit',
  'Flask',
  'Snowflake',
  'MySQL',
  'MongoDB',
  'MSSQL',
  'DocumentDB',
  'Matplotlib',
  'Seaborn',
  'Scikit-learn',
  'SciPy',
  'NumPy',
  'Pandas',
  'Node.js',
]

const educationItems = [
  {
    degree: 'Bachelor of Engineering',
    school: 'Pune University',
    year: '2018 – 2021',
    grade: '✦ 7.21 CGPA — First Class',
  },
  {
    degree: 'Diploma in Engineering',
    school: 'MSBTE',
    year: '2015 – 2018',
    grade: '✦ 77.29% — First Class with Distinction',
  },
  {
    degree: 'SSC (10th Standard)',
    school: 'MSBSHSE',
    year: '2014 – 2015',
    grade: '✦ 79.40% — First Class with Distinction',
  },
]

const contactItems = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'pgjadhav0001@gmail.com',
    href: 'mailto:pgjadhav0001@gmail.com',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 7666308973',
    href: 'tel:+917666308973',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Ahmedabad / Mumbai, India',
  },
  {
    icon: '🗓️',
    label: 'Availability',
    value: 'Open to full-time & contract roles',
  },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
      const scrollY = window.scrollY
      let current = 'hero'

      sections.forEach((section) => {
        if (scrollY >= section.offsetTop - 120) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fadeElements = Array.from(document.querySelectorAll<HTMLElement>('.fade-up'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    fadeElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const overlay = document.getElementById('modal-ss-tool')
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenModal(null)
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000) // 3 seconds loading
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light'
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // GSAP Animation Setup
  useEffect(() => {
    const initializeAnimations = () => {
      // Hero animations with stagger
      gsap.fromTo(".hero-name .first", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, scrollTrigger: { trigger: "#hero", start: "top 80%" } });
      gsap.fromTo(".hero-name .last", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.7, scrollTrigger: { trigger: "#hero", start: "top 80%" } });
      gsap.fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.9, scrollTrigger: { trigger: "#hero", start: "top 80%" } });
      gsap.fromTo(".hero-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1.1, scrollTrigger: { trigger: "#hero", start: "top 80%" } });
      gsap.fromTo(".hero-btns", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1.3, scrollTrigger: { trigger: "#hero", start: "top 80%" } });
      gsap.fromTo(".hero-right", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.8, scrollTrigger: { trigger: "#hero", start: "top 80%" } });
      gsap.fromTo(".scroll-down", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.5, scrollTrigger: { trigger: "#hero", start: "top 80%" } });

      // About section animations
      gsap.fromTo("#about .section-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#about", start: "top 80%" } });
      gsap.fromTo("#about .section-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: "#about", start: "top 80%" } });
      gsap.fromTo("#about .about-text p", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, scrollTrigger: { trigger: "#about .about-text", start: "top 85%" } });
      gsap.fromTo("#about .expertise-block", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#about .expertise-block", start: "top 85%" } });

      // Experience section animations
      gsap.fromTo("#experience .section-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#experience", start: "top 80%" } });
      gsap.fromTo("#experience .section-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: "#experience", start: "top 80%" } });
      gsap.fromTo("#experience .timeline-item", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.3, scrollTrigger: { trigger: "#experience .exp-timeline", start: "top 85%" } });

      // Projects section animations
      gsap.fromTo("#projects .section-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#projects", start: "top 80%" } });
      gsap.fromTo("#projects .section-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: "#projects", start: "top 80%" } });
      gsap.fromTo("#projects .project-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, scrollTrigger: { trigger: "#projects .projects-grid", start: "top 85%" } });

      // Skills section animations
      gsap.fromTo("#skills .section-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#skills", start: "top 80%" } });
      gsap.fromTo("#skills .skill-category", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, scrollTrigger: { trigger: "#skills .skills-layout", start: "top 85%" } });

      // Education section animations
      gsap.fromTo("#education .section-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#education", start: "top 80%" } });
      gsap.fromTo("#education .edu-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, scrollTrigger: { trigger: "#education .edu-grid", start: "top 85%" } });

      // Contact section animations
      gsap.fromTo("#contact .section-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#contact", start: "top 80%" } });
      gsap.fromTo("#contact .contact-info", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, scrollTrigger: { trigger: "#contact .contact-wrapper", start: "top 85%" } });
      gsap.fromTo("#contact .contact-cta-box", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.4, scrollTrigger: { trigger: "#contact .contact-wrapper", start: "top 85%" } });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loading />
      <main style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
        <CustomCursor />
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

      <nav>
        <div className="nav-logo">PJ</div>
        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                className={activeSection === link.id ? 'active' : ''}
                href={`#${link.id}`}
                onClick={() => setIsMenuOpen(false)}
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button type="button" className="theme-toggle" onClick={() => setIsDarkMode((prev) => !prev)} data-cursor="hover">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <a href="#contact" className="nav-cta" data-cursor="hover">
            Hire Me
          </a>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-left fade-up">
          <div className="hero-tag">Available for opportunities</div>
          <h1 className="hero-name">
            <span className="first">Prashant</span>
            <span className="last">Jadhav</span>
          </h1>
          <div className="hero-title">{'//Data Scientist & AI/ML Engineer'}</div>
          <p className="hero-desc">
            Building intelligent systems at the intersection of Machine Learning, LLMs, and Time Series Analysis.
            3+ years turning complex data into decisions that matter.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary" data-cursor="hover">
              View Projects →
            </a>
            <a href="#contact" className="btn-outline" data-cursor="hover">
              Get In Touch
            </a>
            <a href="#contact" className="btn-outline" data-cursor="hover">
              Request Resume
            </a>
          </div>
          <div className="hero-resume-copy">
            Resume available on request — connect for a tailored AI/ML case study and CV.
          </div>
        </div>

        <div className="hero-right fade-up" style={{ transitionDelay: '0.2s' }}>
          <Character />
          <div className="hero-stack">
            <div className="hero-stack-title">{'// Core Stack'}</div>
            <div className="stack-pills">
              {stackPills.map((pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-summary-card fade-up">
            <div className="summary-label">{'// Experience Snapshot'}</div>
            <div className="summary-grid">
              {heroSummary.map((item) => (
                <div key={item.label} className="summary-item">
                  <div className="summary-value">{item.value}</div>
                  <div className="summary-text">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="summary-copy">
              Enabling AI-driven decision-making with production-grade models, automation pipelines, and data-driven storytelling.
            </p>
          </div>
        </div>

        <div className="scroll-down">
          <div className="scroll-icon">
            <span></span>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="about">
        <div className="section-inner">
          <div className="section-label">{'// 01 — About'}</div>
          <h2 className="section-title">
            The Data Mind
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Behind the Models</em>
          </h2>
          <div className="about-grid fade-up">
            <div className="about-text">
              <div className="about-card-header">
                <div className="exp-title">{'// Profile Overview'}</div>
                <p className="about-card-subtitle">Building AI-first systems that combine forecasting, NLP, and automation to deliver measurable business outcomes.</p>
              </div>
              <p>{'I\'m a Data Scientist with 3+ years of hands-on experience crafting end-to-end AI/ML solutions across forecasting, natural language processing, and generative AI. Currently based in Ahmedabad, I work at Let\'s Enkindle where I build predictive models and intelligent automation systems for real-world business impact.'}</p>
              <p>
                My expertise spans the full ML lifecycle — from raw data wrangling and feature engineering to deploying production-grade models via REST APIs on AWS. I thrive in cross-functional environments where data-driven decisions move the needle.
              </p>
              <p>{'Recently, I\'ve been deep-diving into the LLM ecosystem — fine-tuning models like SQLCoder, building RAG pipelines with vector databases, and developing AI agents powered by the Gemini API.'}</p>
            </div>

            <div className="about-right">
              <div className="expertise-block fade-up">
                <div className="exp-title">{'// Domains of Expertise'}</div>
                <div className="exp-items">
                  {expertiseItems.map((item) => (
                    <div key={item} className="exp-item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="experience">
        <div className="section-inner">
          <div className="section-label">{'// 02 — Experience'}</div>
          <h2 className="section-title">
            Professional
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Journey</em>
          </h2>
          <p className="section-sub">3+ years building data-driven products across two forward-thinking organizations.</p>

          <div className="exp-timeline fade-up">
            {experienceItems.map((item) => (
              <div key={item.date} className="timeline-item glow-box">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-line">
                  <div
                    className="timeline-dot"
                    style={
                      item.accent === 'accent2'
                        ? { background: 'var(--accent2)', boxShadow: '0 0 12px var(--accent2)' }
                        : undefined
                    }
                  />
                  <div className="timeline-bar" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-role">{item.role}</div>
                  <div className="timeline-company">{item.company}</div>
                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="projects">
        <div className="section-inner">
          <div className="section-label">{'// 03 — Projects'}</div>
          <h2 className="section-title">
            Featured
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Work</em>
          </h2>
          <p className="section-sub">A selection of projects spanning Gen AI, NLP, Time Series, and ML classification.</p>

          <div className="projects-grid fade-up">
            {projects.map((project) => (
              <div
                key={project.title}
                className="project-card glow-box card-hover"
                onClick={() => project.clickable && setOpenModal(project.id)}
                role={project.clickable ? 'button' : undefined}
                tabIndex={project.clickable ? 0 : undefined}
                data-cursor={project.clickable ? 'hover' : undefined}
              >
                <div className="project-header">
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-tag">{project.tag}</div>
                </div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.description}</div>
                <div className="project-skills">
                  {project.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <span className={project.clickable ? 'view-details-btn' : 'coming-soon-btn'}>{project.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="skills">
        <div className="section-inner">
          <div className="section-label">{'// 04 — Skills'}</div>
          <h2 className="section-title">
            Technical
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Arsenal</em>
          </h2>

          <div className="skills-layout fade-up">
            {skillCategories.map((category) => (
              <div key={category.name} className="skill-category glow-box card-hover">
                <div className="cat-header">
                  <span className="cat-icon">{category.icon}</span>
                  <span className="cat-name">{category.name}</span>
                </div>
                <div className="skill-bars">
                  {category.skills.map((skill) => (
                    <div key={skill.label} className="skill-bar-row">
                      <div className="skill-bar-top">
                        <span className="skill-bar-name">{skill.label}</span>
                        <span className="skill-bar-pct">{skill.value}</span>
                      </div>
                      <div className="skill-track">
                        <div className="skill-fill" style={{ width: skill.value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="tools-grid">
              <div className="tools-title">{'// Tech Ecosystem'}</div>
              <TechStack />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="education">
        <div className="section-inner">
          <div className="section-label">{'// 05 — Education'}</div>
          <h2 className="section-title">
            Academic
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Foundation</em>
          </h2>

          <div className="edu-grid fade-up">
            {educationItems.map((item) => (
              <div key={item.degree} className="edu-card glow-box card-hover">
                <div className="edu-degree">{item.degree}</div>
                <div className="edu-school">{item.school}</div>
                <div className="edu-year">{item.year}</div>
                <div className="edu-grade">{item.grade}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="contact">
        <div className="section-inner">
          <div className="section-label">{'// 06 — Contact'}</div>
          <h2 className="section-title">
            {'Let\'s Build'}
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Something Together</em>
          </h2>

          <div className="contact-wrapper fade-up">
            <div className="contact-info">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  className="contact-item"
                  href={item.href ?? '#contact'}
                  {...(item.href ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-val">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-cta-box">
              <div className="cta-title">Ready to make data work for you?</div>
              <p className="cta-sub">{'Whether you\'re looking for an ML engineer, a GenAI specialist, or a data scientist to own your entire analytics stack — let\'s talk. I\'m currently open to new opportunities and would love to connect.'}</p>
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                const subject = `Contact from ${name}`;
                const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                window.location.href = `mailto:pgjadhav0001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" rows={4} required></textarea>
                <button type="submit" className="btn-primary" data-cursor="hover">Send Message →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className={`modal-overlay ${openModal === 'ss-tool' ? 'open' : ''}`} id="modal-ss-tool" onClick={(event) => {
        if (event.target === event.currentTarget) setOpenModal(null)
      }}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-header-left">
              <div className="modal-tag">📋 Gen AI · Automation · Pharma</div>
              <div className="modal-title">S&S Statement AI Verification Tool</div>
              <div className="modal-subtitle">{'// Pharmaceutical Stock Reconciliation Automation · End-to-End AI Pipeline'}</div>
            </div>
            <button className="modal-close" onClick={() => setOpenModal(null)} aria-label="Close" data-cursor="hover">
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: 'var(--accent)' }}>◈</span> Project Flow
                  <span>{'// End-to-end pipeline'}</span>
              </div>
              <div className="modal-flow">
                {[
                  { num: '01', icon: '🏭', label: 'Problem Identification' },
                  { num: '02', icon: '🗂️', label: 'Data Requirements' },
                  { num: '03', icon: '🔗', label: 'Dealer Pipeline' },
                  { num: '04', icon: '🤖', label: 'AI Extraction' },
                  { num: '05', icon: '⚖️', label: 'Comparison Engine' },
                  { num: '06', icon: '✅', label: 'Validation & Labeling' },
                ].map((step) => (
                  <div key={step.num} className="flow-step">
                    <div className="flow-step-num">{step.num}</div>
                    <div className="flow-step-icon">{step.icon}</div>
                    <div className="flow-step-name">{step.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: '#f87171' }}>▲</span> Problem Statement
                  <span>{'// Business pain points'}</span>
              </div>
              <div className="problem-list">
                {[
                  'Client is a pharmaceutical manufacturing company selling products Pan India through a network of 30 super stockists, 200+ stockists, and thousands of chemists. Sales are tracked division-wise by state, stockist name, and division name.',
                  'Each month, ground staff submit stock reports in PDF format — totalling 13,000+ PDF files per cycle. Ground staff often print reports, photograph them, and convert to PDF, resulting in non-standardized, unstructured data.',
                  'A manual team of 10–12 people was responsible for verifying each dealer report against the master distributor stock list — comparing closing quantities product by product, stockist by stockist.',
                  'The entire verification cycle consumed 10–12 working days per month, causing delays in compliance reporting, business decisions, and month-end reconciliation workflows.',
                  'Goal: Build an automated AI system that ingests all dealer reports in any format, extracts structured data, and verifies them against the master stock report — reducing the 10–12 day cycle to near real-time.',
                ].map((text) => (
                  <div key={text} className="problem-item">
                    <span className="problem-item-icon">•</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: 'var(--accent2)' }}>◉</span> Data Requirements
                  <span>{'// Inputs & sources'}</span>
              </div>
              <div className="modal-section-body">
                {'The system required two primary data sources: dealer stock reports submitted by ground staff across India (in PDF, PNG, JPEG, Excel, and CSV formats), and the master stock report maintained internally by the client. A key integration step involved collaborating with the client\'s third-party system developer to establish an automated data dump pipeline into an AWS S3 bucket in a standardized format and path structure, ensuring consistent ingestion regardless of source format.'}
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: 'var(--accent)' }}>◈</span> Approach & Methodology
                  <span>{'// Technical solution design'}</span>
              </div>
              <div className="task-list">
                <div className="task-card">
                  <div className="task-num">TASK 01</div>
                  <div className="task-content">
                    <div className="task-title">Dealer Data Ingestion Pipeline (S3 Connection)</div>
                    <div className="task-desc">
                      {'Built a Dealer Connection Pipeline to collect and route dealer data from the client\'s third-party system into an AWS S3 bucket. Defined a standardized path and format convention so all incoming reports — regardless of origin — land in a predictable, processable location.'}
                    </div>
                  </div>
                </div>
                <div className="task-card">
                  <div className="task-num">TASK 02</div>
                  <div className="task-content">
                    <div className="task-title">Multi-Format Document Handling</div>
                    <div className="task-desc">
                      Dealer reports arrived in five distinct formats. Developed format-detection logic and individual conversion handlers for each:
                    </div>
                    <div className="task-sub-list">
                      <div className="task-sub-item"><strong>PDF</strong> — Direct text extraction attempted using pdfplumber; fallback to OCR for scanned/image-based PDFs</div>
                      <div className="task-sub-item"><strong>PNG / JPEG</strong> — Image-to-text via pytesseract OCR pipeline</div>
                      <div className="task-sub-item"><strong>Excel / CSV</strong> — Pandas-based ingestion with column normalization and schema alignment</div>
                    </div>
                  </div>
                </div>
                <div className="task-card">
                  <div className="task-num">TASK 03</div>
                  <div className="task-content">
                    <div className="task-title">AI-Powered Data Extraction via Gemini API</div>
                    <div className="task-desc">
                      Traditional OCR and PDF extraction methods (pdfplumber, pytesseract) failed to produce reliable structured output from scanned, photographed, or non-tabular PDFs. The key engineering decision was to integrate Google Gemini API as the primary extraction engine.
                    </div>
                    <div className="task-sub-list">
                      <div className="task-sub-item">Designed prompt templates instructing Gemini to parse each document and return data in the exact schema matching the master stock report</div>
                      <div className="task-sub-item">Applied prompt engineering to handle edge cases: missing columns, merged cells, handwritten annotations, and multi-page reports</div>
                      <div className="task-sub-item">Iteratively refined prompts through testing on diverse document samples from different ground staff</div>
                      <div className="task-sub-item">Output: Structured JSON/tabular data aligned with master stock schema — ready for comparison</div>
                    </div>
                  </div>
                </div>
                <div className="task-card">
                  <div className="task-num">TASK 04</div>
                  <div className="task-content">
                    <div className="task-title">Data Normalization & Schema Alignment</div>
                    <div className="task-desc">
                      After extraction, applied a normalization layer to standardize product names, units, and division labels across all dealer reports. This step ensured extracted data was comparable with the master stock data despite variations in terminology and formatting used by different ground staff across states.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: 'var(--accent3)' }}>◈</span> Comparison Engine
                  <span>{'// Reconciliation logic'}</span>
              </div>
              <div className="task-list">
                <div className="task-card">
                  <div className="task-num">TASK 05</div>
                  <div className="task-content">
                    <div className="task-title">Filtered Matching & Primary Key Assignment</div>
                    <div className="task-desc">
                      Implemented a multi-key filtering strategy to narrow comparison scope before running validation:
                    </div>
                    <div className="task-sub-list">
                      <div className="task-sub-item">Filtered records by <strong>Stockist Name</strong>, <strong>Division</strong>, and <strong>Date</strong></div>
                      <div className="task-sub-item">Applied <strong>Product Name</strong> as the primary key for joining dealer data against master data</div>
                      <div className="task-sub-item">Performed <strong>Closing Quantity comparison</strong> between extracted dealer values and master stock values</div>
                    </div>
                  </div>
                </div>
                <div className="task-card">
                  <div className="task-num">TASK 06</div>
                  <div className="task-content">
                    <div className="task-title">Two-Layer Validation & Result Labeling</div>
                    <div className="task-desc">
                      Designed a two-layer validation system to handle all mismatch scenarios intelligently and produce business-readable labels:
                    </div>
                    <div className="task-sub-list">
                      <div className="task-sub-item"><strong>Layer 1 — Product Resolution:</strong> If product not found in master data, system cross-checks unit details and re-attempts product name matching</div>
                      <div className="task-sub-item"><strong>Layer 2 — Division Check:</strong> If product name and unit verify correctly but quantity still mismatches, it is labeled as &quot;Division Mismatch&quot; — isolating the error type for the business team</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  {'// Output Labels'}
                </div>
                <div className="label-grid">
                  <span className="label-badge match">✓ Match</span>
                  <span className="label-badge nomatch">✗ Not Match</span>
                  <span className="label-badge mismatch">⚠ Division Mismatch</span>
                  <span className="label-badge notfound">◌ Product Not Found</span>
                </div>
              </div>

              <div className="validation-layers" style={{ marginTop: '0.75rem' }}>
                <div className="val-layer">
                  <div className="val-layer-title">{'// Layer 1 — Product Resolution'}</div>
                  <div className="val-layer-desc">When a product is not found in master data, the system checks unit details and re-validates the product name. This handles naming discrepancies between ground staff terminology and master records.</div>
                </div>
                <div className="val-layer">
                  <div className="val-layer-title">{'// Layer 2 — Division Check'}</div>
                  <div className="val-layer-desc">If product name and unit both verify correctly but quantity still mismatches, the system flags it as &quot;Division Mismatch&quot; — providing the business team with a precise, actionable error category.</div>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: 'var(--accent)' }}>◈</span> Tech Stack Used
                  <span>{'// Tools & technologies'}</span>
              </div>
              <div className="tech-stack-grid">
                {tools.slice(0, 16).map((tool) => (
                  <span key={tool} className="tech-badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                <span style={{ color: 'var(--accent3)' }}>◈</span> Key Outcomes & Results
                  <span>{'// Business impact'}</span>
              </div>
              <div className="outcomes-grid">
                {[
                  { icon: '⚡', value: '~90%', label: 'Reduction in manual verification time' },
                  { icon: '👥', value: '10–12', label: 'Person manual team replaced by automation' },
                  { icon: '📄', value: '13,000+', label: 'Monthly PDF reports processed automatically' },
                  { icon: '🗓️', value: '10–12d → hrs', label: 'Verification cycle drastically reduced' },
                  { icon: '🎯', value: 'Multi-layer', label: 'Validation with business-readable error labels' },
                  { icon: '🏭', value: 'Pan India', label: 'Coverage across all 30 super stockists & divisions' },
                ].map((outcome) => (
                  <div key={outcome.label} className="outcome-card">
                    <div className="outcome-icon">{outcome.icon}</div>
                    <div className="outcome-val">{outcome.value}</div>
                    <div className="outcome-label">{outcome.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
              <div className="modal-footer-note">{'// Pharmaceutical · Stock Verification · AI Automation · 2024–Present'}</div>
            <button className="btn-outline" onClick={() => setOpenModal(null)} style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}>
              Close ✕
            </button>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-name">Prashant Jadhav</div>
        <div className="footer-copy">© 2025 · Data Scientist · Built with passion for data</div>
      </footer>
    </main>
    </>
  )
}
