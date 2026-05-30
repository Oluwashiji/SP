"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04 + mouse.x * 0.1;
    ref.current.rotation.x = t * 0.02 + mouse.y * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function NeuralConnections() {
  const ref = useRef<THREE.LineSegments>(null!);

  const { positions, indices } = useMemo(() => {
    const nodeCount = 60;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8
        )
      );
    }
    const positions: number[] = [];
    const maxDist = 4;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return { positions: new Float32Array(positions), indices: [] };
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.2;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#7c3aed"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.3;
    ringRef.current.rotation.z = t * 0.4;
    ringRef.current.rotation.x = t * 0.2;
    ring2Ref.current.rotation.z = -t * 0.3;
    ring2Ref.current.rotation.y = t * 0.5;
  });

  return (
    <group position={[4, 0, -3]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#0066ff"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.02, 16, 60]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.015, 16, 60]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null!);

  const orbs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          Math.cos((i / 8) * Math.PI * 2) * 6,
          (Math.random() - 0.5) * 4,
          Math.sin((i / 8) * Math.PI * 2) * 3,
        ] as [number, number, number],
        color: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#10b981",
        scale: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.5 + 0.3,
        offset: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}
    </group>
  );
}

function FloatingOrb({
  position,
  color,
  scale,
  speed,
  offset,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.5;
    ref.current.scale.setScalar(scale + Math.sin(t * 2 + offset) * 0.02);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={1} />
        <ParticleField />
        <NeuralConnections />
        <AICore />
        <FloatingOrbs />
        <fog attach="fog" args={["#050505", 15, 35]} />
      </Canvas>
    </div>
  );
}
