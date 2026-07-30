'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Component, useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';

const COLS = 72;
const ROWS = 44;
const SPACING = 0.32;
const COUNT = COLS * ROWS;

function WaveField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, baseX, baseZ } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseX = new Float32Array(COUNT);
    const baseZ = new Float32Array(COUNT);
    const cyan = new THREE.Color('#66e8ff');
    const violet = new THREE.Color('#a98cff');
    const emerald = new THREE.Color('#58dfa7');

    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * SPACING;
        const z = (r - ROWS / 2) * SPACING;
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        baseX[i] = x;
        baseZ[i] = z;

        const t = c / COLS;
        const tone = t < 0.55 ? cyan.clone().lerp(emerald, t / 0.55) : cyan.clone().lerp(violet, (t - 0.55) / 0.45);
        colors[i * 3] = tone.r;
        colors[i * 3 + 1] = tone.g;
        colors[i * 3 + 2] = tone.b;
        i++;
      }
    }
    return { positions, colors, baseX, baseZ };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = state.clock.elapsedTime;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const x = baseX[i];
      const z = baseZ[i];
      const y = Math.sin(x * 0.55 + t * 0.55) * 0.34
        + Math.cos(z * 0.42 - t * 0.42) * 0.28
        + Math.sin((x + z) * 0.22 + t * 0.3) * 0.18;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#070912', 3.2, 9.5]} />
      <group position={[0, -0.4, 0]} rotation={[-0.08, 0, 0]}>
        <WaveField />
      </group>
    </>
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

export default function GlobalWaveBackground() {
  return (
    <SceneErrorBoundary>
      <Canvas
        className="global-wave-canvas"
        dpr={[1, 1.4]}
        camera={{ position: [0, 2.1, 5.2], fov: 52 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, -0.3, -2);
        }}
      >
        <Scene />
      </Canvas>
    </SceneErrorBoundary>
  );
}
