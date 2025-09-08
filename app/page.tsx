"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  ExternalLink,
  Code,
  Award,
  GraduationCap,
  Briefcase,
  User,
  Terminal,
} from "lucide-react"

// Define interfaces for type safety
interface Project {
  title: string
  description: string
  technologies: string[]
  features: string[]
  link: string
}

interface SkillCategory {
  [category: string]: string[]
}

// Main Portfolio component
export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const welcomeText = "Welcome to Sohanur Rahman's Portfolio"

  // Typing effect for welcome text
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < welcomeText.length) {
        setTerminalText(welcomeText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  // Navigation sections
  const sections = [
    { id: "home", label: "> HOME", icon: Terminal },
    { id: "about", label: "> ABOUT", icon: User },
    { id: "experience", label: "> EXPERIENCE", icon: Briefcase },
    { id: "projects", label: "> PROJECTS", icon: Code },
    { id: "education", label: "> EDUCATION", icon: GraduationCap },
    { id: "skills", label: "> SKILLS", icon: Award },
    { id: "contact", label: "> CONTACT", icon: Mail },
  ]

  // Skills data
  const skills: SkillCategory = {
    "Programming Languages": ["Java", "C", "C++", "Python", "JavaScript"],
    "Web Technologies": ["HTML", "CSS", "FastAPI", "Spring Boot"],
    "Frameworks & Libraries": ["Scikit-learn", "Pandas", "NumPy", "TensorFlow", "Keras"],
    Databases: ["MySQL", "PostgreSQL"],
    "AI/ML": ["NLP", "Deep Learning", "CNNs", "RNNs", "GANs", "RAG", "BERT", "GPT"],
    Tools: ["Git", "GitHub", "Docker", "Jenkins", "Kubernetes", "Google Colab"],
  }

  // Projects data
  const projects: Project[] = [
    {
      title: "Conversational Memory Bot",
      description: "AI-Powered Photo Gallery Assistant with natural language querying and visual understanding",
      technologies: ["Python", "FastAPI", "Gemini LLM", "CLIP", "ChromaDB", "RAG", "Multimodal AI"],
      features: [
        "Natural language photo searches",
        "Contextual image retrieval",
        "Visual similarity search",
        "Automatic image tagging",
      ],
      link: "https://github.com/SoRaS20/Conversational-Memory-Bot",
    },
    {
      title: "Smile Classifier",
      description: "AI-Powered Image Classification System using FastAPI and pre-trained SVM model",
      technologies: ["FastAPI", "Python", "Scikit-learn", "SQLAlchemy", "MySQL", "Docker"],
      features: [
        "Real-time image classification",
        "RESTful API design",
        "Docker containerization",
        "Responsive web interface",
      ],
      link: "https://github.com/SoRaS20/Smile-Classifier",
    },
    {
      title: "Building Crack Detection",
      description: "Deep Learning system for detecting cracks in building structures using VGG-16",
      technologies: ["Python", "TensorFlow", "Keras", "VGG-16", "OpenCV", "CNN"],
      features: [
        "Transfer learning implementation",
        "6000+ image dataset processing",
        "High accuracy crack detection",
        "CNN model fine-tuning",
      ],
      link: "https://github.com/SoRaS20/Building-Crack-Detection",
    },
  ]

  // Render content based on current section
  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
              {/* Fixed-size image container to prevent animation impact */}
              <div className="flex-shrink-0">
                <Image
                  src="https://scontent.fdac31-2.fna.fbcdn.net/v/t39.30808-6/441185402_3782933102025158_3007996458605467232_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFSbQzxRLfrLrHO0zTRmzEPhEWX1tmC0ZqERZfW2YLRmmOt11r4Wy4oIPVbAoqou7EUQDddt-kUcE984qyEm6GG&_nc_ohc=xUwnIOz2oa0Q7kNvwH4KqZ3&_nc_oc=Adln3WXcptI2Gy5dP4i2sPorusLu8X1gczrQrkP7pYkagY9vxkJ0mTaHuMANQMyZS-g&_nc_zt=23&_nc_ht=scontent.fdac31-2.fna&_nc_gid=ANkAoTJ2l7kCG9VCzEm-Cg&oh=00_AfafUWnLruprhvOFpL387IWIbWPqxk3KcAnS4_-7eAujbg&oe=68C49162"
                  alt="Sohanur Rahman"
                  width={192} // Fixed width (48 * 4 for md size)
                  height={192} // Fixed height
                  className="border-4 border-primary"
                  priority
                />
              </div>
              <div className="space-y-4">
                <div className="text-4xl md:text-5xl font-bold font-mono">
                  {terminalText}
                  {showCursor && <span className="animate-blink">_</span>}
                </div>
                <div className="text-xl md:text-3xl text-accent">$ whoami</div>
                <div className="text-lg">Sohanur Rahman</div>
                <div className="text-2xl text-muted-foreground">
                  Specializing in AI, Machine Learning & Web Development
                </div>
              </div>
            </div>

            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">3+</div>
                  <div className="text-2xl">Major Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-2xl">Problems Solved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-2xl">Technologies</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case "about":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary">$ cat about.txt</h2>
            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                <p className="text-lg">
                  Passionate Trainee Software Engineer with hands-on experience in AI, web development, and machine
                  learning. Currently working at BJIT Limited, focusing on cutting-edge technologies and clean code
                  practices.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-2">Personal Info</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                        <a
                          href="mailto:sohanurrahman621@gmail.com"
                          className="hover:text-accent transition-colors"
                          aria-label="Email Sohanur Rahman"
                        >
                          sohanurrahman621@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                        <a
                          href="tel:+8801879957329"
                          className="hover:text-accent transition-colors"
                          aria-label="Call Sohanur Rahman"
                        >
                          +8801879957329
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                        <span>Mohakhali, Dhaka</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-primary" aria-hidden="true" />
                        <a
                          href="https://github.com/SoRaS20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                          aria-label="Visit Sohanur Rahman's GitHub profile"
                        >
                          SoRaS20
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-2">Competitive Programming</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        Codeforces:{" "}
                        <a
                          href="https://codeforces.com/profile/TheEnd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                          aria-label="Visit Sohanur Rahman's Codeforces profile"
                        >
                          TheEnd
                        </a>
                      </div>
                      <div>
                        LeetCode:{" "}
                        <a
                          href="https://leetcode.com/SoRaS_20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                          aria-label="Visit Sohanur Rahman's LeetCode profile"
                        >
                          SoRaS_20
                        </a>
                      </div>
                      <div>
                        Vjudge:{" "}
                        <a
                          href="https://vjudge.net/user/lazy_coder0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                          aria-label="Visit Sohanur Rahman's Vjudge profile"
                        >
                          lazy_coder0
                        </a>
                      </div>
                      <div>
                        StopStalk:{" "}
                        <a
                          href="https://www.stopstalk.com/user/profile/SoRaS"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                          aria-label="Visit Sohanur Rahman's StopStalk profile"
                        >
                          SoRaS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      case "experience":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary">$ ls -la experience/</h2>
            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-accent">Trainee Software Engineer</h3>
                    <p className="text-lg text-primary">BJIT Limited</p>
                  </div>
                  <Badge variant="secondary">Nov 2024 – Feb 2025</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Gained hands-on experience in AI, web development, and REST APIs</li>
                  <li>• Worked on projects using Python, FastAPI</li>
                  <li>• Practiced Agile development, using Git, GitHub, and Redmine</li>
                  <li>• Strengthened skills in OOP, DSA, and problem-solving</li>
                  <li>• Participated in code reviews, presentations, and technical discussions</li>
                  <li>• Improved skills in clean code writing and debugging</li>
                  <li>• Familiar with CI/CD using Docker, Jenkins, and Kubernetes</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-accent">Undergraduate Researcher</h3>
                    <p className="text-lg text-primary">NSTU</p>
                  </div>
                  <Badge variant="secondary">Mar 2023 – Feb 2024</Badge>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Building Crack Detection Using Deep Learning</h4>
                  <ul className="space-y-2 text-sm mt-2">
                    <li>• Developed efficient crack detection system using VGG-16 and transfer learning</li>
                    <li>• Processed dataset of 6000 images for crack classification</li>
                    <li>• Fine-tuned CNN models achieving high accuracy</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )

      case "projects":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary">$ cd projects && ls</h2>
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:no-underline"
                  aria-label={`View ${project.title} project`}
                >
                  <Card className="p-6 bg-card border-primary hover:border-accent transition-all duration-300 hover:shadow-lg">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-accent">{project.title}</h3>
                        <ExternalLink className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <p className="text-sm">{project.description}</p>
                      <div>
                        <h4 className="font-bold text-primary mb-2">Key Features:</h4>
                        <ul className="text-sm space-y-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        )

      case "education":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary">$ cat education.log</h2>
            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-accent">Bachelor of Science (Engg.)</h3>
                    <p className="text-lg text-primary">Information and Communication Engineering</p>
                    <p className="text-sm">Noakhali Science and Technology University</p>
                  </div>
                  <Badge variant="secondary">Jan 2019 – May 2024</Badge>
                </div>
                <div className="text-lg">
                  <span className="text-primary font-bold">CGPA:</span> 3.38/4.00 (with honors)
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-accent mb-4">Certifications</h3>
              <div className="space-y-2">
                <div>• Trainee Software Engineer (AI) - BJIT LTD.</div>
                <div>• Industrial Attachment at BJIT LTD.</div>
                <div>• HackerRank SQL</div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-accent mb-4">Competitive Programming Achievements</h3>
              <div className="space-y-2 text-sm">
                <div>• Problem setter - ICE TECHCOMBAT Programming Contest 2023, NSTU</div>
                <div>• Problem setter - ICE 6th Batch Farewell Programming Contest 2023, NSTU</div>
                <div>• Contestant - CUET Inter University Programming Contest 2024</div>
                <div>• Participated in ICPC Asia Dhaka Regional Site Online Preliminary Contest 2022, 2023</div>
                <div>• 4th place - Intra NSTU Programming Contest 2023</div>
                <div>• 12th place - Intra NSTU Programming Contest 2022</div>
              </div>
            </Card>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary">$ ./skills --list</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-accent mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary">$ contact --info</h2>
            <Card className="p-6 bg-card border-primary transition-all duration-300 hover:shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-accent">Get In Touch</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                      <a
                        href="mailto:sohanurrahman621@gmail.com"
                        className="hover:text-accent transition-colors"
                        aria-label="Email Sohanur Rahman"
                      >
                        sohanurrahman621@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                      <a
                        href="tel:+8801879957329"
                        className="hover:text-accent transition-colors"
                        aria-label="Call Sohanur Rahman"
                      >
                        +8801879957329
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                      <span>Mohakhali, Dhaka, Bangladesh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-primary" aria-hidden="true" />
                      <a
                        href="https://github.com/SoRaS20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                        aria-label="Visit Sohanur Rahman's GitHub profile"
                      >
                        github.com/SoRaS20
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-accent">Coding Profiles</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-primary">Codeforces:</span>
                      <a
                        href="https://codeforces.com/profile/TheEnd"
                        className="ml-2 hover:text-accent transition-colors"
                        aria-label="Visit Sohanur Rahman's Codeforces profile"
                      >
                        TheEnd
                      </a>
                    </div>
                    <div>
                      <span className="text-primary">LeetCode:</span>
                      <a
                        href="https://leetcode.com/SoRaS_20"
                        className="ml-2 hover:text-accent transition-colors"
                        aria-label="Visit Sohanur Rahman's LeetCode profile"
                      >
                        SoRaS_20
                      </a>
                    </div>
                    <div>
                      <span className="text-primary">Vjudge:</span>
                      <a
                        href="https://vjudge.net/user/lazy_coder0"
                        className="ml-2 hover:text-accent transition-colors"
                        aria-label="Visit Sohanur Rahman's Vjudge profile"
                      >
                        lazy_coder0
                      </a>
                    </div>
                    <div>
                      <span className="text-primary">StopStalk:</span>
                      <a
                        href="https://www.stopstalk.com/user/profile/SoRaS"
                        className="ml-2 hover:text-accent transition-colors"
                        aria-label="Visit Sohanur Rahman's StopStalk profile"
                      >
                        SoRaS
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <nav
          className="w-full md:w-64 bg-sidebar border-b md:border-r border-sidebar-border p-4 md:min-h-screen"
          aria-label="Main navigation"
        >
          <div className="space-y-2">
            <div className="text-lg font-bold text-sidebar-primary mb-6">TERMINAL_PORTFOLIO.EXE</div>
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Button
                  key={section.id}
                  variant={currentSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start text-left font-mono transition-all duration-200 hover:bg-accent/10"
                  onClick={() => setCurrentSection(section.id)}
                  aria-current={currentSection === section.id ? "page" : undefined}
                >
                  <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {section.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8" aria-live="polite">
          <div className="max-w-4xl mx-auto">{renderSection()}</div>
        </main>
      </div>

      {/* Terminal Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border p-4">
        <div className="text-center text-sm">
          <span className="text-sidebar-primary">sohanur@portfolio:~$ </span>
          <span className="text-sidebar-foreground">Built with Next.js, TypeScript & Terminal Love</span>
          <span className="animate-blink text-sidebar-primary">_</span>
        </div>
      </footer>

      {/* Inline CSS for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-blink {
          animation: blink 0.5s step-end infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
