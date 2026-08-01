'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { useTheme } from '@/lib/useTheme';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';
import { subpageNavItems } from '@/data/siteNav';
import { learningContent } from '@/lib/learningContent';

export default function PapershelfPage() {
  const { theme, toggleTheme } = useTheme();
  useRevealOnScroll();
  const { papershelf } = learningContent;

  return <div className="portfolio-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <Header items={subpageNavItems} activeId="learning" theme={theme} toggleTheme={toggleTheme} />

    <main id="main">
      <section className="content-section" style={{ paddingTop: 150 }}>
        <Link className="button ghost" href="/learning"><ArrowLeft /> Learning hub</Link>
        <SectionTitle number="06" label="Learning">Papershelf <span>({papershelf.length})</span></SectionTitle>
        <p className="section-lead reveal-on-scroll" data-reveal="rise">Research papers I&apos;ve read and found worth keeping.</p>

        {papershelf.length > 0 ? (
          <div className="bookshelf-grid">{papershelf.map((p, i) => <a key={p.title} className="book-card glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': `${i * 60}ms` } as React.CSSProperties} href={p.link} target="_blank"><FileText /><div><b>{p.title}</b><span>{p.authors}</span></div></a>)}</div>
        ) : (
          <div className="empty-panel glass reveal-on-scroll" data-reveal="rise"><FileText /><p>Building this list — the full papershelf will live at <a href="https://learning.overflowbyte.cloud" target="_blank">learning.overflowbyte.cloud</a>.</p></div>
        )}
      </section>
    </main>
    <Footer />
  </div>;
}
