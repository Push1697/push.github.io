export default function SectionTitle({ number, label, children }: { number: string; label: string; children: React.ReactNode }) {
  return <div className="section-title reveal-on-scroll" data-reveal="rise">
    <div className="eyebrow"><i />{number} · {label}</div>
    <h2>{children}</h2>
    <svg className="title-accent" viewBox="0 0 160 6" aria-hidden="true"><path d="M2,3 H158" /></svg>
  </div>;
}
