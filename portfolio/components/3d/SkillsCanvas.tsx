"use client";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  name: string;
  level: number;
  category: string;
  color?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#00d4ff",
  Frontend: "#a855f7",
  Backend: "#10b981",
  Database: "#f59e0b",
  Cloud: "#3388ff",
  DevOps: "#06b6d4",
  Systems: "#ec4899",
  AI: "#7c3aed",
  Security: "#ef4444",
};

function SkillNode({
  skill,
  position,
  onHover,
}: {
  skill: Skill;
  position: [number, number, number];
  onHover: (name: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[skill.category] || "#00d4ff";
  const size = 0.12 + (skill.level / 100) * 0.18;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + position[0]) * 0.15;
    const s = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => { setHovered(true); onHover(skill.name); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.8}
          transparent
          opacity={hovered ? 1 : 0.75}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, size + 0.2, 0]}
          fontSize={0.18}
          color={color}
          anchorX="center"
          anchorY="bottom"
          font="https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRUEZ2RQ.woff2"
        >
          {skill.name}
        </Text>
      )}
    </group>
  );
}

function Connections({ positions }: { positions: [number, number, number][] }) {
  const lines = useMemo(() => {
    const result: [number, number, number, number, number, number][] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3.5) {
          result.push([...positions[i], ...positions[j]] as [
            number,number,number,number,number,number
          ]);
        }
      }
    }
    return result;
  }, [positions]);

  const posArray = useMemo(() => {
    const arr = new Float32Array(lines.length * 6);
    lines.forEach((line, i) => {
      arr[i * 6] = line[0]; arr[i * 6 + 1] = line[1]; arr[i * 6 + 2] = line[2];
      arr[i * 6 + 3] = line[3]; arr[i * 6 + 4] = line[4]; arr[i * 6 + 5] = line[5];
    });
    return arr;
  }, [lines]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posArray, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.08} />
    </lineSegments>
  );
}

function Scene({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  const positions = useMemo<[number, number, number][]>(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      return [
        5.5 * Math.cos(theta) * Math.sin(phi),
        5.5 * Math.sin(theta) * Math.sin(phi),
        5.5 * Math.cos(phi),
      ];
    });
  }, [skills]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.1 + mouse.x * 0.3;
    groupRef.current.rotation.x = mouse.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Connections positions={positions} />
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          onHover={() => {}}
        />
      ))}
    </group>
  );
}

export default function SkillsCanvas({ skills }: { skills: Skill[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={1} />
      <Scene skills={skills} />
    </Canvas>
  );
}
