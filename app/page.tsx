"use client"

import { useState, useEffect, useRef } from "react"
import { Github, Mail, ExternalLink, Menu, X, MapPin, Phone, ChevronRight, Code2, Cpu, Globe, Wrench, ArrowUpRight, Linkedin } from "lucide-react"

/* ── Scroll Reveal Hook ─────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    )
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ── Animated Counter ───────────────────────────────── */
function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = Math.ceil(to / 60)
      const t = setInterval(() => {
        start = Math.min(start + step, to)
        setVal(start)
        if (start >= to) clearInterval(t)
      }, 24)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── Navbar ─────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])
  const links = ["About", "Skills", "Projects", "Experience", "Contact"]
  const scrollTo = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false) }
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 backdrop-blur-xl bg-[rgba(5,5,15,0.85)] border-b border-white/5 shadow-xl shadow-black/20" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">SR</div>
          <span className="font-semibold text-white/90 hidden sm:block">Sohanur Rahman</span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => <button key={l} onClick={() => scrollTo(l)} className="nav-link">{l}</button>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/SoRaS20" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/90 transition-colors p-1.5"><Github size={18} /></a>
          <a href="https://mail.google.com/mail/?view=cm&to=sohanurrahman621@gmail.com&su=Hire%20Inquiry" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4">Hire Me</a>
        </div>
        <button className="md:hidden text-white/70 hover:text-white p-1" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/8 py-4 px-6 flex flex-col gap-3">
          {links.map(l => <button key={l} onClick={() => scrollTo(l)} className="text-white/70 hover:text-white text-left py-2 text-base font-medium transition-colors">{l}</button>)}
          <a href="https://mail.google.com/mail/?view=cm&to=sohanurrahman621@gmail.com&su=Hire%20Inquiry" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5 text-center mt-2">Hire Me</a>
        </div>
      )}
    </header>
  )
}

/* ── Orb Background ─────────────────────────────────── */
function OrbBg() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="animate-orb-pulse absolute -top-48 -left-32 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)" }} />
      <div className="animate-orb-pulse-2 absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.17) 0%, transparent 70%)" }} />
      <div className="animate-orb-pulse-3 absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
    </div>
  )
}

