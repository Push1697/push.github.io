'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowRight, Award, BriefcaseBusiness, Check, ChevronDown,
  Cloud, Code2, Copy, Database, Download, ExternalLink, Github, GraduationCap,
  Headphones, Linkedin, Mail, MapPin, Menu, Monitor, Network, Radio, Server,
  Shield, Sparkles, Terminal, Users, Wifi, X, Zap,
} from 'lucide-react';

const nav = ['home', 'about', 'experience', 'capabilities', 'projects', 'learning', 'certifications', 'contact'];

const experiences = [
  {
    role: 'Infrastructure System Engineer', company: 'The House of Shubhashish',
    period: 'Apr 2026 — Present', location: 'Jaipur, Rajasthan',
    points: ['Contributed to end-to-end infrastructure implementation for a new 400+ seat office', 'Deploy and troubleshoot network racks, switches, access points, leased lines, endpoints, and link failover', 'Configure FortiGate SD-WAN policy routing for path-specific traffic control', 'Implemented Zoho Desk L1/L2/L3 SLA workflows, Poly Studio, HDMI-over-CAT6, and Zoom Rooms'],
  },
  {
    role: 'IT Support Engineer', company: 'Bill Gosling Outsourcing India',
    period: 'Feb 2026 — Mar 2026', location: 'Jaipur, Rajasthan',
    points: ['Supported workstation operations in a high-volume contact-center environment', 'Resolved Windows, application, hardware, network, and VPN issues', 'Supported onboarding, seat moves, device replacement, and infrastructure escalations'],
  },
  {
    role: 'Server Administrator / Cloud Operations Engineer', company: 'Webspiders Interweb Pvt. Ltd.',
    period: 'Sep 2023 — Nov 2025', location: 'Jaipur, Rajasthan',
    points: ['Led L1 support and escalated L2 incident handling with 95%+ SLA compliance', 'Completed 100+ Microsoft 365 and Google Workspace migrations', 'Administered AWS, Zabbix, Windows/Linux, IIS, Plesk, DNS, SSL, firewalls, and VPN', 'Automated repetitive operations with n8n and Bash; created SOPs and knowledge-base articles'],
  },
  {
    role: 'AWS & System Administration Intern', company: 'LinuxWorld Informatics Pvt. Ltd.',
    period: 'Jul 2023 — Sep 2023', location: 'Remote',
    points: ['Practiced AWS EC2, S3, VPC, IAM, and CloudWatch', 'Worked with Linux administration, shell commands, logs, and network troubleshooting', 'Learned Terraform, Ansible, Docker, Git, and foundational CI/CD workflows'],
  },
];

const capabilities = [
  { title: 'Enterprise Infrastructure', icon: Server, items: ['400+ seat rollout', 'Structured cabling', 'Network racks', 'Leased lines', 'Link failover', 'Endpoints', 'Asset lifecycle', 'Vendor coordination'] },
  { title: 'Networking & Security', icon: Shield, items: ['LAN / WAN', 'TCP/IP', 'FortiGate', 'SD-WAN', 'VPN', 'DNS', 'DHCP', 'Wireless APs'] },
  { title: 'Cloud & DevOps', icon: Cloud, items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'CI/CD', 'GitHub Actions', 'GitOps'] },
  { title: 'Systems & Operations', icon: Terminal, items: ['Windows Server', 'Linux', 'IIS', 'Plesk', 'Nginx', 'SSL', 'MySQL', 'MSSQL'] },
  { title: 'Monitoring & Automation', icon: Activity, items: ['Zabbix', 'Prometheus', 'CloudWatch', 'n8n', 'Bash', 'PowerShell', 'Alerts', 'RCA'] },
  { title: 'Workplace Technology', icon: Monitor, items: ['Microsoft 365', 'Google Workspace', 'Poly Studio', 'Zoom Rooms', 'HDMI over CAT6', 'Onboarding', 'Policies', 'Zoho Desk'] },
];

