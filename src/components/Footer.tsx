export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="brand"><b>PD</b><span><strong>Pushpendra Dev</strong>Infrastructure System Engineer</span></div>
      <p>Designed around infrastructure, reliability, and continuous learning.</p>
      <span>© {year} · Pushpendra Dev</span>
    </footer>
  );
}
