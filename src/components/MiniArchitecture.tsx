export type ArchKind = 'aws-vpc' | 'n8n' | 'nextcloud' | 'k8s-gitops' | 'monitoring' | 'talos';

type ArchNode = { x: number; y: number; label: string };
type ArchSpec = { nodes: ArchNode[]; paths: [number, number][]; badge: string };

const SPECS: Record<ArchKind, ArchSpec> = {
  'aws-vpc': {
    nodes: [
      { x: 10, y: 36, label: 'NET' },
      { x: 42, y: 36, label: 'ALB' },
      { x: 74, y: 18, label: 'ASG' },
      { x: 74, y: 54, label: 'ASG' },
    ],
    paths: [[0, 1], [1, 2], [1, 3]],
    badge: 'VPC',
  },
  n8n: {
    nodes: [
      { x: 10, y: 36, label: 'SSL' },
      { x: 42, y: 36, label: 'NGX' },
      { x: 76, y: 20, label: 'n8n' },
      { x: 76, y: 52, label: 'VOL' },
    ],
    paths: [[0, 1], [1, 2], [2, 3]],
    badge: 'DKR',
  },
  nextcloud: {
    nodes: [
      { x: 10, y: 36, label: 'NGX' },
      { x: 42, y: 36, label: 'NC' },
      { x: 76, y: 20, label: 'PG' },
      { x: 76, y: 52, label: 'AMI' },
    ],
    paths: [[0, 1], [1, 2], [1, 3]],
    badge: 'AWS',
  },
  'k8s-gitops': {
    nodes: [
      { x: 8, y: 36, label: 'GIT' },
      { x: 38, y: 36, label: 'CD' },
      { x: 70, y: 18, label: 'POD' },
      { x: 70, y: 36, label: 'POD' },
      { x: 70, y: 54, label: 'POD' },
    ],
    paths: [[0, 1], [1, 2], [1, 3], [1, 4]],
    badge: 'K8S',
  },
  monitoring: {
    nodes: [
      { x: 10, y: 20, label: 'HOST' },
      { x: 10, y: 52, label: 'HOST' },
      { x: 44, y: 36, label: 'ZBX' },
      { x: 78, y: 36, label: 'ALRT' },
    ],
    paths: [[0, 2], [1, 2], [2, 3]],
    badge: 'OPS',
  },
  talos: {
    nodes: [
      { x: 8, y: 36, label: 'BSH' },
      { x: 40, y: 36, label: 'CP' },
      { x: 74, y: 18, label: 'WRK' },
      { x: 74, y: 54, label: 'WRK' },
    ],
    paths: [[0, 1], [1, 2], [1, 3]],
    badge: 'TALOS',
  },
};

export default function MiniArchitecture({ kind }: { kind: ArchKind }) {
  const spec = SPECS[kind];
  return (
    <div className="mini-architecture">
      <svg className="arch-svg" viewBox="0 0 100 72" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {spec.paths.map(([a, b], i) => {
          const from = spec.nodes[a];
          const to = spec.nodes[b];
          return (
            <g key={i}>
              <path className="arch-path" d={`M${from.x},${from.y} L${to.x},${to.y}`} style={{ '--path-i': i } as React.CSSProperties} />
              <circle className="arch-packet" r="1.4" style={{ '--path-i': i, offsetPath: `path('M${from.x},${from.y} L${to.x},${to.y}')` } as React.CSSProperties} />
            </g>
          );
        })}
        {spec.nodes.map((node, i) => (
          <g key={i} className="arch-node" style={{ '--node-i': i } as React.CSSProperties}>
            <circle cx={node.x} cy={node.y} r="6.4" />
            <text x={node.x} y={node.y + 2.4} textAnchor="middle">{node.label}</text>
          </g>
        ))}
      </svg>
      <b className="arch-tag">{spec.badge}</b>
    </div>
  );
}
