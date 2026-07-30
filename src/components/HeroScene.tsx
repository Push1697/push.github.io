'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Component, useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';

type Vec2 = readonly [number, number];

// Mirrors the node layout used by the HTML topology markers in page.tsx.
const NODE_POSITIONS: Vec2[] = [
  [50, 8], [82, 27], [91, 58], [75, 83], [40, 90], [15, 76], [8, 44], [22, 20],
];

const ACCENTS = ['#66e8ff', '#58dfa7', '#ffc46b'] as const;

function toScene([x, y]: Vec2): [number, number, number] {
  return [(x - 50) / 50, -(y - 50) / 50, (x * 13 % 7) / 60 - 0.06];
}

function ConnectionLine({ target, color }: { target: [number, number, number]; color: string }) {
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...target),
    ]);
    const material = new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return new THREE.Line(geometry, material);
  }, [target, color]);
  return <primitive object={line} />;
}

function NodeMarker({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6 + index) * 0.14;
    mesh.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.028, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function Packet({ target, color, offset, duration }: { target: [number, number, number]; color: string; offset: number; duration: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const dest = useMemo(() => new THREE.Vector3(...target), [target]);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = ((state.clock.elapsedTime + offset) % duration) / duration;
    mesh.position.lerpVectors(origin, dest, t);
    mesh.visible = t > 0.03 && t < 0.94;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function OrbitRing({ radius, thickness, tilt, speed, color }: { radius: number; thickness: number; tilt: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <ringGeometry args={[radius - thickness, radius, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function RadarSweep() {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const segments = 24;
    const arc = Math.PI / 5;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * arc;
      shape.lineTo(Math.cos(angle) * 1.05, Math.sin(angle) * 1.05);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 0.45;
  });
  return (
    <mesh ref={ref} geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="#66e8ff" transparent opacity={0.09} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const targets = useMemo(() => NODE_POSITIONS.map((n) => toScene(n)), []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const tiltY = state.pointer.x * 0.16;
    const tiltX = -state.pointer.y * 0.12;
    g.rotation.y += (tiltY - g.rotation.y) * 0.04;
    g.rotation.x += (tiltX - g.rotation.x) * 0.04;
    g.rotation.z += 0.0006;
  });

  return (
    <group ref={group}>
      <OrbitRing radius={0.62} thickness={0.004} tilt={0} speed={0.05} color="#66e8ff" />
      <OrbitRing radius={0.95} thickness={0.003} tilt={0.05} speed={-0.03} color="#ffc46b" />
      <RadarSweep />
      {targets.map((target, i) => (
        <ConnectionLine key={i} target={target} color={ACCENTS[i % ACCENTS.length]} />
      ))}
      {targets.map((target, i) => (
        <NodeMarker key={i} position={target} color={ACCENTS[i % ACCENTS.length]} index={i} />
      ))}
      {targets.map((target, i) => (
        <Packet key={i} target={target} color={ACCENTS[(i + 1) % ACCENTS.length]} offset={i * 0.9} duration={3.4 + (i % 4) * 0.6} />
      ))}
    </group>
  );
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function HeroScene() {
  return (
    <SceneErrorBoundary>
      <Canvas
        className="topology-canvas"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene />
      </Canvas>
    </SceneErrorBoundary>
  );
}
