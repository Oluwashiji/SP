"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const dotsRef = useRef<THREE.Points>(null!);

  const dotPositions = (() => {
    const pos: number[] = [];
    for (let i = 0; i < 1200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 1200);
      const theta = Math.sqrt(1200 * Math.PI) * phi;
      const r = 2.5;
      pos.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(pos);
  })();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    sphereRef.current.rotation.y = t * 0.15;
    wireRef.current.rotation.y = t * 0.1;
    dotsRef.current.rotation.y = t * 0.12;
  });

  return (
    <group>
      {/* Inner sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#001133"
          emissiveIntensity={1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Dots */}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00d4ff"
          size={0.04}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.015, 16, 80]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={2} />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[0.4, 0, 0.2]}>
        <torusGeometry args={[3.2, 0.01, 16, 80]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} transparent opacity={0.5}/>
      </mesh>

      {/* Ping dot on globe */}
      <mesh position={[2.2, 0.5, 0.8]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={4} />
      </mesh>
    </group>
  );
}

export default function GlobeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={3} />
      <pointLight position={[-5, -5, 5]} color="#7c3aed" intensity={2} />
      <Globe />
    </Canvas>
  );
}