const projects = [
  { n: '01', title: 'Secure AWS Infrastructure', description: 'Terraform-built VPC with private application subnets, ALB, Auto Scaling, automated provisioning, and GitHub Actions deployment through OIDC.', tags: ['AWS', 'Terraform', 'OIDC', 'ALB', 'ASG'], icon: Cloud },
  { n: '02', title: 'Production n8n Deployment', description: 'Docker Compose, reverse proxy, SSL, persistent data, security hardening, troubleshooting, and operational documentation.', tags: ['Docker', 'n8n', 'Nginx', 'SSL'], icon: Zap, link: 'https://blog.overflowbyte.cloud/the-comprehensive-guide-to-deploying-n8n-in-production-a-docker-deployment-journey' },
  { n: '03', title: 'Nextcloud on AWS', description: 'Reproducible Nextcloud, PostgreSQL, and document-server infrastructure with AMI recovery and cost-aware lifecycle operations.', tags: ['AWS', 'Nextcloud', 'PostgreSQL', 'Nginx'], icon: Database },
  { n: '04', title: 'Kubernetes GitOps Pipeline', description: 'Self-managed Kubernetes on AWS with Jenkins CI, SonarQube and Trivy scanning, and declarative delivery through Argo CD.', tags: ['Kubernetes', 'Jenkins', 'Argo CD', 'Trivy'], icon: Code2 },
  { n: '05', title: 'Preventive Monitoring', description: 'Zabbix and Prometheus infrastructure monitoring with service-health automation and Slack/email alert workflows.', tags: ['Zabbix', 'Prometheus', 'Linux', 'Automation'], icon: Activity },
  { n: '06', title: 'Talos Linux Cluster Lab', description: 'Isolated Talos cluster using a dual-homed jump host, SSH tunnelling, and documented Flannel and CoreDNS troubleshooting.', tags: ['Talos', 'Kubernetes', 'Networking', 'Bastion'], icon: Network },
];

const learning = [
  { title: 'Cloud-native infrastructure', status: 'Lab practice', icon: Network, items: ['Advanced Kubernetes', 'Talos Linux', 'Helm', 'GitOps', 'Cluster networking', 'Production troubleshooting'] },
  { title: 'Contact-center technology', status: 'Actively learning', icon: Headphones, items: ['SIP', 'VoIP', 'PRI', 'IVR', 'ACD', 'CTI'] },
  { title: 'AWS architecture', status: 'Actively learning', icon: Cloud, items: ['Solutions Architect Associate', 'Resilient architecture', 'Secure IaC', 'Auto scaling', 'Monitoring', 'Cost optimization'] },
];

function SectionTitle({ number, label, children }: { number: string; label: string; children: React.ReactNode }) {
  return <div className="section-title reveal-on-scroll"><div className="eyebrow"><i />{number} · {label}</div><h2>{children}</h2></div>;
}

function CapabilityCard({ group, index }: { group: typeof capabilities[number]; index: number }) {
  const [burst, setBurst] = useState(0);
  const Icon = group.icon;
  return (
    <button className="capability-card glass reveal-on-scroll" style={{ '--delay': `${index * 65}ms` } as React.CSSProperties}
      onClick={() => setBurst((v) => v + 1)} aria-label={`Show ${group.title} skill icons`}>
      <div className="cap-head"><span className="icon-box"><Icon /></span><span className="cap-index">0{index + 1}</span></div>
      <h3>{group.title}</h3>
      <div className="skill-grid">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="cap-hint"><Sparkles /> Click to deploy skill stack</div>
      {burst > 0 && <div key={burst} className="skill-burst" aria-hidden="true">
        {group.items.slice(0, 7).map((item, i) => <span key={item} style={{ '--i': i } as React.CSSProperties}><Icon />{item}</span>)}
      </div>}
    </button>
  );
}

