'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import ResourceIcon, { resourceLabel } from '@/components/ResourceIcon';
import { useTheme } from '@/lib/useTheme';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';
import { subpageNavItems } from '@/data/siteNav';
import { learningContent } from '@/lib/learningContent';

export default function VideosPage() {
  const { theme, toggleTheme } = useTheme();
  useRevealOnScroll();
  const { resources } = learningContent;

  return <div className="portfolio-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <Header items={subpageNavItems} activeId="learning" theme={theme} toggleTheme={toggleTheme} />

    <main id="main">
      <section className="content-section" style={{ paddingTop: 150 }}>
        <Link className="button ghost" href="/learning"><ArrowLeft /> Learning hub</Link>
        <SectionTitle number="06" label="Learning">Specialized <span>videos</span></SectionTitle>
        <p className="section-lead reveal-on-scroll" data-reveal="rise">Courses and videos I&apos;d point a teammate to — including my own curated infra &amp; cloud playlist.</p>

        <div className="resource-grid">{resources.map((r, i) => {
          const body = <><span className="resource-kind"><ResourceIcon kind={r.kind} /> {resourceLabel[r.kind]}</span><b>{r.title}</b><span>{r.creator}</span></>;
          return r.link
            ? <a key={r.title} className="resource-card glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': `${i * 60}ms` } as React.CSSProperties} href={r.link} target="_blank">{body}<ExternalLink className="resource-go" /></a>
            : <div key={r.title} className="resource-card resource-card-soon glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': `${i * 60}ms` } as React.CSSProperties}>{body}<span className="soon">Coming soon</span></div>;
        })}</div>
      </section>
    </main>
    <Footer />
  </div>;
}
