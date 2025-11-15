// Mark this file as a client component so hooks like useEffect work
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Cloud,
  Server,
  Code,
  Mail,
  Linkedin,
  Github,
  Award,
  Briefcase,
  GraduationCap,
  Terminal,
  Database,
  Shield,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export default function Home() {
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

  const projects: Array<{
    title: string;
    description: string;
    tags: string[];
    link?: string;
  }> = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              <span className="text-base md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Pushpendra Bairwa
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => item === 'blog' ? window.location.href = '/blog' : scrollToSection(item)}
                  className={`capitalize hover:text-cyan-400 transition-colors ${activeSection === item ? 'text-cyan-400' : 'text-gray-300'}`}
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
              {['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => item === 'blog' ? window.location.href = '/blog' : scrollToSection(item)}
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in text-center md:text-left mt-16 md:mt-0">
              <div className="mb-6 md:mb-8 flex justify-center md:justify-start space-x-4">
              <Cloud className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 md:animate-bounce" />
              <Server className="w-10 h-10 md:w-12 md:h-12 text-purple-400 md:animate-bounce md:delay-100" />
              <Code className="w-10 h-10 md:w-12 md:h-12 text-pink-400 md:animate-bounce md:delay-200" />
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pushpendra Bairwa
              </h1>
              
              <p className="text-xl md:text-3xl mb-3 md:mb-4 text-gray-300">
                Server & Cloud Engineer
              </p>
              
              <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-400 max-w-2xl mx-auto md:mx-0">
                AWS Certified | DevOps Enthusiast | Building Scalable Cloud Infrastructure
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-8 md:mb-12">
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

              <button onClick={() => scrollToSection('about')} className="hidden md:block animate-bounce mx-auto md:mx-0">
                <ChevronDown className="w-8 h-8 text-cyan-400" />
              </button>
            </div>

            {/* Right: Profile image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-56 h-56 md:w-80 md:h-80">
                <div className="absolute -inset-6 md:-inset-8 rounded-full border-2 border-dashed border-cyan-400/40 animate-[spin_18s_linear_infinite]" />
                <div className="absolute -inset-3 md:-inset-4 rounded-full border-2 border-purple-400/30" />
                <Image
                  src="/new_image.jpg"
                  alt="Pushpendra Bairwa portrait"
                  width={420}
                  height={420}
                  priority
                  className="rounded-full object-cover w-full h-full border-4 border-slate-900 shadow-2xl relative z-10"
                />
              </div>
            </div>
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
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-cyan-400 mr-3">▸</span>
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
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            A curated set of hands-on projects. I’ll add details soon.
          </p>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-300 mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">
                      <ExternalLink className="w-4 h-4" /> View project
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-cyan-500/20">
                  <div className="h-6 w-2/3 bg-slate-700/60 rounded mb-3" />
                  <div className="h-4 w-full bg-slate-700/50 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-slate-700/40 rounded mb-4" />
                  <div className="flex gap-2">
                    <span className="h-6 w-16 bg-slate-700/40 rounded" />
                    <span className="h-6 w-20 bg-slate-700/40 rounded" />
                    <span className="h-6 w-12 bg-slate-700/40 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Certifications & Credentials
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-cyan-500/20">
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start">
                    <Award className={`w-6 h-6 mr-4 mt-1 flex-shrink-0 ${cert.includes('Currently') ? 'text-purple-400' : 'text-cyan-400'}`} />
                    <span className={`text-lg ${cert.includes('Currently') ? 'text-purple-300 italic' : 'text-gray-300'}`}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA Section */}
      <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Read My Technical Blog
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore in-depth articles on cloud infrastructure, DevOps practices, and real-world engineering solutions
          </p>
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Visit Blog
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>

          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects, opportunities, and collaborations. Feel free to reach out!
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:push1697@gmail.com"
              className="flex items-center space-x-2 bg-cyan-500/20 hover:bg-cyan-500/30 px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              <Mail className="w-6 h-6" />
              <span>Email Me</span>
            </a>
            <a
              href="https://linkedin.com/in/pushpendra16"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/push1697"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-pink-500/20 hover:bg-pink-500/30 px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