function Topology() {
  const nodes = [
    ['Internet', 50, 8, Radio], ['FortiGate', 82, 27, Shield], ['AWS Cloud', 91, 58, Cloud],
    ['Monitoring', 75, 83, Activity], ['Endpoints', 40, 90, Monitor], ['Servers', 15, 76, Server],
    ['Wireless AP', 8, 44, Wifi], ['Core Switch', 22, 20, Network],
  ] as const;
  return <div className="topology reveal-on-scroll">
    <div className="topology-glow" />
    <svg viewBox="0 0 500 500" aria-hidden="true">
      <circle cx="250" cy="250" r="182" className="orbit dash" />
      <circle cx="250" cy="250" r="116" className="orbit" />
      {nodes.map(([, x, y], i) => <line key={i} x1="250" y1="250" x2={x * 5} y2={y * 5} className="data-line" style={{ animationDuration: `${3 + (i % 4)}s` }} />)}
    </svg>
    <div className="topology-avatar"><Image src="/new_image.jpg" alt="Pushpendra Dev" fill sizes="130px" priority /></div>
    {nodes.map(([name, x, y, Icon]) => <div className="topology-node" key={name} style={{ left: `${x}%`, top: `${y}%` }}><span><Icon /><b /></span><small>{name}</small></div>)}
    <div className="telemetry glass"><i className="status-dot" /> uptime <strong>99.98%</strong><em>•</em> latency <strong>18ms</strong></div>
  </div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')), { threshold: .12 });
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => reveal.observe(el));
    const sections = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-35% 0px -55%' });
    nav.forEach((id) => { const el = document.getElementById(id); if (el) sections.observe(el); });
    return () => { reveal.disconnect(); sections.disconnect(); };
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const copyEmail = async () => { await navigator.clipboard.writeText('push1697@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return <div className="portfolio-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header glass">
      <a className="brand" href="#home"><b>PD</b><span>/ INFRA</span></a>
      <nav>{nav.map((item) => <a key={item} className={active === item ? 'active' : ''} href={`#${item}`}>{item}</a>)}</nav>
      <div className="header-actions"><a className="button ghost" href="/pushpendra-resume.pdf" download><Download /> Resume</a><a className="button primary" href="https://www.linkedin.com/in/pushpendra16/" target="_blank"><Linkedin /> LinkedIn</a></div>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      {menu && <div className="mobile-nav glass">{nav.map((item) => <a key={item} href={`#${item}`} onClick={() => setMenu(false)}>{item}</a>)}</div>}
    </header>

    <main id="main">
      <section id="home" className="hero section-grid">
        <div className="hero-copy reveal-on-scroll">
          <div className="availability"><i className="status-dot" /> Infrastructure · Cloud · Operations</div>
          <h1><span>Pushpendra</span><br />Dev</h1>
          <h2>Infrastructure System Engineer</h2>
          <p>I design, implement, troubleshoot, and operate the systems that keep modern workplaces connected—from enterprise networks and FortiGate routing to AWS infrastructure, Windows/Linux operations, automation, and cloud-native deployment.</p>
          <div className="location"><MapPin /> Based in Jaipur, India · Open to infrastructure, cloud operations, DevOps & implementation roles</div>
          <div className="hero-actions"><a className="button primary large" href="#experience">View Experience <ArrowRight /></a><a className="button ghost large" href="/pushpendra-resume.pdf" download><Download /> Download Resume</a></div>
          <div className="socials"><a href="https://www.linkedin.com/in/pushpendra16/" target="_blank" aria-label="LinkedIn"><Linkedin /></a><a href="https://github.com/push1697" target="_blank" aria-label="GitHub"><Github /></a><a href="mailto:push1697@gmail.com" aria-label="Email"><Mail /></a></div>
        </div>
        <Topology />
      </section>

      <section className="metrics">
        {[['400+', 'Seat office rollout', Users], ['100+', 'Enterprise migrations', Cloud], ['95%+', 'SLA compliance', Activity], ['3 yrs', 'Infrastructure experience', BriefcaseBusiness]].map(([value, label, Icon]) =>
          <div key={label as string} className="metric reveal-on-scroll"><Icon className="metric-icon" /><strong>{value as string}</strong><span>{label as string}</span></div>)}
      </section>

      <section id="about" className="content-section">
        <SectionTitle number="02" label="About">Infrastructure from <span>rack to cloud</span></SectionTitle>
        <div className="about-grid">
          <div className="about-copy reveal-on-scroll"><p>I&apos;m an Infrastructure and Cloud Engineer with three years of experience across enterprise rollouts, networking, Windows and Linux systems, cloud operations, workplace technology, and SLA-driven support.</p><p>Most recently, I contributed substantially to commissioning a new office designed for more than 400 users—covering switching, leased lines, <b>FortiGate SD-WAN</b>, wireless, endpoints, biometric systems, failover, and conference-room technology.</p><p>I combine hands-on implementation and incident ownership with AWS, monitoring, automation, documentation, and modern deployment practices.</p></div>
          <div className="about-cards">{[['Implement', 'Planning, installation, configuration, testing, and operational handover.', Network], ['Operate', 'Monitoring, incident ownership, RCA, SLA support, and service continuity.', Activity], ['Improve', 'Automation, preventive troubleshooting, resilient design, and documentation.', Zap]].map(([title, text, Icon]) => <article className="glass reveal-on-scroll" key={title as string}><Icon /><h3>{title as string}</h3><p>{text as string}</p></article>)}</div>
        </div>
      </section>

      <section id="experience" className="content-section">
        <SectionTitle number="03" label="Experience">Systems operated. <span>Impact delivered.</span></SectionTitle>
        <div className="timeline">{experiences.map((exp, i) => <article className="experience-card glass reveal-on-scroll" key={exp.company}><div className="timeline-marker"><span>0{i + 1}</span></div><div className="exp-head"><div><h3>{exp.role}</h3><h4>{exp.company}</h4></div><div><b>{exp.period}</b><span><MapPin /> {exp.location}</span></div></div><ul>{exp.points.map((point) => <li key={point}><ChevronDown />{point}</li>)}</ul></article>)}</div>
      </section>

      <section id="capabilities" className="content-section">
        <SectionTitle number="04" label="Capabilities">Operational <span>capabilities</span></SectionTitle>
        <p className="section-lead reveal-on-scroll">Click a capability to deploy its skill stack.</p>
        <div className="capability-grid">{capabilities.map((group, i) => <CapabilityCard key={group.title} group={group} index={i} />)}</div>
      </section>

      <section id="projects" className="content-section">
        <SectionTitle number="05" label="Projects">Infrastructure <span>in practice</span></SectionTitle>
        <div className="project-grid">{projects.map((project) => { const Icon = project.icon; return <article className="project-card glass reveal-on-scroll" key={project.title}><div className="project-top"><span>{project.n}</span><Icon /></div><div className="mini-architecture"><i /><i /><i /><b /></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.link && <a href={project.link} target="_blank">Read case study <ExternalLink /></a>}</article>; })}</div>
      </section>

      <section id="learning" className="content-section">
        <SectionTitle number="06" label="Learning">Expanding the <span>operating surface</span></SectionTitle>
        <div className="learning-grid">{learning.map(({ title, status, icon: Icon, items }) => <article className="learning-card glass reveal-on-scroll" key={title}><div><span className="icon-box"><Icon /></span><b>{status}</b></div><h3>{title}</h3><ul>{items.map((item) => <li key={item}><i />{item}</li>)}</ul></article>)}</div>
      </section>

      <section id="certifications" className="content-section">
        <SectionTitle number="07" label="Credentials">Certifications & <span>education</span></SectionTitle>
        <div className="credentials-grid">
          <article className="glass reveal-on-scroll"><h3><Award /> Certifications</h3><ul>{['AWS Certified Cloud Practitioner', 'Google Cloud Certified Professional Google Workspace Administrator', 'GitHub Foundations', 'IT Security — Google / Coursera', 'Technical Support Fundamentals — Google / Coursera', 'Advanced DevOps & Cloud Technologies — ARTH', 'AWS Solutions Architect Associate — Pursuing'].map((item) => <li key={item}><i />{item}</li>)}</ul></article>
          <article className="glass reveal-on-scroll"><h3><GraduationCap /> Education</h3><div className="education"><b>Bachelor of Technology, Computer Science</b><span>Suresh Gyan Vihar University</span><small>2022 — 2026</small></div><div className="education"><b>Diploma, Computer Science & Engineering</b><span>Suresh Gyan Vihar University</span><small>2019 — 2022 · CGPA 7.60 / 10</small></div></article>
        </div>
      </section>

      <section id="contact" className="content-section">
        <div className="contact-panel glass reveal-on-scroll"><div className="eyebrow"><i />08 · Contact</div><h2>Let&apos;s build infrastructure that <span>stays ready.</span></h2><p>I&apos;m open to infrastructure engineering, cloud operations, implementation, DevOps, and enterprise support opportunities.</p>
          <div className="contact-grid"><button onClick={copyEmail}><span className="icon-box"><Mail /></span><span><small>Email</small>push1697@gmail.com</span>{copied ? <Check /> : <Copy />}</button><a href="https://www.linkedin.com/in/pushpendra16/" target="_blank"><span className="icon-box"><Linkedin /></span><span><small>LinkedIn</small>/in/pushpendra16</span></a><a href="https://github.com/push1697" target="_blank"><span className="icon-box violet"><Github /></span><span><small>GitHub</small>@push1697</span></a></div>
          <div className="hero-actions"><a className="button primary large" href="/pushpendra-resume.pdf" download><Download /> Download Resume</a><a className="button ghost large" href="mailto:push1697@gmail.com"><Mail /> Send an email</a></div>
          <div className="contact-meta"><span><MapPin /> Jaipur, Rajasthan, India</span><span><i className="status-dot" /> Open to relocation & rotational / follow-the-sun shifts</span></div>
        </div>
      </section>
    </main>
    <footer><div className="brand"><b>PD</b><span><strong>Pushpendra Dev</strong>Infrastructure System Engineer</span></div><p>Designed around infrastructure, reliability, and continuous learning.</p><span>© {year} · Pushpendra Dev</span></footer>
  </div>;
}
