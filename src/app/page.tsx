'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import MiniArchitecture, { type ArchKind } from '@/components/MiniArchitecture';
import { SplitLetters } from '@/lib/splitText';
import { useCanUse3D } from '@/lib/useCanUse3D';
import {
  Activity, ArrowRight, Award, BriefcaseBusiness, Check, ChevronDown,
  Cloud, Code2, Copy, Database, Download, ExternalLink, Github, GraduationCap,
  Headphones, Linkedin, Mail, MapPin, Menu, Monitor, Network, Package, Server,
  Shield, Sparkles, Terminal, Users, Wifi, X, Zap,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaAws, FaDatabase, FaDocker, FaLinux, FaShieldAlt, FaWindows } from 'react-icons/fa';
import {
  SiAnsible, SiFortinet, SiGnubash, SiKubernetes, SiMysql, SiN8N,
  SiNginx, SiPlesk, SiPrometheus, SiTerraform,
} from 'react-icons/si';
import {
  TbBrandGoogle, TbBrandOffice, TbBrandPowershell, TbBrandZoom, TbCloudComputing,
  TbCloudNetwork, TbDeviceCctv, TbNetwork, TbRouter, TbServerCog,
} from 'react-icons/tb';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false, loading: () => null });
const GlobalWaveBackground = dynamic(() => import('@/components/GlobalWaveBackground'), { ssr: false, loading: () => null });

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

const projects: { n: string; title: string; description: string; tags: string[]; icon: LucideIcon; link?: string; archKind: ArchKind }[] = [
  { n: '01', title: 'Secure AWS Infrastructure', description: 'Terraform-built VPC with private application subnets, ALB, Auto Scaling, automated provisioning, and GitHub Actions deployment through OIDC.', tags: ['AWS', 'Terraform', 'OIDC', 'ALB', 'ASG'], icon: Cloud, archKind: 'aws-vpc' },
  { n: '02', title: 'Production n8n Deployment', description: 'Docker Compose, reverse proxy, SSL, persistent data, security hardening, troubleshooting, and operational documentation.', tags: ['Docker', 'n8n', 'Nginx', 'SSL'], icon: Zap, link: 'https://blog.overflowbyte.cloud/the-comprehensive-guide-to-deploying-n8n-in-production-a-docker-deployment-journey', archKind: 'n8n' },
  { n: '03', title: 'Nextcloud on AWS', description: 'Reproducible Nextcloud, PostgreSQL, and document-server infrastructure with AMI recovery and cost-aware lifecycle operations.', tags: ['AWS', 'Nextcloud', 'PostgreSQL', 'Nginx'], icon: Database, archKind: 'nextcloud' },
  { n: '04', title: 'Kubernetes GitOps Pipeline', description: 'Self-managed Kubernetes on AWS with Jenkins CI, SonarQube and Trivy scanning, and declarative delivery through Argo CD.', tags: ['Kubernetes', 'Jenkins', 'Argo CD', 'Trivy'], icon: Code2, archKind: 'k8s-gitops' },
  { n: '05', title: 'Preventive Monitoring', description: 'Zabbix and Prometheus infrastructure monitoring with service-health automation and Slack/email alert workflows.', tags: ['Zabbix', 'Prometheus', 'Linux', 'Automation'], icon: Activity, archKind: 'monitoring' },
  { n: '06', title: 'Talos Linux Cluster Lab', description: 'Isolated Talos cluster using a dual-homed jump host, SSH tunnelling, and documented Flannel and CoreDNS troubleshooting.', tags: ['Talos', 'Kubernetes', 'Networking', 'Bastion'], icon: Network, archKind: 'talos' },
];

const learning = [
  { title: 'Cloud-native infrastructure', status: 'Lab practice', icon: Network, items: ['Advanced Kubernetes', 'Talos Linux', 'Helm', 'GitOps', 'Cluster networking', 'Production troubleshooting'] },
  { title: 'Contact-center technology', status: 'Actively learning', icon: Headphones, items: ['SIP', 'VoIP', 'PRI', 'IVR', 'ACD', 'CTI'] },
  { title: 'AWS architecture', status: 'Actively learning', icon: Cloud, items: ['Solutions Architect Associate', 'Resilient architecture', 'Secure IaC', 'Auto scaling', 'Monitoring', 'Cost optimization'] },
];

type SkillLogoConfig = { kind: string; mark: string; accent: string; BrandIcon?: IconType };

