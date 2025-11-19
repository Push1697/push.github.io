import React, { useState, useEffect } from 'react';
import { Cloud, Server, Code, Mail, Phone, Linkedin, Github, Award, Briefcase, GraduationCap, Terminal, Database, Shield, ChevronDown, Menu, X, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const experiences = [
    {
      title: "Server Administrator",
      company: "Webspiders Interweb Pvt. Ltd.",
      period: "Sep 2023 - Present",
      location: "Jaipur, Rajasthan",
      highlights: [
        "Leading L1 technical support team with 95%+ SLA compliance",
        "Executed 50+ Office 365 & Google Workspace migrations",
        "Deployed AWS infrastructure (EC2, S3, IAM, VPC)",
        "Reduced manual intervention by 40% with n8n automation"
      ]
    },
    {
      title: "AWS Intern",
      company: "LinuxWorld Informatics Pvt Ltd",
      period: "Jul 2023 - Sep 2023",
      location: "Jaipur, Rajasthan",
      highlights: [
        "Implemented IaC using Terraform and Ansible",
        "Worked on Docker and Kubernetes projects",
        "Designed CI/CD pipelines for automated deployments"
      ]
    },
    {
      title: "Windows Server Administrator",
      company: "CloudTechtiq Technologies",
      period: "Feb 2023 - Jun 2023",
      location: "Jaipur, Rajasthan",
      highlights: [
        "Maintained 99.9% uptime for production services",
        "Managed SSL certificates and security updates",
        "Delivered SLA-aligned solutions to enterprise clients"
      ]
    }
  ];

  const skills = [
    { category: "Cloud & DevOps", items: ["AWS (EC2, S3, VPC, IAM)", "Docker", "Kubernetes", "Terraform", "CI/CD Pipelines"] },
    { category: "Server Administration", items: ["Windows Server", "Linux (Ubuntu, RHEL)", "Plesk Panel", "IIS", "DNS Management"] },
    { category: "Email & Collaboration", items: ["Office 365 Migrations", "Google Workspace", "Cross-Mail Exchange"] },
    { category: "Databases & Monitoring", items: ["MSSQL", "MySQL", "Zabbix", "n8n Automation"] }
  ];

  const certifications = [
    "AWS Certified Cloud Practitioner",
    "Google Workspace Administrator",
    "GitHub Foundations",
    "Information Technology Fundamentals - IBM",
    "Currently Pursuing: AWS Solutions Architect Associate"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Pushpendra
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'certifications', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-cyan-400 transition-colors ${activeSection === item ? 'text-cyan-400' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'experience', 'skills', 'certifications', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize hover:bg-purple-800/50 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="mb-8 flex justify-center space-x-4">
              <Cloud className="w-12 h-12 text-cyan-400 animate-bounce" />
              <Server className="w-12 h-12 text-purple-400 animate-bounce delay-100" />
              <Code className="w-12 h-12 text-pink-400 animate-bounce delay-200" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pushpendra
            </h1>
            
            <p className="text-2xl md:text-3xl mb-4 text-gray-300">
              Server & Cloud Engineer
            </p>
            
            <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
              AWS Certified | DevOps Enthusiast | Building Scalable Cloud Infrastructure
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="mailto:push1697@gmail.com" className="flex items-center space-x-2 bg-cyan-500/20 hover:bg-cyan-500/30 px-6 py-3 rounded-lg transition-all transform hover:scale-105">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
              <a href="https://linkedin.com/in/pushpendra16" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 px-6 py-3 rounded-lg transition-all transform hover:scale-105">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/push1697" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-pink-500/20 hover:bg-pink-500/30 px-6 py-3 rounded-lg transition-all transform hover:scale-105">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>

            <button onClick={() => scrollToSection('about')} className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-cyan-400" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Server and Cloud Engineer with <span className="text-cyan-400 font-semibold">2+ years of hands-on experience</span> in Windows server administration, cloud infrastructure management, and automation.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Proven expertise in <span className="text-purple-400 font-semibold">Office 365 & Google Workspace migrations</span>, AWS cloud deployments, and CI/CD pipelines. Currently pursuing AWS Solutions Architect certification.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Passionate about building scalable, reliable, and automated infrastructure that empowers businesses to grow efficiently.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 rounded-xl border border-cyan-500/30 transform hover:scale-105 transition-transform">
                <Server className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">50+</h3>
                <p className="text-gray-300">Migrations Completed</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-6 rounded-xl border border-purple-500/30 transform hover:scale-105 transition-transform">
                <Shield className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-purple-400 mb-2">95%+</h3>
                <p className="text-gray-300">SLA Compliance</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/5 p-6 rounded-xl border border-pink-500/30 transform hover:scale-105 transition-transform">
                <Database className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold text-pink-400 mb-2">99.9%</h3>
                <p className="text-gray-300">Server Uptime</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 p-6 rounded-xl border border-green-500/30 transform hover:scale-105 transition-transform">
                <Code className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">40%</h3>
                <p className="text-gray-300">Automation Gain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">{exp.title}</h3>
                    <p className="text-xl text-purple-400">{exp.company}</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0 text-right">
                    <p>{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-4">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start space-x-3 text-gray-300">
                      <ChevronDown className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 rotate-[-90deg]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
                <h3 className="text-2xl font-bold text-purple-400 mb-6">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="bg-cyan-500/20 hover:bg-cyan-500/30 px-4 py-2 rounded-lg text-sm transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all transform hover:scale-105 flex items-start space-x-4">
                <Award className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <p className="text-gray-300">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            I'm always open to discussing new opportunities, collaborations, or exploring DevOps and Cloud technologies.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a href="mailto:push1697@gmail.com" className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all transform hover:scale-105">
              <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <p className="text-gray-300">push1697@gmail.com</p>
            </a>
            
            <a href="tel:+918619274820" className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all transform hover:scale-105">
              <Phone className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-300">+91 8619274820</p>
            </a>
            
            <a href="https://linkedin.com/in/pushpendra16" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-pink-500/20 to-pink-500/5 p-6 rounded-xl border border-pink-500/30 hover:border-pink-500/50 transition-all transform hover:scale-105">
              <Linkedin className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <p className="text-gray-300">linkedin.com/in/pushpendra16</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2025 Pushpendra. Built with React & Tailwind CSS</p>
          <p className="mt-2 text-sm">Jaipur, Rajasthan, India</p>
        </div>
      </footer>
    </div>
  );
}