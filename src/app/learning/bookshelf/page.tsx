'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { useTheme } from '@/lib/useTheme';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';
import { subpageNavItems } from '@/data/siteNav';
import { learningContent } from '@/lib/learningContent';

export default function BookshelfPage() {
  const { theme, toggleTheme } = useTheme();
  useRevealOnScroll();
  const { bookshelf } = learningContent;

  return <div className="portfolio-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <Header items={subpageNavItems} activeId="learning" theme={theme} toggleTheme={toggleTheme} />

    <main id="main">
      <section className="content-section" style={{ paddingTop: 150 }}>
        <Link className="button ghost" href="/learning"><ArrowLeft /> Learning hub</Link>
        <SectionTitle number="06" label="Learning">Bookshelf <span>({bookshelf.length})</span></SectionTitle>
        <p className="section-lead reveal-on-scroll" data-reveal="rise">Books shaping how I think about systems and engineering.</p>

        {bookshelf.length > 0 ? (
          <div className="bookshelf-grid">{bookshelf.map((b, i) => <a key={b.title} className="book-card glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': `${i * 60}ms` } as React.CSSProperties} href={b.link} target="_blank"><BookOpen /><div><b>{b.title}</b><span>{b.author}</span></div></a>)}</div>
        ) : (
          <div className="empty-panel glass reveal-on-scroll" data-reveal="rise"><BookOpen /><p>Building this list — the full shelf will live at <a href="https://learning.overflowbyte.cloud" target="_blank">learning.overflowbyte.cloud</a>.</p></div>
        )}
      </section>
    </main>
    <Footer />
  </div>;
}
