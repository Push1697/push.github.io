'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, FileText, ListVideo, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { useTheme } from '@/lib/useTheme';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';
import { subpageNavItems } from '@/data/siteNav';
import { learningRoadmap } from '@/data/learningRoadmap';
import { learningContent } from '@/lib/learningContent';

export default function LearningHub() {
  const { theme, toggleTheme } = useTheme();
  useRevealOnScroll();
  const { thisWeek } = learningContent;

  return <div className="portfolio-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <Header items={subpageNavItems} activeId="learning" theme={theme} toggleTheme={toggleTheme} />

    <main id="main">
      <section className="content-section" style={{ paddingTop: 150 }}>
        <Link className="button ghost" href="/"><ArrowLeft /> Back to portfolio</Link>
        <SectionTitle number="06" label="Learning">Expanding the <span>operating surface</span></SectionTitle>

        <div className="learning-grid">{learningRoadmap.map(({ title, status, icon: Icon, items }, i) => <article className="learning-card glass reveal-on-scroll" data-reveal="tilt-left" style={{ '--delay': `${i * 80}ms` } as React.CSSProperties} key={title}><div><span className="icon-box"><Icon /></span><b>{status}</b></div><h3>{title}</h3><ul>{items.map((item) => <li key={item}><i />{item}</li>)}</ul></article>)}</div>

        <div className="this-week glass reveal-on-scroll" data-reveal="rise">
          <div className="eyebrow"><i /> This week</div>
          <div className="this-week-grid">
            <div className="this-week-item"><span className="icon-box"><Sparkles /></span><div><b>Focus</b><span>{thisWeek.focus}</span></div></div>
            <div className="this-week-item"><span className="icon-box violet"><BookOpen /></span><div><b>Reading</b>{thisWeek.book ? <a href={thisWeek.book.link} target="_blank">{thisWeek.book.title} — {thisWeek.book.author}</a> : <span className="soon">Updating soon</span>}</div></div>
            <div className="this-week-item"><span className="icon-box"><FileText /></span><div><b>Paper · last 15 days</b>{thisWeek.paper ? <a href={thisWeek.paper.link} target="_blank">{thisWeek.paper.title}</a> : <span className="soon">Updating soon</span>}</div></div>
          </div>
          <a className="sync-link" href="https://learning.overflowbyte.cloud" target="_blank"><ExternalLink /> Full log synced at learning.overflowbyte.cloud</a>
        </div>

        <div className="sub-head reveal-on-scroll" data-reveal="rise"><h3>Explore the library</h3><p>Books, papers, and specialized videos I&apos;d point a teammate to.</p></div>
        <div className="resource-grid">
          <Link href="/learning/bookshelf" className="resource-card glass reveal-on-scroll" data-reveal="rise">
            <span className="resource-kind"><BookOpen /> Bookshelf</span>
            <b>Bookshelf</b>
            <span>Books shaping how I think about systems and engineering.</span>
          </Link>
          <Link href="/learning/papershelf" className="resource-card glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': '60ms' } as React.CSSProperties}>
            <span className="resource-kind"><FileText /> Papershelf</span>
            <b>Papershelf</b>
            <span>Research papers I&apos;ve read and found worth keeping.</span>
          </Link>
          <Link href="/learning/videos" className="resource-card glass reveal-on-scroll" data-reveal="rise" style={{ '--delay': '120ms' } as React.CSSProperties}>
            <span className="resource-kind"><ListVideo /> Videos</span>
            <b>Specialized videos</b>
            <span>Recommended courses and my own curated playlist.</span>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