const skillLogoMap: Record<string, SkillLogoConfig> = {
  '400+ seat rollout': { kind: 'stack', mark: '400', accent: '#66e8ff', BrandIcon: TbDeviceCctv },
  'Structured cabling': { kind: 'line', mark: 'CAT', accent: '#ffc46b', BrandIcon: TbNetwork },
  'Network racks': { kind: 'rack', mark: 'RU', accent: '#66e8ff', BrandIcon: TbServerCog },
  'Leased lines': { kind: 'line', mark: 'LL', accent: '#58dfa7', BrandIcon: TbCloudNetwork },
  'Link failover': { kind: 'pulse', mark: 'HA', accent: '#58dfa7', BrandIcon: TbRouter },
  'Endpoints': { kind: 'screen', mark: 'PC', accent: '#66e8ff' },
  'Asset lifecycle': { kind: 'cycle', mark: 'AL', accent: '#a98cff' },
  'Vendor coordination': { kind: 'stack', mark: 'VC', accent: '#ffc46b' },
  'LAN / WAN': { kind: 'line', mark: 'LAN', accent: '#66e8ff', BrandIcon: TbNetwork },
  'TCP/IP': { kind: 'pulse', mark: 'IP', accent: '#58dfa7', BrandIcon: TbRouter },
  'FortiGate': { kind: 'firewall', mark: 'FG', accent: '#ef4444', BrandIcon: SiFortinet },
  'SD-WAN': { kind: 'line', mark: 'SD', accent: '#66e8ff', BrandIcon: TbCloudNetwork },
  'VPN': { kind: 'shield', mark: 'VPN', accent: '#a98cff', BrandIcon: FaShieldAlt },
  'DNS': { kind: 'pulse', mark: 'DNS', accent: '#66e8ff', BrandIcon: TbNetwork },
  'DHCP': { kind: 'pulse', mark: 'DHCP', accent: '#58dfa7', BrandIcon: TbRouter },
  'Wireless APs': { kind: 'waves', mark: 'AP', accent: '#66e8ff', BrandIcon: TbRouter },
  'AWS': { kind: 'cloud', mark: 'AWS', accent: '#ff9900', BrandIcon: FaAws },
  'Docker': { kind: 'containers', mark: 'DKR', accent: '#2496ed', BrandIcon: FaDocker },
  'Kubernetes': { kind: 'wheel', mark: 'K8S', accent: '#326ce5', BrandIcon: SiKubernetes },
  'Terraform': { kind: 'blocks', mark: 'TF', accent: '#844fba', BrandIcon: SiTerraform },
  'Ansible': { kind: 'pulse', mark: 'A', accent: '#ee0000', BrandIcon: SiAnsible },
  'CI/CD': { kind: 'cycle', mark: 'CI', accent: '#58dfa7', BrandIcon: TbCloudComputing },
  'GitHub Actions': { kind: 'cycle', mark: 'GHA', accent: '#66e8ff' },
  'GitOps': { kind: 'cycle', mark: 'OPS', accent: '#ffc46b' },
  'Windows Server': { kind: 'window', mark: 'WIN', accent: '#00a4ef', BrandIcon: FaWindows },
  'Linux': { kind: 'penguin', mark: 'TUX', accent: '#f6c343', BrandIcon: FaLinux },
  'IIS': { kind: 'server', mark: 'IIS', accent: '#66e8ff', BrandIcon: FaWindows },
  'Plesk': { kind: 'panel', mark: 'PL', accent: '#58dfa7', BrandIcon: SiPlesk },
  'Nginx': { kind: 'hex', mark: 'NGX', accent: '#009639', BrandIcon: SiNginx },
  'SSL': { kind: 'shield', mark: 'SSL', accent: '#58dfa7', BrandIcon: FaShieldAlt },
  'MySQL': { kind: 'db', mark: 'SQL', accent: '#00758f', BrandIcon: SiMysql },
  'MSSQL': { kind: 'db', mark: 'MS', accent: '#cc2927', BrandIcon: FaDatabase },
  'Zabbix': { kind: 'zabbix', mark: 'ZBX', accent: '#d40000' },
  'Prometheus': { kind: 'flame', mark: 'P', accent: '#e6522c', BrandIcon: SiPrometheus },
  'CloudWatch': { kind: 'pulse', mark: 'CW', accent: '#ff4f8b', BrandIcon: FaAws },
  'n8n': { kind: 'nodes', mark: 'n8n', accent: '#ea4b71', BrandIcon: SiN8N },
  'Bash': { kind: 'terminal', mark: '$', accent: '#58dfa7', BrandIcon: SiGnubash },
  'PowerShell': { kind: 'terminal', mark: 'PS', accent: '#5391fe', BrandIcon: TbBrandPowershell },
  'Alerts': { kind: 'pulse', mark: '!', accent: '#ffc46b' },
  'RCA': { kind: 'pulse', mark: 'RCA', accent: '#a98cff' },
  'Microsoft 365': { kind: 'window', mark: '365', accent: '#f25022', BrandIcon: TbBrandOffice },
  'Google Workspace': { kind: 'blocks', mark: 'G', accent: '#4285f4', BrandIcon: TbBrandGoogle },
  'Poly Studio': { kind: 'screen', mark: 'AV', accent: '#66e8ff' },
  'Zoom Rooms': { kind: 'screen', mark: 'ZM', accent: '#2d8cff', BrandIcon: TbBrandZoom },
  'HDMI over CAT6': { kind: 'line', mark: 'HD', accent: '#ffc46b' },
  'Onboarding': { kind: 'stack', mark: 'OB', accent: '#58dfa7' },
  'Policies': { kind: 'shield', mark: 'POL', accent: '#a98cff', BrandIcon: FaShieldAlt },
  'Zoho Desk': { kind: 'panel', mark: 'ZD', accent: '#ef4444' },
};

