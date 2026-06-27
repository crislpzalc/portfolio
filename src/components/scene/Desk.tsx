"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Desk() {
  const woodMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#dcc8b8",
        roughness: 0.75,
        metalness: 0.02,
      }),
    []
  );

  const darkWoodMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4b0a0",
        roughness: 0.8,
        metalness: 0.02,
      }),
    []
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d0bca8",
        roughness: 0.65,
        metalness: 0.05,
      }),
    []
  );

  const deskThickness = 0.1;
  const deskWidth = 6;
  const deskDepth = 4;
  const legHeight = 2.2;
  const legInset = 0.25;

  return (
    <group dispose={null}>
      {/* ========== DESKTOP SURFACE ========== */}
      <mesh
        position={[0, -deskThickness / 2, 0]}
        material={woodMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[deskWidth, deskThickness, deskDepth]} />
      </mesh>

      {/* Desktop edge trim (slightly darker strip around the perimeter) */}
      {/* Front edge */}
      <mesh position={[0, -deskThickness / 2, deskDepth / 2 - 0.02]} material={edgeMaterial}>
        <boxGeometry args={[deskWidth + 0.02, deskThickness + 0.02, 0.04]} />
      </mesh>
      {/* Back edge */}
      <mesh position={[0, -deskThickness / 2, -deskDepth / 2 + 0.02]} material={edgeMaterial}>
        <boxGeometry args={[deskWidth + 0.02, deskThickness + 0.02, 0.04]} />
      </mesh>
      {/* Left edge */}
      <mesh position={[-deskWidth / 2 + 0.02, -deskThickness / 2, 0]} material={edgeMaterial}>
        <boxGeometry args={[0.04, deskThickness + 0.02, deskDepth + 0.02]} />
      </mesh>
      {/* Right edge */}
      <mesh position={[deskWidth / 2 - 0.02, -deskThickness / 2, 0]} material={edgeMaterial}>
        <boxGeometry args={[0.04, deskThickness + 0.02, deskDepth + 0.02]} />
      </mesh>

      {/* ========== DESK LEGS ========== */}
      {[
        [-deskWidth / 2 + legInset, -deskDepth / 2 + legInset],
        [deskWidth / 2 - legInset, -deskDepth / 2 + legInset],
        [-deskWidth / 2 + legInset, deskDepth / 2 - legInset],
        [deskWidth / 2 - legInset, deskDepth / 2 - legInset],
      ].map(([x, z], i) => (
        <group key={`leg-${i}`}>
          {/* Main leg */}
          <mesh
            position={[x, -(deskThickness + legHeight / 2), z]}
            material={darkWoodMaterial}
            castShadow
          >
            <boxGeometry args={[0.12, legHeight, 0.12]} />
          </mesh>
          {/* Leg top bracket */}
          <mesh
            position={[x, -(deskThickness + 0.04), z]}
            material={darkWoodMaterial}
          >
            <boxGeometry args={[0.18, 0.08, 0.18]} />
          </mesh>
          {/* Leg foot cap */}
          <mesh
            position={[x, -(deskThickness + legHeight + 0.01), z]}
            material={edgeMaterial}
          >
            <boxGeometry args={[0.14, 0.03, 0.14]} />
          </mesh>
        </group>
      ))}

      {/* ========== CROSS BRACES (structural detail under the desk) ========== */}
      {/* Front cross brace */}
      <mesh
        position={[0, -(deskThickness + legHeight * 0.7), deskDepth / 2 - legInset]}
        material={darkWoodMaterial}
      >
        <boxGeometry args={[deskWidth - legInset * 2 - 0.12, 0.06, 0.06]} />
      </mesh>
      {/* Back cross brace */}
      <mesh
        position={[0, -(deskThickness + legHeight * 0.7), -(deskDepth / 2 - legInset)]}
        material={darkWoodMaterial}
      >
        <boxGeometry args={[deskWidth - legInset * 2 - 0.12, 0.06, 0.06]} />
      </mesh>
    </group>
  );
}