/* ── Hero Section ───────────────────────────────────── */
function Hero() {
  const [role, setRole] = useState(0)
  const roles = ["AI & ML Engineer", "Full-Stack Developer", "Competitive Programmer", "Problem Solver"]
  useEffect(() => {
    const t = setInterval(() => setRole(r => (r + 1) % roles.length), 3000)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-indigo-300 border border-indigo-500/30 bg-indigo-500/8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-dot-blink" />
              Available for work
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
                Hi, I&apos;m{" "}
                <span className="gradient-text">Sohanur</span>
                <br />Rahman
              </h1>
            </div>
            <div className="h-9 overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              <p className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 transition-all duration-500 ease-in-out">
                {roles[role]}
              </p>
            </div>
            <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              Building intelligent, high-performance solutions at the intersection of AI and modern software engineering. Passionate about turning complex problems into elegant products.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary">
                View Projects <ChevronRight size={16} />
              </button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline">
                Contact Me <Mail size={15} />
              </button>
            </div>
            {/* Stats row */}
            <div className="flex gap-8 justify-center lg:justify-start pt-2 animate-fade-in" style={{ animationDelay: "0.55s", animationFillMode: "both" }}>
              {[{ n: 5, label: "Projects" }, { n: 1000, label: "Problems Solved" }, { n: 15, label: "Technologies" }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold gradient-text"><Counter to={s.n} /></div>
                  <div className="text-xs text-white/40 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Avatar */}
          <div className="relative flex-shrink-0 animate-scale-in" style={{ animationDelay: "0.25s", animationFillMode: "both" }}>
            <div className="avatar-ring w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full relative animate-float" style={{ animationDuration: "9s" }}>
              <img src="/software-engineer-portrait.png" alt="Sohanur Rahman" className="w-full h-full rounded-full object-cover border-2 border-white/10" loading="eager" />
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-white/10 whitespace-nowrap shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-dot-blink flex-shrink-0" />
              <span className="text-xs font-medium text-white/80">Open to opportunities</span>
            </div>
            {/* Floating badge 1 */}
            <div className="absolute -top-4 -right-6 sm:-right-10 glass px-3 py-2 rounded-xl border border-white/10 shadow-xl animate-float" style={{ animationDelay: "2s", animationDuration: "11s" }}>
              <div className="text-2xl">🤖</div>
              <div className="text-[10px] text-white/60 font-medium mt-0.5">AI/ML</div>
            </div>
            {/* Floating badge 2 */}
            <div className="absolute -bottom-6 -left-4 sm:-left-10 glass px-3 py-2 rounded-xl border border-white/10 shadow-xl animate-float" style={{ animationDelay: "4s", animationDuration: "13s" }}>
              <div className="text-2xl">⚡</div>
              <div className="text-[10px] text-white/60 font-medium mt-0.5">Next.js</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── About Section ──────────────────────────────────── */
function About() {
  const contactLinks = [
    { icon: <Mail size={15} />, text: "sohanurrahman621@gmail.com", href: "mailto:sohanurrahman621@gmail.com" },
    { icon: <Phone size={15} />, text: "+880 1879-957329", href: "tel:+8801879957329" },
    { icon: <MapPin size={15} />, text: "Mohakhali, Dhaka, Bangladesh", href: null },
    { icon: <Github size={15} />, text: "github.com/SoRaS20", href: "https://github.com/SoRaS20" },
  ]
  const cpProfiles = [
    { name: "Codeforces", handle: "TheEnd", url: "https://codeforces.com/profile/TheEnd", color: "text-red-400" },
    { name: "LeetCode", handle: "SoRaS_20", url: "https://leetcode.com/SoRaS_20", color: "text-amber-400" },
    { name: "Vjudge", handle: "lazy_coder0", url: "https://vjudge.net/user/lazy_coder0", color: "text-blue-400" },
    { name: "StopStalk", handle: "SoRaS", url: "https://www.stopstalk.com/user/profile/SoRaS", color: "text-violet-400" },
  ]
  return (
    <section id="about" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-label justify-center"><span>About Me</span></div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">My <span className="gradient-text">Story</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bio card */}
          <div className="glass-card p-8 reveal reveal-delay-1">
            <h3 className="text-lg font-semibold text-white mb-5">Who I Am</h3>
            <p className="text-white/60 leading-relaxed mb-5">
              I&apos;m a passionate <span className="text-indigo-300 font-medium">Software Engineer</span> specializing in AI, machine learning, and full-stack development. Currently at{" "}
              <span className="text-violet-300 font-medium">Nazihar IT Solution Ltd.</span>, I&apos;m building a secure digital onboarding platform for banks — featuring automated KYC verification, dynamic workflow management, and the <span className="text-blue-300 font-medium">12iD eKYC platform</span> integrated with banking and online services.
            </p>
            <p className="text-white/60 leading-relaxed mb-7">
              With a B.Sc. in Information and Communication Engineering from <span className="text-blue-300 font-medium">NSTU</span> and a deep love for competitive programming (1000+ problems solved), I thrive at the intersection of AI research and real-world software engineering.
            </p>
            <div className="space-y-3">
              {contactLinks.map((c, i) => (
                c.href ? (
                  <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white/90 group transition-colors">
                    <span className="text-indigo-400 group-hover:text-violet-400 transition-colors">{c.icon}</span>
                    <span className="group-hover:underline underline-offset-2">{c.text}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </a>
                ) : (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/50">
                    <span className="text-indigo-400">{c.icon}</span>
                    <span>{c.text}</span>
                  </div>
                )
              ))}
            </div>
          </div>
          {/* CP profiles + education */}
          <div className="space-y-6">
            <div className="glass-card p-8 reveal reveal-delay-2">
              <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <Code2 size={18} className="text-indigo-400" /> Competitive Programming
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cpProfiles.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 p-3 rounded-xl bg-white/3 hover:bg-white/7 border border-white/5 hover:border-indigo-500/30 transition-all duration-250">
                    <div>
                      <div className={`text-sm font-semibold ${p.color}`}>{p.name}</div>
                      <div className="text-xs text-white/35 group-hover:text-white/60 transition-colors">@{p.handle}</div>
                    </div>
                    <ArrowUpRight size={13} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <div className="glass-card p-8 reveal reveal-delay-3">
              <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-indigo-500/25">🎓</div>
                <div>
                  <h4 className="font-semibold text-white/90 text-sm leading-snug">B.Sc. in Information & Communication Engineering</h4>
                  <p className="text-indigo-300 text-sm mt-1">Noakhali Science & Technology University</p>
                  <p className="text-white/35 text-xs mt-1.5">Jan 2019 – May 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Skills Section ─────────────────────────────────── */
const ALL_SKILLS = {
  "AI / ML": { icon: <Cpu size={18} />, items: ["Python", "TensorFlow", "Keras", "Scikit-learn", "NLP", "Deep Learning", "CNNs", "RNNs", "GANs", "RAG", "BERT", "GPT", "CLIP", "ChromaDB", "Computer Vision"] },
  "Backend": { icon: <Code2 size={18} />, items: ["Java", "Spring Boot", "FastAPI", "REST APIs", "SQL", "PostgreSQL", "MySQL", "MongoDB", "Docker", "Jenkins", "Kubernetes", "C", "C++"] },
  "Frontend": { icon: <Globe size={18} />, items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Responsive Design"] },
  "Tools": { icon: <Wrench size={18} />, items: ["Git", "GitHub", "Linux", "VS Code", "Google Colab", "Redmine", "Agile / Scrum"] },
}

function Skills() {
  const [active, setActive] = useState("AI / ML")
  const cats = Object.keys(ALL_SKILLS) as (keyof typeof ALL_SKILLS)[]
  return (
    <section id="skills" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-label justify-center"><span>Expertise</span></div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Skills &amp; <span className="gradient-text">Stack</span></h2>
        </div>
        {/* Category tabs */}
        <div className="reveal reveal-delay-1 flex flex-wrap gap-2 justify-center mb-10">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 ${active === c
                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 border border-white/15"
                : "glass-card text-white/55 hover:text-white/90 border border-white/5"}`}>
              <span className={active === c ? "text-white" : "text-indigo-400"}>{ALL_SKILLS[c].icon}</span>
              {c}
            </button>
          ))}
        </div>
        {/* Skill grid */}
        <div className="reveal reveal-delay-2 flex flex-wrap gap-3 justify-center">
          {ALL_SKILLS[active as keyof typeof ALL_SKILLS].items.map((s, i) => (
            <span key={i} className="skill-badge" style={{ animationDelay: `${i * 0.05}s` }}>{s}</span>
          ))}
        </div>
        {/* Quick prowess cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {[
            { label: "AI / ML", desc: "Deep learning, NLP, RAG systems, computer vision", icon: "🧠", color: "from-violet-500/20 to-indigo-500/20" },
            { label: "Backend", desc: "Scalable APIs, microservices, databases, DevOps", icon: "⚙️", color: "from-blue-500/20 to-cyan-500/20" },
            { label: "Frontend", desc: "React, Next.js, responsive & accessible UIs", icon: "🎨", color: "from-pink-500/20 to-violet-500/20" },
            { label: "Problem Solving", desc: "1000+ competitive programming solutions", icon: "🎯", color: "from-amber-500/20 to-orange-500/20" },
          ].map((c, i) => (
            <div key={i} className={`glass-card p-6 reveal reveal-delay-${i + 1}`}>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl mb-4 border border-white/8`}>{c.icon}</div>
              <h4 className="font-semibold text-white/90 mb-1.5">{c.label}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Projects Section ───────────────────────────────── */
function Projects() {
  const projects = [
    { title: "Conversational Memory Bot", desc: "AI-powered photo gallery assistant with advanced NLP and visual understanding. Natural language photo searches, context-aware retrieval, and automatic tagging.", tech: ["Python", "Next.js", "Gemini LLM", "CLIP", "ChromaDB", "RAG"], href: "https://github.com/SoRaS20/Conversational-Memory-Bot", gradient: "from-violet-500 to-purple-600", emoji: "🤖" },
    { title: "Smile Classifier", desc: "AI-driven image classification system with a responsive UI and scalable RESTful API. Dockerized deployment for production-ready performance.", tech: ["Next.js", "Python", "FastAPI", "Scikit-learn", "MySQL", "Docker"], href: "https://github.com/SoRaS20/Smile-Classifier", gradient: "from-blue-500 to-cyan-600", emoji: "😊" },
    { title: "Building Crack Detection", desc: "Deep learning system for detecting structural cracks using transfer learning on VGG-16 with a 6000+ image dataset and high accuracy.", tech: ["Python", "TensorFlow", "Keras", "VGG-16", "OpenCV", "CNN"], href: "https://github.com/SoRaS20/Building-Crack-Detection", gradient: "from-emerald-500 to-teal-600", emoji: "🏗️" },
  ]
  return (
    <section id="projects" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-label justify-center"><span>Work</span></div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Featured <span className="gradient-text">Projects</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
              className={`glass-card group flex flex-col p-7 hover-lift reveal reveal-delay-${i + 1}`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-13 h-13 w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>{p.emoji}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10">
                    <Github size={14} />
                  </div>
                  <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white/90 group-hover:text-white mb-2.5 transition-colors">{p.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>
              {/* Shimmer line on hover */}
              <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${p.gradient} mb-5 opacity-40 group-hover:opacity-80 transition-opacity relative overflow-hidden`}>
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
        <div className="reveal reveal-delay-4 text-center mt-10">
          <a href="https://github.com/SoRaS20" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex">
            <Github size={16} /> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Experience Section ─────────────────────────────── */
function Experience() {
  const items = [
    {
      role: "Software Engineer", company: "Nazihar IT Solution Ltd.", period: "Feb 2025 – Present", icon: "🚀", current: true,
      points: [
        "Collaborating in the design and development of a secure and configurable digital onboarding platform for banks, enabling automated KYC verification and dynamic workflow management",
        "Building a scalable API-driven architecture using Spring Boot and relational database design",
        "Working on the 12iD (Digital Identity & eKYC platform) — a secure mobile identity solution integrated with banking and online services",
      ],
    },
    {
      role: "Trainee Software Engineer (AI)", company: "BJIT Limited", period: "Nov 2024 – Feb 2025", icon: "💼",
      points: ["Gained hands-on experience in AI, web development, and REST APIs", "Worked on Python & FastAPI for scalable backend solutions", "Practiced Agile development using Git, GitHub, and Redmine", "Strengthened skills in OOP, DSA, and problem-solving techniques", "Familiar with automating CI/CD using Docker, Jenkins, and Kubernetes"],
    },
    {
      role: "Undergraduate Researcher", company: "Noakhali Science & Technology University", period: "Mar 2023 – Feb 2024", icon: "🔬",
      points: ["Developed a crack detection system leveraging VGG-16 and transfer learning", "Collected and processed a dataset of 6000+ images", "Fine-tuned CNN models to achieve high accuracy in crack classification", "Used Python, TensorFlow, Keras, and OpenCV for implementation"],
    },
  ]
  const certs = [
    { icon: "🎖️", title: "Trainee Software Engineer (AI)", org: "BJIT Ltd." },
    { icon: "🏭", title: "Industrial Attachment", org: "BJIT Ltd." },
    { icon: "💾", title: "SQL Certification", org: "HackerRank" },
  ]
  return (
    <section id="experience" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-label justify-center"><span>Journey</span></div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience &amp; <span className="gradient-text">Timeline</span></h2>
        </div>
        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[22px] top-4 bottom-4 w-0.5 timeline-line rounded-full" />
          <div className="space-y-10">
            {items.map((exp, i) => (
              <div key={i} className={`relative pl-14 reveal reveal-delay-${i + 1}`}>
                <div className={`timeline-dot absolute left-3 top-5 ${(exp as any).current ? "shadow-[0_0_12px_4px_rgba(99,102,241,0.7)]" : ""}`} />
                <div className={`glass-card p-7 ${(exp as any).current ? "border-indigo-500/30" : ""}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{exp.icon}</span>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="font-bold text-white text-base">{exp.role}</h3>
                          {(exp as any).current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-dot-blink flex-shrink-0" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-indigo-300 text-sm font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <span className="glass px-3.5 py-1.5 rounded-full text-xs text-white/50 border border-white/8 whitespace-nowrap flex-shrink-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-white/55 group/li hover:text-white/75 transition-colors">
                        <ChevronRight size={14} className="flex-shrink-0 mt-0.5 text-indigo-400 group-hover/li:text-violet-400 transition-colors" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
        {/* Certifications */}
        <div className="mt-16 reveal">
          <h3 className="text-xl font-bold text-white text-center mb-7">Certifications</h3>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {certs.map((c, i) => (
              <div key={i} className={`glass-card p-6 text-center reveal reveal-delay-${i + 1}`}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 className="text-sm font-semibold text-white/85 mb-1">{c.title}</h4>
                <p className="text-xs text-indigo-300">{c.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact Section ────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:sohanurrahman621@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}\n\nFrom: ${form.email}`
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }
  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/SoRaS20", label: "GitHub" },
    { icon: <Mail size={20} />, href: "mailto:sohanurrahman621@gmail.com", label: "Email" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/sohanurrahman", label: "LinkedIn" },
    { icon: <ExternalLink size={20} />, href: "https://leetcode.com/SoRaS_20", label: "LeetCode" },
  ]
  return (
    <section id="contact" className="py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <div className="section-label justify-center"><span>Get In Touch</span></div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Let&apos;s <span className="gradient-text">Connect</span></h2>
          <p className="text-white/45 mt-4 max-w-lg mx-auto text-base leading-relaxed">
            Whether you have a project idea, a job opportunity, or just want to say hi — my inbox is always open.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5 reveal reveal-delay-1">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Name</label>
              <input required className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Email</label>
              <input required type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Message</label>
              <textarea required rows={4} className="form-input resize-none" placeholder="Tell me about your project or idea..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              {sent ? "✅ Sent! Check your email client" : <><Mail size={16} /> Send Message</>}
            </button>
          </form>
          {/* Info */}
          <div className="space-y-6 reveal reveal-delay-2">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-5">Direct Contact</h3>
              <div className="space-y-4">
                {[
                  { label: "Email", val: "sohanurrahman621@gmail.com", href: "mailto:sohanurrahman621@gmail.com" },
                  { label: "Phone", val: "+880 1879-957329", href: "tel:+8801879957329" },
                  { label: "Location", val: "Mohakhali, Dhaka, Bangladesh", href: null },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-xs text-white/35 uppercase tracking-wider font-semibold mb-1">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="text-indigo-300 hover:text-violet-300 transition-colors text-sm font-medium">{item.val}</a>
                      : <p className="text-white/60 text-sm">{item.val}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Find Me On</h3>
              <div className="flex gap-3 flex-wrap">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-white/8 text-white/50 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all text-sm font-medium">
                    {s.icon}{s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">SR</div>
          <span>Sohanur Rahman</span>
        </div>
        {/* <p>Built with <span className="text-rose-400">♥</span> using Next.js &amp; Tailwind CSS</p> */}
        <p>© 2026 — All rights reserved</p>
      </div>
    </footer>
  )
}

/* ── Root Page ──────────────────────────────────────── */
export default function Portfolio() {
  useScrollReveal()
  return (
    <div className="relative min-h-screen">
      <OrbBg />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