function getSkillLogo(skill: string) {
  return skillLogoMap[skill] ?? { kind: 'stack', mark: skill.slice(0, 3).toUpperCase(), accent: '#66e8ff' };
}

function SectionTitle({ number, label, children }: { number: string; label: string; children: React.ReactNode }) {
  return <div className="section-title reveal-on-scroll" data-reveal="rise">
    <div className="eyebrow"><i />{number} · {label}</div>
    <h2>{children}</h2>
    <svg className="title-accent" viewBox="0 0 160 6" aria-hidden="true"><path d="M2,3 H158" /></svg>
  </div>;
}

function SkillLogo({ skill, icon: Icon }: { skill: string; icon: LucideIcon }) {
  const logo = getSkillLogo(skill);
  const BrandIcon = logo.BrandIcon;
  return (
    <span className={`skill-logo skill-logo-${logo.kind} ${BrandIcon ? 'skill-logo-official' : ''}`} style={{ '--skill-accent': logo.accent } as React.CSSProperties}>
      <span className="skill-logo-core">
        {BrandIcon ? <BrandIcon /> : <Icon />}
        {!BrandIcon && <span>{logo.mark}</span>}
      </span>
    </span>
  );
}

function CapabilityCard({ group, index }: { group: typeof capabilities[number]; index: number }) {
  const [burst, setBurst] = useState(0);
  const Icon = group.icon;
  return (
    <button className="capability-card glass reveal-on-scroll" style={{ '--delay': `${index * 65}ms` } as React.CSSProperties}
      data-reveal={index % 2 ? 'tilt-right' : 'tilt-left'}
      onClick={() => setBurst((v) => v + 1)} aria-label={`Show ${group.title} skill icons`}>
      <div className="cap-head"><span className="icon-box"><Icon /></span><span className="cap-index">0{index + 1}</span></div>
      <h3>{group.title}</h3>
      <div className="skill-grid">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="cap-hint"><Sparkles /> Click to deploy skill stack</div>
      {burst > 0 && <div key={burst} className="skill-burst" aria-hidden="true">
        {group.items.slice(0, 7).map((item, i) => <span key={item} className="skill-pop" style={{ '--i': i } as React.CSSProperties}><SkillLogo skill={item} icon={Icon} /><b>{item}</b></span>)}
      </div>}
    </button>
  );
}

