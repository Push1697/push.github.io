export function SplitLetters({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`split-word ${className ?? ''}`}>
      {text.split('').map((char, i) => (
        <span className="split-letter" style={{ '--i': i } as React.CSSProperties} key={`${char}-${i}`}>
          {char}
        </span>
      ))}
    </span>
  );
}
