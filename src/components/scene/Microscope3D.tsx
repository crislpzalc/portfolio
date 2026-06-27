"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface MicroscopeProps {
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  hovered: boolean;
}

export default function Microscope3D({
  onHover,
  onClick,
  hovered,
}: MicroscopeProps) {
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Animate the glow ring intensity on hover
  useFrame((_state, delta) => {
    const target = hovered ? 0.3 : 0;
    [darkMetal, brushedMetal, chromeMetal, stageColor].forEach((mat) => {
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity, target, delta * 5
      );
    });
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity, hovered ? 2.0 : 0, delta * 5
      );
    }
  });

  // Shared materials
  const darkMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b89a88",
        metalness: 0.8,
        roughness: 0.3,
        emissive: "#e8b4bc",
        emissiveIntensity: 0,
      }),
    []
  );

  const brushedMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c8aa96",
        metalness: 0.85,
        roughness: 0.25,
        emissive: "#e8b4bc",
        emissiveIntensity: 0,
      }),
    []
  );

  const chromeMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4b8a8",
        metalness: 0.95,
        roughness: 0.15,
        emissive: "#e8b4bc",
        emissiveIntensity: 0,
      }),
    []
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ccaadd",
        metalness: 0.0,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.2,
        ior: 1.5,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const stageColor = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a89888",
        metalness: 0.7,
        roughness: 0.4,
        emissive: "#e8b4bc",
        emissiveIntensity: 0,
      }),
    []
  );

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      onClick={onClick}
    >
      {/* ========== BASE PLATFORM ========== */}
      <mesh position={[0, -1.4, 0]} material={darkMetal} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.15, 0.9, 2, 2, 2]} />
      </mesh>
      {/* Base top bevel */}
      <mesh position={[0, -1.3, 0]} material={darkMetal} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
      </mesh>
      {/* Base feet - small rounded bumps */}
      {[
        [-0.5, -1.5, -0.35],
        [0.5, -1.5, -0.35],
        [-0.5, -1.5, 0.35],
        [0.5, -1.5, 0.35],
      ].map((pos, i) => (
        <mesh key={`foot-${i}`} position={pos as [number, number, number]} material={darkMetal}>
          <cylinderGeometry args={[0.04, 0.05, 0.04, 12]} />
        </mesh>
      ))}

      {/* ========== VERTICAL PILLAR / ARM ========== */}
      {/* Main pillar */}
      <mesh position={[0, -0.3, -0.3]} material={brushedMetal} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 2.1, 16]} />
      </mesh>
      {/* Pillar-base junction */}
      <mesh position={[0, -1.28, -0.3]} material={darkMetal} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.15, 16]} />
      </mesh>
      {/* Arm bracket (connects pillar to body tube) */}
      <mesh position={[0, 0.6, -0.15]} material={brushedMetal} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.35]} />
      </mesh>

      {/* ========== STAGE ========== */}
      {/* Main stage plate */}
      <mesh position={[0, -0.65, 0.05]} material={stageColor} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.06, 0.7]} />
      </mesh>
      {/* Stage aperture ring */}
      <mesh position={[0, -0.61, 0.05]} material={chromeMetal}>
        <torusGeometry args={[0.12, 0.02, 8, 24]} />
      </mesh>
      {/* Stage clips */}
      <mesh position={[-0.25, -0.6, 0.05]} material={chromeMetal} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.04]} />
      </mesh>
      <mesh position={[0.25, -0.6, 0.05]} material={chromeMetal} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.04]} />
      </mesh>
      {/* Clip fingers */}
      <mesh position={[-0.18, -0.6, 0.05]} material={chromeMetal}>
        <boxGeometry args={[0.02, 0.03, 0.1]} />
      </mesh>
      <mesh position={[0.18, -0.6, 0.05]} material={chromeMetal}>
        <boxGeometry args={[0.02, 0.03, 0.1]} />
      </mesh>

      {/* ========== FOCUS KNOBS ========== */}
      {/* Coarse focus - left */}
      <mesh
        position={[-0.22, -0.3, -0.3]}
        rotation={[0, 0, Math.PI / 2]}
        material={darkMetal}
        castShadow
      >
        <cylinderGeometry args={[0.1, 0.1, 0.08, 24]} />
      </mesh>
      {/* Coarse focus - right */}
      <mesh
        position={[0.22, -0.3, -0.3]}
        rotation={[0, 0, Math.PI / 2]}
        material={darkMetal}
        castShadow
      >
        <cylinderGeometry args={[0.1, 0.1, 0.08, 24]} />
      </mesh>
      {/* Fine focus knobs (smaller, below coarse) */}
      <mesh
        position={[-0.26, -0.3, -0.3]}
        rotation={[0, 0, Math.PI / 2]}
        material={brushedMetal}
        castShadow
      >
        <cylinderGeometry args={[0.06, 0.06, 0.04, 24]} />
      </mesh>
      <mesh
        position={[0.26, -0.3, -0.3]}
        rotation={[0, 0, Math.PI / 2]}
        material={brushedMetal}
        castShadow
      >
        <cylinderGeometry args={[0.06, 0.06, 0.04, 24]} />
      </mesh>
      {/* Knob grip lines (decorative rings) */}
      {[-0.22, 0.22].map((x, i) => (
        <mesh
          key={`knob-ring-${i}`}
          position={[x, -0.3, -0.3]}
          rotation={[0, 0, Math.PI / 2]}
          material={chromeMetal}
        >
          <torusGeometry args={[0.1, 0.005, 6, 24]} />
        </mesh>
      ))}

      {/* ========== BODY TUBE ========== */}
      <mesh position={[0, 0.85, 0.05]} material={brushedMetal} castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.7, 16]} />
      </mesh>
      {/* Body tube collar */}
      <mesh position={[0, 0.52, 0.05]} material={darkMetal} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.06, 16]} />
      </mesh>

      {/* ========== REVOLVING NOSEPIECE ========== */}
      {/* Nosepiece disc */}
      <mesh position={[0, 0.48, 0.05]} material={darkMetal} castShadow>
        <cylinderGeometry args={[0.14, 0.12, 0.06, 24]} />
      </mesh>

      {/* Objective lenses - 3 at different angles */}
      {[
        { angle: 0, length: 0.28 },
        { angle: (2 * Math.PI) / 3, length: 0.22 },
        { angle: (4 * Math.PI) / 3, length: 0.18 },
      ].map((obj, i) => {
        const lensX = Math.sin(obj.angle) * 0.06;
        const lensZ = Math.cos(obj.angle) * 0.06 + 0.05;
        return (
          <group key={`lens-${i}`} position={[lensX, 0.44, lensZ]}>
            {/* Lens barrel */}
            <mesh material={chromeMetal} castShadow>
              <cylinderGeometry args={[0.025, 0.03, obj.length, 12]} />
            </mesh>
            {/* Lens tip */}
            <mesh position={[0, -obj.length / 2 - 0.01, 0]} material={glassMaterial}>
              <sphereGeometry args={[0.025, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
            {/* Colored ring identifier */}
            <mesh position={[0, -0.02, 0]}>
              <torusGeometry args={[0.028, 0.003, 6, 16]} />
              <meshStandardMaterial
                color={["#e8a0b0", "#a0c8b8", "#d4c0a0"][i]}
                emissive={["#e8a0b0", "#a0c8b8", "#d4c0a0"][i]}
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* ========== EYEPIECE ========== */}
      <group position={[0, 1.35, 0.05]}>
        {/* Eyepiece tube */}
        <mesh material={brushedMetal} castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.35, 16]} />
        </mesh>
        {/* Eyepiece collar */}
        <mesh position={[0, -0.12, 0]} material={darkMetal}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
        </mesh>
        {/* Eyepiece rubber cup */}
        <mesh position={[0, 0.16, 0]} material={darkMetal}>
          <cylinderGeometry args={[0.085, 0.075, 0.06, 16]} />
        </mesh>

        {/* Glass lens surface (interactive - this is the clickable area) */}
        <mesh
          position={[0, 0.2, 0]}
          material={glassMaterial}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
        </mesh>

        {/* Glow ring (visible when hovered) */}
        <mesh ref={glowRef} position={[0, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.09, 0.01, 12, 32]} />
          <meshStandardMaterial
            color="#d4a0c8"
            emissive="#d4a0c8"
            emissiveIntensity={0}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* ========== CONDENSER (below stage) ========== */}
      <mesh position={[0, -0.8, 0.05]} material={darkMetal} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.2, 12]} />
      </mesh>
      {/* Condenser lens */}
      <mesh position={[0, -0.68, 0.05]} material={glassMaterial}>
        <sphereGeometry args={[0.055, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  );
}
