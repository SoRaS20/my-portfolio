"use client"

import { useState, useEffect, useRef } from "react"

// Matrix Rain Background Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
    const fontSize = 12
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#00ff00"
      ctx.font = `${fontSize}px VT323`

      drops.forEach((y: number, i: number) => {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    const interval = setInterval(draw, 30)
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-10 z-0" />
}

// Animated Skill Bar Component
const AnimatedSkillBar = ({ skill, level }: { skill: string; level: number }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 500)
    return () => clearTimeout(timer)
  }, [level])

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-300">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

// Typing Effect Hook
const useTypingEffect = (text: string, speed = 80) => {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayText("")
    setIsComplete(false)
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

// Main Portfolio Component
export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [showCursor, setShowCursor] = useState(true)
  const [stats, setStats] = useState({ projects: 0, problems: 0, technologies: 0 })
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isGlitching, setIsGlitching] = useState(false)

  const welcomeText = "Welcome to Sohanur Rahman's Portfolio"
  const { displayText: terminalText, isComplete } = useTypingEffect(welcomeText)

  useEffect(() => {
    const animateStats = () => {
      const targetStats = { projects: 3, problems: 1000, technologies: 15 }
      const duration = 1500
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setStats({
          projects: Math.floor(targetStats.projects * easeOut),
          problems: Math.floor(targetStats.problems * easeOut),
          technologies: Math.floor(targetStats.technologies * easeOut),
        })
        if (step >= steps) {
          clearInterval(timer)
          setStats(targetStats)
        }
      }, stepDuration)
      return () => clearInterval(timer)
    }

    if (currentSection === "home") {
      const timeout = setTimeout(animateStats, 800)
      return () => clearTimeout(timeout)
    }
  }, [currentSection])

  useEffect(() => {
    const sectionCommands: Record<string, string> = {
      home: "cd ~",
      about: "cat about.txt",
      experience: "ls -la experience/",
      projects: "cd projects && ls",
      education: "cat education.log",
      skills: "./skills --list",
      contact: "contact --info",
    }
    const command = sectionCommands[currentSection]
    if (command && !commandHistory.includes(command)) {
      setCommandHistory((prev) => [...prev, command].slice(-5))
    }
  }, [currentSection, commandHistory])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }, 8000)
    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor((prev) => !prev), 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const sections = [
    { id: "home", label: "> HOME", icon: "🏠" },
    { id: "about", label: "> ABOUT", icon: "👤" },
    { id: "experience", label: "> EXPERIENCE", icon: "💼" },
    { id: "projects", label: "> PROJECTS", icon: "💻" },
    { id: "education", label: "> EDUCATION", icon: "🎓" },
    { id: "skills", label: "> SKILLS", icon: "🏆" },
    { id: "contact", label: "> CONTACT", icon: "📧" },
  ]

  const skillsWithLevels = {
    "Programming Languages": [
      { name: "Python", level: 92 },
      { name: "Java", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 80 },
      { name: "C", level: 75 },
    ],
    "AI/ML": [
      { name: "Deep Learning", level: 88 },
      { name: "NLP", level: 85 },
      { name: "Computer Vision", level: 80 },
      { name: "RAG Systems", level: 75 },
    ],
    "Web Technologies": [
      { name: "Next.js", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Spring Boot", level: 80 },
    ],
    "Tools & Platforms": [
      { name: "Git/GitHub", level: 92 },
      { name: "Docker", level: 85 },
      { name: "Linux", level: 90 },
      { name: "Kubernetes", level: 80 },
    ],
  }

  const skills = {
    "Programming Languages": ["Java", "C", "C++", "Python", "JavaScript", "TypeScript"],
    "Web Technologies": ["HTML", "CSS", "Next.js", "FastAPI", "Spring Boot", "Tailwind CSS"],
    "Frameworks & Libraries": ["React", "Scikit-learn", "Pandas", "NumPy", "TensorFlow", "Keras"],
    Databases: ["MySQL", "PostgreSQL", "MongoDB"],
    "AI/ML": ["NLP", "Deep Learning", "CNNs", "RNNs", "GANs", "RAG", "BERT", "GPT"],
    Tools: ["Git", "GitHub", "Docker", "Jenkins", "Kubernetes", "Google Colab", "VS Code"],
  }

  const projects = [
    {
      title: "Conversational Memory Bot",
      description:
        "AI-powered photo gallery assistant with advanced natural language querying and visual understanding.",
      technologies: ["Python", "Next.js", "Gemini LLM", "CLIP", "ChromaDB", "RAG", "Multimodal AI"],
      features: [
        "Natural language photo searches",
        "Context-aware image retrieval",
        "Visual similarity search",
        "Automatic image tagging",
        "Real-time processing",
      ],
      link: "https://github.com/SoRaS20/Conversational-Memory-Bot",
    },
    {
      title: "Smile Classifier",
      description: "AI-driven image classification system with a responsive UI and RESTful API.",
      technologies: ["Next.js", "Python", "FastAPI", "Scikit-learn", "SQLAlchemy", "MySQL", "Docker"],
      features: [
        "Real-time image classification",
        "Scalable RESTful API",
        "Dockerized deployment",
        "Interactive web interface",
      ],
      link: "https://github.com/SoRaS20/Smile-Classifier",
    },
    {
      title: "Building Crack Detection",
      description: "Deep learning system for detecting structural cracks using advanced CNNs.",
      technologies: ["Python", "TensorFlow", "Keras", "VGG-16", "OpenCV", "CNN"],
      features: [
        "Transfer learning with VGG-16",
        "High-accuracy crack detection",
        "Large-scale image processing",
        "Model optimization",
      ],
      link: "https://github.com/SoRaS20/Building-Crack-Detection",
    },
  ]

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <img
                  src="/software-engineer-portrait.png"
                  alt="Sohanur Rahman"
                  className="relative w-48 h-48 border-4 border-green-500 rounded-lg transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4">
                <h1
                  className={`text-4xl md:text-5xl font-bold ${isGlitching ? "animate-pulse text-blue-400" : "text-green-400"}`}
                >
                  {terminalText}
                  {showCursor && !isComplete && <span className="animate-pulse">_</span>}
                </h1>
                <div className="text-xl text-blue-400 flex items-center gap-2">
                  <span>🖥️</span>$ whoami
                </div>
                <div className="text-lg text-gray-300">Sohanur Rahman</div>
                <div className="text-xl text-gray-400">AI & ML Engineer | Web Developer | Competitive Programmer</div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Online</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⚡</span>
                    <span>Active Developer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🚀</span>
                    <span>AI Enthusiast</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-shadow duration-300">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  { value: stats.projects, label: "Major Projects", color: "green-500" },
                  { value: stats.problems, label: "Problems Solved", color: "blue-400" },
                  { value: stats.technologies, label: "Technologies", color: "green-400" },
                ].map((stat, idx) => (
                  <div key={idx} className="group">
                    <div
                      className={`text-3xl font-bold text-${stat.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {stat.value}+
                    </div>
                    <div className="text-xl text-gray-300">{stat.label}</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div
                        className={`bg-${stat.color} h-1 rounded-full transition-all duration-1000`}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-800/50 border-2 border-green-500/50 rounded-lg">
              <div className="text-sm text-gray-300">
                <div className="text-blue-400 mb-2">Recent Commands:</div>
                {commandHistory.slice(-3).map((cmd, idx) => (
                  <div key={idx} className="text-gray-400">
                    <span className="text-green-400">sohanur@portfolio:~$ </span>
                    {cmd}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "about":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400">$ cat about.txt</h2>
            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg hover:shadow-green-500/40 transition-shadow duration-300">
              <div className="space-y-4">
                <p className="text-lg text-gray-300">
                  Passionate Software Engineer with expertise in AI, machine learning, and full-stack development.
                  Currently at BJIT Limited, building innovative solutions with a focus on performance and scalability.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Personal Info</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <span>📧</span>
                        <a href="mailto:sohanurrahman621@gmail.com" className="hover:text-blue-400 transition-colors">
                          sohanurrahman621@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📱</span>
                        <a href="tel:+8801879957329" className="hover:text-blue-400 transition-colors">
                          +8801879957329
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>Mohakhali, Dhaka</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🐙</span>
                        <a
                          href="https://github.com/SoRaS20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                        >
                          SoRaS20
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Competitive Programming</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      {[
                        { name: "Codeforces", handle: "TheEnd", url: "https://codeforces.com/profile/TheEnd" },
                        { name: "LeetCode", handle: "SoRaS_20", url: "https://leetcode.com/SoRaS_20" },
                        { name: "Vjudge", handle: "lazy_coder0", url: "https://vjudge.net/user/lazy_coder0" },
                        { name: "StopStalk", handle: "SoRaS", url: "https://www.stopstalk.com/user/profile/SoRaS" },
                      ].map((profile, idx) => (
                        <div key={idx}>
                          {profile.name}:{" "}
                          <a
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                          >
                            {profile.handle}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "experience":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400">$ ls -la experience/</h2>
            {[
              {
                title: "Trainee Software Engineer",
                company: "BJIT Limited",
                period: "Nov 2024 – Feb 2025",
                tasks: [
                  "Gained hands-on experience in AI, web development, and REST APIs",
                  "Worked on projects using Python, FastAPI for scalable backend solutions",
                  "Practiced Agile development, using Git, GitHub, and Redmine for version control",
                  "Strengthened skills in OOP, DSA, and problem-solving techniques",
                  "Participated in regular code reviews, presentations, and technical discussions",
                  "Improved skills in clean code writing and debugging methodologies",
                  "Familiar with automating CI/CD using Docker, Jenkins, and Kubernetes",
                ],
              },
              {
                title: "Undergraduate Researcher",
                company: "NSTU",
                period: "Mar 2023 – Feb 2024",
                tasks: [
                  "Developed efficient crack detection system leveraging VGG-16 and transfer learning",
                  "Collected and processed dataset of 6000+ images for crack classification",
                  "Fine-tuned CNN models to achieve high accuracy in detecting building cracks",
                  "Used Python, TensorFlow, Keras, and OpenCV for deep learning implementation",
                ],
              },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg hover:shadow-green-500/40 transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
                    <p className="text-lg text-green-400">{exp.company}</p>
                  </div>
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm">{exp.period}</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  {exp.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      case "projects":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400">$ cd projects && ls</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:no-underline"
                >
                  <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/40 hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
                      <span className="text-green-400 text-xl">🔗</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                    <div className="mb-4">
                      <h4 className="font-bold text-green-400 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs hover:bg-green-500 hover:text-gray-900 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
      case "education":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400">$ cat education.log</h2>
            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg hover:shadow-green-500/40 transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-400">
                    B.Sc. in Information and Communication Engineering
                  </h3>
                  <p className="text-lg text-green-400">Noakhali Science and Technology University</p>
                </div>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm">Jan 2019 – May 2024</span>
              </div>
              <div className="text-lg text-gray-300">
                <span className="text-green-400 font-bold">CGPA:</span> 3.38/4.00 (with honors)
              </div>
            </div>

            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg hover:shadow-green-500/40 transition-shadow duration-300">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Certifications</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">🏆</span>
                  <span>Trainee Software Engineer (AI) - BJIT LTD.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">🏭</span>
                  <span>Industrial Attachment at BJIT LTD.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">💾</span>
                  <span>HackerRank SQL Certification</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg hover:shadow-green-500/40 transition-shadow duration-300">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Competitive Programming Achievements</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">🏅</span>
                  <span>Problem Setter - ICE TECHCOMBAT Programming Contest 2023, NSTU</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">🏅</span>
                  <span>Problem Setter - ICE 6th Batch Farewell Programming Contest 2023, NSTU</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">🎯</span>
                  <span>Contestant - CUET Inter University Programming Contest 2024</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">🎯</span>
                  <span>ICPC Asia Dhaka Regional Site Online Preliminary 2022, 2023</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">🥉</span>
                  <span>4th Place - Intra NSTU Programming Contest 2023</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">🏆</span>
                  <span>12th Place - Intra NSTU Programming Contest 2022</span>
                </div>
              </div>
            </div>
          </div>
        )
      case "skills":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400">$ ./skills --list</h2>
            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Proficiency Levels</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {Object.entries(skillsWithLevels).map(([category, skillList]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="font-bold text-green-400">{category}</h4>
                    <div className="space-y-3">
                      {skillList.map((skill, idx) => (
                        <AnimatedSkillBar key={idx} skill={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(skills).map(([category, skillList]) => (
                <div
                  key={category}
                  className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/40"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm hover:bg-green-500 hover:text-gray-900 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "contact":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400">$ contact --info</h2>
            <div className="p-6 bg-gray-800/80 border-2 border-green-500 rounded-lg shadow-lg hover:shadow-green-500/40 transition-shadow duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400">Get In Touch</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors">
                      <span className="text-green-400 text-lg">📧</span>
                      <a href="mailto:sohanurrahman621@gmail.com" className="hover:text-blue-400 transition-colors">
                        sohanurrahman621@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors">
                      <span className="text-green-400 text-lg">📱</span>
                      <a href="tel:+8801879957329" className="hover:text-blue-400 transition-colors">
                        +8801879957329
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors">
                      <span className="text-green-400 text-lg">📍</span>
                      <span>Mohakhali, Dhaka, Bangladesh</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors">
                      <span className="text-green-400 text-lg">🐙</span>
                      <a
                        href="https://github.com/SoRaS20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        github.com/SoRaS20
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400">Coding Profiles</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    {[
                      { name: "Codeforces", handle: "TheEnd", url: "https://codeforces.com/profile/TheEnd", icon: "⚔️" },
                      { name: "LeetCode", handle: "SoRaS_20", url: "https://leetcode.com/SoRaS_20", icon: "🧩" },
                      { name: "Vjudge", handle: "lazy_coder0", url: "https://vjudge.net/user/lazy_coder0", icon: "⚖️" },
                      {
                        name: "StopStalk",
                        handle: "SoRaS",
                        url: "https://www.stopstalk.com/user/profile/SoRaS",
                        icon: "📊",
                      },
                    ].map((profile, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="text-green-400">{profile.icon}</span>
                        <span className="text-green-400">{profile.name}:</span>
                        <a
                          href={profile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                        >
                          {profile.handle}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 border border-green-500/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="text-green-400">💡 Fun Fact:</span> Solved 1000+ algorithmic problems across multiple
                platforms!
              </p>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center text-gray-400">
            <h2 className="text-2xl font-bold mb-4">Section Under Construction</h2>
            <p>This section is being built. Please check back soon!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      <MatrixRain />
      <div className="flex flex-col md:flex-row relative z-10">
        <nav
          className="w-full md:w-64 bg-gray-800/95 border-b md:border-r border-gray-700 p-4 md:min-h-screen"
          aria-label="Main navigation"
        >
          <div className="space-y-2">
            <div className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
              <span>🖥️</span>
              TERMINAL_PORTFOLIO.EXE
            </div>
            {sections.map((section) => (
              <button
                key={section.id}
                className={`w-full text-left font-mono py-2 px-4 rounded transition-all duration-200 hover:bg-blue-500/20 hover:translate-x-1 ${
                  currentSection === section.id
                    ? "bg-green-500/50 text-black border border-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
                onClick={() => setCurrentSection(section.id)}
                aria-current={currentSection === section.id ? "page" : undefined}
              >
                <span className="inline-block mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
            <div className="mt-8 p-3 bg-gray-800/50 rounded border border-green-500/30">
              <div className="text-xs text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>CPU:</span>
                  <span className="text-green-500">█████░ 85%</span>
                </div>
                <div className="flex justify-between">
                  <span>RAM:</span>
                  <span className="text-blue-400">███░░░ 60%</span>
                </div>
                <div className="flex justify-between">
                  <span>NET:</span>
                  <span className="text-green-400">██████ 100%</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1 p-4 md:p-8 bg-gray-900/95" aria-live="polite">
          <div className="max-w-4xl mx-auto">{renderSection()}</div>
        </main>
      </div>
      <footer className="bg-gray-800/95 border-t border-gray-700 p-4 text-center text-sm text-gray-300 relative z-10">
        <span className="text-green-400">sohanur@portfolio:~$ </span>
        Built with React, Tailwind & Terminal Passion
        <span className="animate-pulse text-green-400">_</span>
      </footer>
    </div>
  )
}