function Topology() {
  const nodes = [
    ['FortiGate', 82, 27, Shield], ['AWS', 91, 58, Cloud], ['Linux', 15, 76, Server],
    ['Kubernetes', 22, 20, Network], ['Docker', 8, 44, Package], ['Zabbix', 75, 83, Activity],
    ['Windows Server', 40, 90, Monitor], ['Networking', 50, 8, Wifi],
  ] as const;
  const canUse3D = useCanUse3D();

  return <div className={`topology reveal-on-scroll ${canUse3D ? 'topology-3d' : ''}`} data-reveal="scale">
    <div className="topology-glow" />
    {canUse3D && <HeroScene />}
    <div className="topology-radar" />
    <div className="topology-ring ring-one" />
    <div className="topology-ring ring-two" />
    <svg viewBox="0 0 500 500" aria-hidden="true">
      <circle cx="250" cy="250" r="182" className="orbit dash" />
      <circle cx="250" cy="250" r="116" className="orbit" />
      {nodes.map(([, x, y], i) => <line key={i} x1="250" y1="250" x2={x * 5} y2={y * 5} className="data-line" style={{ animationDuration: `${3 + (i % 4)}s` }} />)}
    </svg>
    <div className="topology-avatar"><Image src="/new_image.jpg" alt="Pushpendra Dev" fill sizes="190px" priority /></div>
    {nodes.map(([name, x, y, Icon]) => <div className="topology-node" key={name} style={{ left: `${x}%`, top: `${y}%` }}><span><Icon /><b /></span><small>{name}</small></div>)}
    <div className="packet packet-a">SD-WAN</div>
    <div className="packet packet-b">IaC</div>
    <div className="packet packet-c">SLA</div>
    <div className="telemetry glass"><i className="status-dot" /> uptime <strong>99.98%</strong><em>•</em> latency <strong>18ms</strong></div>
  </div>;
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const canUse3D = useCanUse3D();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const navListRef = useRef<HTMLElement | null>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0, ready: false });
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')), { threshold: .12 });
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => reveal.observe(el));
    const sections = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-35% 0px -55%' });
    nav.forEach((id) => { const el = document.getElementById(id); if (el) sections.observe(el); });
    return () => { reveal.disconnect(); sections.disconnect(); };
  }, []);

  useEffect(() => {
    const measure = () => {
      const container = navListRef.current;
      const link = navLinkRefs.current[active];
      if (!container || !link) return;
      const containerRect = container.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setNavIndicator({ left: linkRect.left - containerRect.left, width: linkRect.width, ready: true });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, scrolled]);

  useEffect(() => {
    let ticking = false;
    const updateScrollState = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      setScrollProgress(progress);
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };
    updateScrollState();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    return () => window.removeEventListener('scroll', requestUpdate);
  }, []);

  useEffect(() => {
    let ticking = false;
    const shell = shellRef.current;
    if (!shell) return;
    const handleMove = (event: globalThis.MouseEvent) => {
      if (ticking) return;
      ticking = true;
      const { clientX, clientY } = event;
      requestAnimationFrame(() => {
        shell.style.setProperty('--cx', `${clientX}px`);
        shell.style.setProperty('--cy', `${clientY}px`);
        ticking = false;
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleHeroMove = (event: MouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    hero.style.setProperty('--mx', x.toFixed(3));
    hero.style.setProperty('--my', y.toFixed(3));
  };

  const resetHeroMove = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty('--mx', '0');
    hero.style.setProperty('--my', '0');
  };

  const year = useMemo(() => new Date().getFullYear(), []);
  const copyEmail = async () => { await navigator.clipboard.writeText('push1697@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return <div className="portfolio-shell" ref={shellRef}>
    {canUse3D && <div className="global-wave-bg" aria-hidden="true"><GlobalWaveBackground /></div>}
    <div className="cursor-glow" aria-hidden="true" style={{ opacity: Math.min(.6, .28 + scrollProgress / 260) } as React.CSSProperties} />
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header glass ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` } as React.CSSProperties} />
      <a className="brand" href="#home"><b>PD</b><span>/ INFRA</span></a>
      <nav ref={navListRef}>
        <span className="nav-indicator" style={{ transform: `translateX(${navIndicator.left}px)`, width: navIndicator.width, opacity: navIndicator.ready ? 1 : 0 } as React.CSSProperties} aria-hidden="true" />
        {nav.map((item) => <a key={item} ref={(el) => { navLinkRefs.current[item] = el; }} className={active === item ? 'active' : ''} href={`#${item}`}>{item}</a>)}
      </nav>
      <div className="header-actions"><a className="button ghost" href="/pushpendra-resume.pdf" download><Download /> Resume</a><a className="button primary" href="https://www.linkedin.com/in/pushpendra16/" target="_blank"><Linkedin /> LinkedIn</a></div>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      {menu && <div className="mobile-nav glass">{nav.map((item) => <a key={item} href={`#${item}`} onClick={() => setMenu(false)}>{item}</a>)}</div>}
    </header>

    <main id="main">
      <section id="home" className="hero section-grid" ref={heroRef} onMouseMove={handleHeroMove} onMouseLeave={resetHeroMove}>
        <div className="hero-field" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-copy reveal-on-scroll" data-reveal="hero-copy">
          <div className="availability"><i className="status-dot" /> Infrastructure · Cloud · Operations</div>
          <h1><SplitLetters text="Pushpendra" className="text-gradient glitch-word" /><br /><SplitLetters text="Dev" className="glitch-word" /></h1>
          <h2>Infrastructure System Engineer</h2>
          <p>I design, implement, troubleshoot, and operate the systems that keep modern workplaces connected—from enterprise networks and FortiGate routing to AWS infrastructure, Windows/Linux operations, automation, and cloud-native deployment.</p>
          <div className="location"><MapPin /> Based in Jaipur, India · Open to infrastructure, cloud operations, DevOps & implementation roles</div>
          <div className="hero-actions"><a className="button primary large" href="#experience">View Experience <ArrowRight /></a><a className="button ghost large" href="/pushpendra-resume.pdf" download><Download /> Download Resume</a><a className="button ghost large" href="https://www.linkedin.com/in/pushpendra16/" target="_blank"><Linkedin /> LinkedIn</a></div>
          <div className="socials"><a href="https://www.linkedin.com/in/pushpendra16/" target="_blank" aria-label="LinkedIn"><Linkedin /></a><a href="https://github.com/push1697" target="_blank" aria-label="GitHub"><Github /></a><a href="mailto:push1697@gmail.com" aria-label="Email"><Mail /></a></div>
          <div className="hero-terminal glass" aria-label="Current operating profile">
            <span>fortigate sd-wan: policy routes active</span>
            <span>aws + kubernetes + monitoring: online</span>
            <span>incident response: ready</span>
          </div>
        </div>
        <Topology />
      </section>

      <section className="metrics">
        {[['400+', 'Seat office rollout', Users], ['100+', 'Enterprise migrations', Cloud], ['95%+', 'SLA compliance', Activity], ['3 yrs', 'Infrastructure experience', BriefcaseBusiness]].map(([value, label, Icon]) =>
          <div key={label as string} className="metric reveal-on-scroll" data-reveal="metric"><Icon className="metric-icon" /><strong>{value as string}</strong><span>{label as string}</span></div>)}
      </section>

      <section id="about" className="content-section">
        <SectionTitle number="02" label="About">Infrastructure from <span>rack to cloud</span></SectionTitle>
        <div className="about-grid">
          <div className="about-copy reveal-on-scroll" data-reveal="slide-left"><p>I&apos;m an Infrastructure and Cloud Engineer with three years of experience across enterprise rollouts, networking, Windows and Linux systems, cloud operations, workplace technology, and SLA-driven support.</p><p>Most recently, I contributed substantially to commissioning a new office designed for more than 400 users—covering switching, leased lines, <b>FortiGate SD-WAN</b>, wireless, endpoints, biometric systems, failover, and conference-room technology.</p><p>I combine hands-on implementation and incident ownership with AWS, monitoring, automation, documentation, and modern deployment practices.</p></div>
          <div className="about-cards">{[['Implement', 'Planning, installation, configuration, testing, and operational handover.', Network], ['Operate', 'Monitoring, incident ownership, RCA, SLA support, and service continuity.', Activity], ['Improve', 'Automation, preventive troubleshooting, resilient design, and documentation.', Zap]].map(([title, text, Icon], i) => <article className="glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': `${i * 85}ms` } as React.CSSProperties} key={title as string}><Icon /><h3>{title as string}</h3><p>{text as string}</p></article>)}</div>
        </div>
      </section>

      <section id="experience" className="content-section">
        <SectionTitle number="03" label="Experience">Systems operated. <span>Impact delivered.</span></SectionTitle>
        <div className="timeline">{experiences.map((exp, i) => <article className="experience-card glass reveal-on-scroll" data-reveal="slide-right" style={{ '--delay': `${i * 70}ms` } as React.CSSProperties} key={exp.company}><i className="exp-corner" /><div className="exp-status"><i className="status-dot" />{i === 0 ? 'ACTIVE' : 'LOGGED'}</div><div className="timeline-marker"><span>0{i + 1}</span></div><div className="exp-head"><div><h3>{exp.role}</h3><h4>{exp.company}</h4></div><div><b>{exp.period}</b><span><MapPin /> {exp.location}</span></div></div><ul>{exp.points.map((point) => <li key={point}><ChevronDown />{point}</li>)}</ul></article>)}</div>
      </section>

      <section id="capabilities" className="content-section">
        <SectionTitle number="04" label="Capabilities">Operational <span>capabilities</span></SectionTitle>
        <p className="section-lead reveal-on-scroll" data-reveal="rise">Click a capability to deploy its skill stack.</p>
        <div className="capability-grid">{capabilities.map((group, i) => <CapabilityCard key={group.title} group={group} index={i} />)}</div>
      </section>

      <section id="projects" className="content-section">
        <SectionTitle number="05" label="Projects">Infrastructure <span>in practice</span></SectionTitle>
        <div className="project-grid">{projects.map((project, i) => { const Icon = project.icon; return <article className="project-card glass reveal-on-scroll" data-reveal="scale" style={{ '--delay': `${i * 60}ms` } as React.CSSProperties} key={project.title}><div className="project-top"><span>{project.n}</span><Icon /></div><MiniArchitecture kind={project.archKind} /><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.link && <a href={project.link} target="_blank">Read case study <ExternalLink /></a>}</article>; })}</div>
      </section>

      <section id="learning" className="content-section">
        <SectionTitle number="06" label="Learning">Expanding the <span>operating surface</span></SectionTitle>
        <div className="learning-grid">{learning.map(({ title, status, icon: Icon, items }, i) => <article className="learning-card glass reveal-on-scroll" data-reveal="tilt-left" style={{ '--delay': `${i * 80}ms` } as React.CSSProperties} key={title}><div><span className="icon-box"><Icon /></span><b>{status}</b></div><h3>{title}</h3><ul>{items.map((item) => <li key={item}><i />{item}</li>)}</ul></article>)}</div>
      </section>

      <section id="certifications" className="content-section">
        <SectionTitle number="07" label="Credentials">Certifications & <span>education</span></SectionTitle>
        <div className="credentials-grid">
          <article className="glass reveal-on-scroll" data-reveal="slide-left"><h3><Award /> Certifications</h3><ul>{['AWS Certified Cloud Practitioner', 'Google Cloud Certified Professional Google Workspace Administrator', 'GitHub Foundations', 'IT Security — Google / Coursera', 'Technical Support Fundamentals — Google / Coursera', 'Advanced DevOps & Cloud Technologies — ARTH', 'AWS Solutions Architect Associate — Pursuing'].map((item) => <li key={item}><i />{item}</li>)}</ul></article>
          <article className="glass reveal-on-scroll" data-reveal="slide-right"><h3><GraduationCap /> Education</h3><div className="education"><b>Bachelor of Technology, Computer Science</b><span>Suresh Gyan Vihar University</span><small>2022 — 2026</small></div><div className="education"><b>Diploma, Computer Science & Engineering</b><span>Suresh Gyan Vihar University</span><small>2019 — 2022 · CGPA 7.60 / 10</small></div></article>
        </div>
      </section>

      <section id="contact" className="content-section">
        <div className="contact-panel glass reveal-on-scroll" data-reveal="scale"><div className="eyebrow"><i />08 · Contact</div><h2>Let&apos;s build infrastructure that <span>stays ready.</span></h2><p>I&apos;m open to infrastructure engineering, cloud operations, implementation, DevOps, and enterprise support opportunities.</p>
          <div className="contact-grid"><button onClick={copyEmail}><span className="icon-box"><Mail /></span><span><small>Email</small>push1697@gmail.com</span>{copied ? <Check /> : <Copy />}</button><a href="https://www.linkedin.com/in/pushpendra16/" target="_blank"><span className="icon-box"><Linkedin /></span><span><small>LinkedIn</small>/in/pushpendra16</span></a><a href="https://github.com/push1697" target="_blank"><span className="icon-box violet"><Github /></span><span><small>GitHub</small>@push1697</span></a></div>
          <div className="hero-actions"><a className="button primary large" href="/pushpendra-resume.pdf" download><Download /> Download Resume</a><a className="button ghost large" href="mailto:push1697@gmail.com"><Mail /> Send an email</a></div>
          <div className="contact-meta"><span><MapPin /> Jaipur, Rajasthan, India</span><span><i className="status-dot" /> Open to relocation & rotational / follow-the-sun shifts</span></div>
        </div>
      </section>
    </main>
    <footer><div className="brand"><b>PD</b><span><strong>Pushpendra Dev</strong>Infrastructure System Engineer</span></div><p>Designed around infrastructure, reliability, and continuous learning.</p><span>© {year} · Pushpendra Dev</span></footer>
  </div>;
}
