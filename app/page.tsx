"use client"

import { useState, useEffect, useRef } from "react"

// Enhanced Matrix Rain with depth effect
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}アイウエオカキクケコサシスセソ".split("")
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)
    const speeds = Array(Math.floor(columns)).fill(0).map(() => 0.5 + Math.random() * 0.5)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y: number, i: number) => {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        const brightness = Math.random() * 100 + 155
        ctx.fillStyle = `rgb(0, ${brightness}, ${brightness * 0.3})`
        ctx.font = `${fontSize}px "VT323", monospace`
        ctx.fillText(text, i * fontSize, y * fontSize)

        // Add glow effect to some characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = "#00ff00"
          ctx.shadowBlur = 10
          ctx.fillText(text, i * fontSize, y * fontSize)
          ctx.shadowBlur = 0
        }

        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i] += speeds[i]
      })
    }

    const interval = setInterval(draw, 33)
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-15 z-0" />
}

// Floating Particles Effect
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(0,255,136,${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated Skill Bar with gradient
const AnimatedSkillBar = ({ skill, level }: { skill: string; level: number }) => {
  const [width, setWidth] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 500)
    return () => clearTimeout(timer)
  }, [level])

  return (
    <div
      className="space-y-2 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">{skill}</span>
        <span className={`font-medium transition-all duration-300 ${isHovered ? 'text-cyan-400 scale-110' : 'text-green-400'}`}>
          {level}%
        </span>
      </div>
      <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-gray-700/50">
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{
            width: `${width}%`,
            background: isHovered
              ? 'linear-gradient(90deg, #00ff87, #60efff, #00ff87)'
              : 'linear-gradient(90deg, #10b981, #22c55e, #4ade80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
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

// Glowing Card Component
const GlowCard = ({ children, className = "", glowColor = "green" }: { children: React.ReactNode; className?: string; glowColor?: string }) => {
  const glowColors = {
    green: "hover:shadow-green-500/30 border-green-500/50 hover:border-green-400",
    cyan: "hover:shadow-cyan-500/30 border-cyan-500/50 hover:border-cyan-400",
    purple: "hover:shadow-purple-500/30 border-purple-500/50 hover:border-purple-400",
  }

  return (
    <div className={`
      relative overflow-hidden rounded-xl
      bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90
      backdrop-blur-xl border
      shadow-xl hover:shadow-2xl
      transition-all duration-500 ease-out
      ${glowColors[glowColor as keyof typeof glowColors] || glowColors.green}
      ${className}
    `}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Main Portfolio Component
export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [showCursor, setShowCursor] = useState(true)
  const [stats, setStats] = useState({ projects: 0, problems: 0, technologies: 0 })
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isGlitching, setIsGlitching] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<{ text: string, type: 'success' | 'error' | 'info' }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const welcomeText = "Welcome to Sohanur Rahman's Portfolio"
  const { displayText: terminalText, isComplete } = useTypingEffect(welcomeText)

  // Command definitions
  const commandMap: Record<string, string> = {
    "home": "home",
    "about": "about",
    "experience": "experience",
    "projects": "projects",
    "education": "education",
    "skills": "skills",
    "contact": "contact",
    "~": "home",
  }

  // Handle terminal command
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    setCommandHistory(prev => [...prev, cmd].slice(-10))

    // Parse command
    if (trimmedCmd === "help" || trimmedCmd === "?") {
      setTerminalOutput(prev => [...prev,
      { text: `$ ${cmd}`, type: 'info' as const },
      { text: "Available commands:", type: 'success' as const },
      { text: "  cd [section]  - Navigate to section (home, about, experience, projects, education, skills, contact)", type: 'info' as const },
      { text: "  ls            - List all sections", type: 'info' as const },
      { text: "  whoami        - Show info about me", type: 'info' as const },
      { text: "  clear         - Clear terminal output", type: 'info' as const },
      { text: "  help          - Show this help message", type: 'info' as const },
      ].slice(-15))
      return
    }

    if (trimmedCmd === "clear" || trimmedCmd === "cls") {
      setTerminalOutput([])
      return
    }

    if (trimmedCmd === "ls" || trimmedCmd === "dir") {
      setTerminalOutput(prev => [...prev,
      { text: `$ ${cmd}`, type: 'info' as const },
      { text: "📁 home/  📁 about/  📁 experience/  📁 projects/  📁 education/  📁 skills/  📁 contact/", type: 'success' as const },
      ].slice(-15))
      return
    }

    if (trimmedCmd === "whoami") {
      setTerminalOutput(prev => [...prev,
      { text: `$ ${cmd}`, type: 'info' as const },
      { text: "Sohanur Rahman - AI & ML Engineer | Full-Stack Developer", type: 'success' as const },
      ].slice(-15))
      return
    }

    // cd command
    if (trimmedCmd.startsWith("cd ")) {
      const target = trimmedCmd.replace("cd ", "").trim()
      const section = commandMap[target]
      if (section) {
        setCurrentSection(section)
        setTerminalOutput(prev => [...prev,
        { text: `$ ${cmd}`, type: 'info' as const },
        { text: `Navigated to ${section}`, type: 'success' as const },
        ].slice(-15))
      } else {
        setTerminalOutput(prev => [...prev,
        { text: `$ ${cmd}`, type: 'info' as const },
        { text: `Error: Directory '${target}' not found. Type 'ls' to see available sections.`, type: 'error' as const },
        ].slice(-15))
      }
      return
    }

    // Direct section navigation (just typing section name)
    if (commandMap[trimmedCmd]) {
      setCurrentSection(commandMap[trimmedCmd])
      setTerminalOutput(prev => [...prev,
      { text: `$ cd ${trimmedCmd}`, type: 'info' as const },
      { text: `Navigated to ${commandMap[trimmedCmd]}`, type: 'success' as const },
      ].slice(-15))
      return
    }

    // Unknown command
    setTerminalOutput(prev => [...prev,
    { text: `$ ${cmd}`, type: 'info' as const },
    { text: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`, type: 'error' as const },
    ].slice(-15))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && terminalInput.trim()) {
      handleCommand(terminalInput)
      setTerminalInput("")
    }
  }

  // Mouse tracking for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
    { id: "home", label: "HOME", icon: "🏠", command: "~" },
    { id: "about", label: "ABOUT", icon: "👤", command: "cat" },
    { id: "experience", label: "EXPERIENCE", icon: "💼", command: "ls" },
    { id: "projects", label: "PROJECTS", icon: "💻", command: "cd" },
    { id: "education", label: "EDUCATION", icon: "🎓", command: "log" },
    { id: "skills", label: "SKILLS", icon: "🏆", command: "run" },
    { id: "contact", label: "CONTACT", icon: "📧", command: "msg" },
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
      gradient: "from-purple-500 to-pink-500",
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
      gradient: "from-cyan-500 to-blue-500",
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
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-center lg:text-left">
              <div className="relative group">
                {/* Animated glow rings */}
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 via-cyan-500 to-green-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 animate-pulse transition-all duration-1000" />
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full opacity-50 group-hover:opacity-80 transition-all duration-500 animate-spin-slow" style={{ animationDuration: '8s' }} />
                <img
                  src="/software-engineer-portrait.png"
                  alt="Sohanur Rahman"
                  className="relative w-48 h-48 rounded-full border-4 border-green-400 shadow-2xl shadow-green-500/30 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400 object-cover"
                  loading="lazy"
                />
                {/* Status indicator */}
                <div className="absolute -bottom-2 -right-2 flex items-center gap-2 bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full border border-green-500/50">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isGlitching ? "from-cyan-400 to-blue-500" : "from-green-400 via-emerald-400 to-cyan-400"} transition-all duration-300`}>
                  {terminalText}
                  {showCursor && !isComplete && <span className="text-green-400 animate-pulse">_</span>}
                </h1>

                <div className="flex items-center gap-2 text-cyan-400 font-mono text-lg">
                  <span className="text-green-500">❯</span>
                  <span className="typing-container">whoami</span>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl text-gray-200 font-semibold">Sohanur Rahman</p>
                  <p className="text-lg text-gray-400">
                    <span className="text-green-400">AI & ML Engineer</span> •
                    <span className="text-cyan-400"> Full-Stack Developer</span> •
                    <span className="text-purple-400"> Competitive Programmer</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                  {[
                    { icon: "⚡", text: "Software Engineer", color: "text-yellow-400" },
                    { icon: "🚀", text: "AI Enthusiast", color: "text-cyan-400" },
                    { icon: "🎯", text: "Problem Solver", color: "text-green-400" },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-full hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                      <span>{badge.icon}</span>
                      <span className={`text-sm ${badge.color}`}>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <GlowCard className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { value: stats.projects, label: "Major Projects", icon: "🚀", gradient: "from-green-400 to-emerald-500" },
                  { value: stats.problems, label: "Problems Solved", icon: "🧩", gradient: "from-cyan-400 to-blue-500" },
                  { value: stats.technologies, label: "Technologies", icon: "⚙️", gradient: "from-purple-400 to-pink-500" },
                ].map((stat, idx) => (
                  <div key={idx} className="group text-center p-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                      {stat.value}+
                    </div>
                    <div className="text-lg text-gray-400 mt-1">{stat.label}</div>
                    <div className="w-full bg-gray-700/50 rounded-full h-1 mt-3 overflow-hidden">
                      <div className={`h-1 rounded-full bg-gradient-to-r ${stat.gradient} animate-pulse`} style={{ width: "100%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Terminal History */}
            <GlowCard className="p-4">
              <div className="font-mono text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-500 text-xs">terminal ~ recent commands</span>
                </div>
                {commandHistory.slice(-4).map((cmd, idx) => (
                  <div key={idx} className="py-1 hover:bg-gray-800/30 px-2 rounded transition-colors">
                    <span className="text-green-400">sohanur@portfolio</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-gray-400">$ </span>
                    <span className="text-gray-300">{cmd}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        )

      case "about":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500 text-2xl">❯</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                cat about.txt
              </h2>
            </div>

            <GlowCard className="p-6 group">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Passionate <span className="text-green-400 font-semibold">Software Engineer</span> with expertise in{" "}
                  <span className="text-cyan-400">AI</span>, <span className="text-purple-400">machine learning</span>, and{" "}
                  <span className="text-pink-400">full-stack development</span>.
                  Currently at <span className="text-green-400 font-semibold">BJIT Limited</span>, building innovative solutions with a focus on performance and scalability.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                      <span>📋</span> Personal Info
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: "📧", text: "sohanurrahman621@gmail.com", link: "mailto:sohanurrahman621@gmail.com" },
                        { icon: "📱", text: "+8801879957329", link: "tel:+8801879957329" },
                        { icon: "📍", text: "Mohakhali, Dhaka" },
                        { icon: "🐙", text: "SoRaS20", link: "https://github.com/SoRaS20" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group/item">
                          <span className="text-lg">{item.icon}</span>
                          {item.link ? (
                            <a href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                              className="text-gray-300 hover:text-cyan-400 transition-colors">
                              {item.text}
                            </a>
                          ) : (
                            <span className="text-gray-300">{item.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                      <span>⚔️</span> Competitive Programming
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Codeforces", handle: "TheEnd", url: "https://codeforces.com/profile/TheEnd", color: "text-red-400" },
                        { name: "LeetCode", handle: "SoRaS_20", url: "https://leetcode.com/SoRaS_20", color: "text-yellow-400" },
                        { name: "Vjudge", handle: "lazy_coder0", url: "https://vjudge.net/user/lazy_coder0", color: "text-blue-400" },
                        { name: "StopStalk", handle: "SoRaS", url: "https://www.stopstalk.com/user/profile/SoRaS", color: "text-purple-400" },
                      ].map((profile, idx) => (
                        <a key={idx} href={profile.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group/link">
                          <span className={`font-medium ${profile.color}`}>{profile.name}</span>
                          <span className="text-gray-500">→</span>
                          <span className="text-gray-400 group-hover/link:text-cyan-400 transition-colors">{profile.handle}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        )

      case "experience":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500 text-2xl">❯</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                ls -la experience/
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 to-purple-500" />

              {[
                {
                  title: "Trainee Software Engineer",
                  company: "BJIT Limited",
                  period: "Nov 2024 – Feb 2025",
                  icon: "💼",
                  color: "green",
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
                  icon: "🔬",
                  color: "cyan",
                  tasks: [
                    "Developed efficient crack detection system leveraging VGG-16 and transfer learning",
                    "Collected and processed dataset of 6000+ images for crack classification",
                    "Fine-tuned CNN models to achieve high accuracy in detecting building cracks",
                    "Used Python, TensorFlow, Keras, and OpenCV for deep learning implementation",
                  ],
                },
              ].map((exp, idx) => (
                <div key={idx} className="relative pl-20 pb-8 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  <GlowCard className="p-6 group hover:scale-[1.02] transition-transform duration-300" glowColor={exp.color}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                          <span>{exp.icon}</span> {exp.title}
                        </h3>
                        <p className="text-lg text-green-400">{exp.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/80 rounded-full text-sm text-gray-300 border border-gray-700/50">
                        <span>📅</span> {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 group/task">
                          <span className="text-green-400 mt-1 group-hover/task:text-cyan-400 transition-colors">▹</span>
                          <span className="group-hover/task:text-gray-200 transition-colors">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        )

      case "projects":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500 text-2xl">❯</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                cd projects && ls
              </h2>
            </div>

            <div className="grid gap-6">
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <GlowCard className="p-6 hover:scale-[1.01] transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                          💻
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-cyan-400 group-hover:text-green-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{project.description}</p>
                        </div>
                      </div>
                      <span className="text-2xl opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <span>✨</span> Key Features
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="text-cyan-400">•</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </a>
              ))}
            </div>
          </div>
        )

      case "education":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500 text-2xl">❯</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                cat education.log
              </h2>
            </div>

            {/* Degree */}
            <GlowCard className="p-6 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      B.Sc. in Information and Communication Engineering
                    </h3>
                    <p className="text-lg text-green-400">Noakhali Science and Technology University</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/80 rounded-full text-sm text-gray-300 border border-gray-700/50">
                  <span>📅</span> Jan 2019 – May 2024
                </span>
              </div>
              {/* <div className="flex items-center gap-2 text-lg">
                <span className="text-green-400 font-bold">CGPA:</span>
                <span className="text-gray-300">3.38/4.00</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded text-yellow-400 text-sm">
                  with honors
                </span>
              </div> */}
            </GlowCard>

            {/* Certifications */}
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span>🏆</span> Certifications
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "🎖️", title: "Trainee Software Engineer (AI)", org: "BJIT LTD." },
                  { icon: "🏭", title: "Industrial Attachment", org: "BJIT LTD." },
                  { icon: "💾", title: "SQL Certification", org: "HackerRank" },
                ].map((cert, idx) => (
                  <div key={idx} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group/cert">
                    <span className="text-2xl block mb-2">{cert.icon}</span>
                    <h4 className="font-medium text-gray-200 group-hover/cert:text-purple-400 transition-colors">{cert.title}</h4>
                    <p className="text-sm text-gray-500">{cert.org}</p>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Competitive Programming Achievements */}
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span>⚔️</span> Competitive Programming Achievements
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🏅", text: "Problem Setter - ICE TECHCOMBAT Programming Contest 2023, NSTU", type: "setter" },
                  { icon: "🏅", text: "Problem Setter - ICE 6th Batch Farewell Programming Contest 2023, NSTU", type: "setter" },
                  { icon: "🎯", text: "Contestant - CUET Inter University Programming Contest 2024", type: "contestant" },
                  { icon: "🎯", text: "ICPC Asia Dhaka Regional Site Online Preliminary 2022, 2023", type: "contestant" },
                  { icon: "🥉", text: "4th Place - Intra NSTU Programming Contest 2023", type: "achievement" },
                  { icon: "🏆", text: "12th Place - Intra NSTU Programming Contest 2022", type: "achievement" },
                ].map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group/ach">
                    <span className="text-lg">{achievement.icon}</span>
                    <span className="text-gray-300 group-hover/ach:text-gray-200 transition-colors">{achievement.text}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500 text-2xl">❯</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                ./skills --list
              </h2>
            </div>

            {/* Proficiency Levels */}
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <span>📊</span> Proficiency Levels
              </h3>
              <div className="grid gap-8 md:grid-cols-2">
                {Object.entries(skillsWithLevels).map(([category, skillList]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="font-bold text-green-400 pb-2 border-b border-gray-700/50">{category}</h4>
                    <div className="space-y-4">
                      {skillList.map((skill, idx) => (
                        <AnimatedSkillBar key={idx} skill={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Skill Tags */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(skills).map(([category, skillList]) => (
                <GlowCard key={category} className="p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h3 className="text-lg font-bold text-cyan-400 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm rounded-lg bg-gray-800/80 text-gray-300 border border-gray-700/50 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/10 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500 text-2xl">❯</span>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                contact --info
              </h2>
            </div>

            <GlowCard className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                    <span>📬</span> Get In Touch
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: "📧", text: "sohanurrahman621@gmail.com", link: "mailto:sohanurrahman621@gmail.com", hoverColor: "hover:text-red-400" },
                      { icon: "📱", text: "+8801879957329", link: "tel:+8801879957329", hoverColor: "hover:text-green-400" },
                      { icon: "📍", text: "Mohakhali, Dhaka, Bangladesh", link: null, color: "text-cyan-400" },
                      { icon: "🐙", text: "github.com/SoRaS20", link: "https://github.com/SoRaS20", hoverColor: "hover:text-purple-400" },
                    ].map((item, idx) =>
                      item.link ? (
                        <a
                          key={idx}
                          href={item.link}
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer ${item.hoverColor}`}
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                          <span className="text-gray-300 transition-colors underline-offset-4 hover:underline">{item.text}</span>
                          <span className="ml-auto text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all">→</span>
                        </a>
                      ) : (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3 rounded-xl transition-all duration-300"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className={item.color}>{item.text}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                    <span>💻</span> Coding Profiles
                  </h3>
                  <div className="grid gap-3">
                    {[
                      { name: "Codeforces", handle: "TheEnd", url: "https://codeforces.com/profile/TheEnd", icon: "⚔️", color: "from-red-500 to-red-600" },
                      { name: "LeetCode", handle: "SoRaS_20", url: "https://leetcode.com/SoRaS_20", icon: "🧩", color: "from-yellow-500 to-orange-500" },
                      { name: "Vjudge", handle: "lazy_coder0", url: "https://vjudge.net/user/lazy_coder0", icon: "⚖️", color: "from-blue-500 to-blue-600" },
                      { name: "StopStalk", handle: "SoRaS", url: "https://www.stopstalk.com/user/profile/SoRaS", icon: "📊", color: "from-purple-500 to-purple-600" },
                    ].map((profile, idx) => (
                      <a
                        key={idx}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${profile.color} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                          {profile.icon}
                        </div>
                        <div>
                          <span className="block text-gray-200 font-medium group-hover:text-green-400 transition-colors">{profile.name}</span>
                          <span className="text-sm text-gray-500">@{profile.handle}</span>
                        </div>
                        <span className="ml-auto text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Fun Fact */}
            <div className="text-center p-6 bg-gradient-to-r from-gray-800/50 via-gray-800/80 to-gray-800/50 rounded-2xl border border-gray-700/50">
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <span className="text-2xl">💡</span>
                <span>Fun Fact:</span>
                <span className="text-green-400 font-bold">Solved 1000+ algorithmic problems</span>
                <span>across multiple platforms!</span>
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-gray-400 py-20">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold mb-4">Section Under Construction</h2>
            <p>This section is being built. Please check back soon!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* Background effects */}
      <MatrixRain />
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Terminal Command Bar */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Terminal window controls */}
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" onClick={() => setTerminalOutput([])} title="Clear output" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            {/* Terminal input */}
            <div className="flex-1 flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/50 focus-within:border-green-500/50 transition-colors">
              <span className="text-green-400 shrink-0">sohanur@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help' for commands..."
                className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 font-mono"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="text-gray-500 text-xs shrink-0 hidden sm:block">Press Enter ↵</span>
            </div>
          </div>

          {/* Terminal output */}
          {terminalOutput.length > 0 && (
            <div className="mt-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 max-h-32 overflow-y-auto font-mono text-sm">
              {terminalOutput.map((line, idx) => (
                <div
                  key={idx}
                  className={`${line.type === 'error' ? 'text-red-400' :
                    line.type === 'success' ? 'text-green-400' :
                      'text-gray-400'
                    }`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row relative z-10">
        {/* Navigation */}
        <nav
          className="w-full md:w-72 bg-gray-900/80 backdrop-blur-xl border-b md:border-r border-gray-700/50 p-4 md:min-h-screen md:sticky md:top-0"
          aria-label="Main navigation"
        >
          <div className="space-y-2">
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-4 mb-6 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-800/30 border border-gray-700/30">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-xl">
                🖥️
              </div>
              <div>
                <div className="text-sm font-bold text-green-400">TERMINAL</div>
                <div className="text-xs text-gray-500">PORTFOLIO.EXE</div>
              </div>
            </div>

            {/* Nav items */}
            {sections.map((section) => (
              <button
                key={section.id}
                className={`w-full flex items-center gap-3 font-mono py-3 px-4 rounded-xl transition-all duration-300 group
                  ${currentSection === section.id
                    ? "bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/10"
                    : "text-gray-400 hover:text-green-400 hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50"
                  }`}
                onClick={() => setCurrentSection(section.id)}
                aria-current={currentSection === section.id ? "page" : undefined}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{section.icon}</span>
                <span className="flex-1 text-left">{section.label}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${currentSection === section.id ? 'bg-green-500/20 text-green-400' : 'text-gray-600'}`}>
                  {section.command}
                </span>
              </button>
            ))}


          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 bg-transparent" aria-live="polite">
          <div className="max-w-5xl mx-auto">{renderSection()}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/50 p-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-green-400">sohanur@portfolio</span>
            <span className="text-gray-600">:</span>
            <span className="text-cyan-400">~</span>
            <span>$</span>
            <span className="text-gray-300">Built with</span>
            <span className="text-red-400">♥</span>
            <span className="text-gray-300">using React & Tailwind</span>
            <span className="text-green-400 animate-pulse">_</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <span>© 2024 Sohanur Rahman</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
