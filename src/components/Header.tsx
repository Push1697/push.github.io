'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Download, Linkedin, Menu, Moon, Sun, X } from 'lucide-react';
import type { Theme } from '@/lib/useTheme';

export type NavItem = { id: string; label: string; href: string };

function NavLink({ href, className, onClick, children, innerRef }: { href: string; className?: string; onClick?: () => void; children: React.ReactNode; innerRef?: (el: HTMLAnchorElement | null) => void }) {
  if (href.startsWith('#')) {
    return <a ref={innerRef} className={className} href={href} onClick={onClick}>{children}</a>;
  }
  return <Link ref={innerRef} className={className} href={href} onClick={onClick}>{children}</Link>;
}

export default function Header({ items, activeId: activeIdProp, theme, toggleTheme }: { items: NavItem[]; activeId?: string; theme: Theme; toggleTheme: () => void }) {
  const [menu, setMenu] = useState(false);
  const [activeInternal, setActiveInternal] = useState(items[0]?.id ?? '');
  const active = activeIdProp ?? activeInternal;
  const navListRef = useRef<HTMLElement | null>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0, ready: false });
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (activeIdProp) return;
    const sections = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveInternal(e.target.id)),
      { rootMargin: '-35% 0px -55%' },
    );
    items.forEach(({ id }) => { const el = document.getElementById(id); if (el) sections.observe(el); });
    return () => sections.disconnect();
  }, [activeIdProp, items]);

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

  return (
    <header className={`site-header glass ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` } as React.CSSProperties} />
      <Link className="brand" href="/"><b>PD</b><span>/ INFRA</span></Link>
      <nav ref={navListRef}>
        <span className="nav-indicator" style={{ transform: `translateX(${navIndicator.left}px)`, width: navIndicator.width, opacity: navIndicator.ready ? 1 : 0 } as React.CSSProperties} aria-hidden="true" />
        {items.map((item) => <NavLink key={item.id} innerRef={(el) => { navLinkRefs.current[item.id] = el; }} className={active === item.id ? 'active' : ''} href={item.href}>{item.label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={theme === 'light'}>{theme === 'dark' ? <Sun /> : <Moon />}</button>
        <a className="button ghost" href="/pushpendra-resume.pdf" download><Download /> Resume</a>
        <a className="button primary" href="https://www.linkedin.com/in/pushpendra16/" target="_blank"><Linkedin /> LinkedIn</a>
      </div>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      {menu && <div className="mobile-nav glass">
        <button className="theme-toggle mobile" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={theme === 'light'}>{theme === 'dark' ? <Sun /> : <Moon />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
        {items.map((item) => <NavLink key={item.id} href={item.href} onClick={() => setMenu(false)}>{item.label}</NavLink>)}
      </div>}
    </header>
  );
}
