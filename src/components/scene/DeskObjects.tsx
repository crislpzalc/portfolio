"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";

export default function DeskObjects() {
  const screenRef = useRef<THREE.Mesh>(null);

  // Subtle screen flicker animation
  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    }
  });

  // ===== MATERIALS =====
  const silverMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4b8a8",
        metalness: 0.85,
        roughness: 0.2,
      }),
    []
  );

  const darkScreen = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0a12",
        emissive: "#2a1a30",
        emissiveIntensity: 0.15,
        metalness: 0.1,
        roughness: 0.3,
      }),
    []
  );

  const creamPaper = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f8f0e8",
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  const darkCover = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c8a0a8",
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );

  const penMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4a08a",
        metalness: 0.7,
        roughness: 0.3,
      }),
    []
  );

  const headphoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8d0c8",
        roughness: 0.6,
        metalness: 0.3,
      }),
    []
  );

  const headphonePad = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f0ddd5",
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  const ceramicWhite = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f5e8e2",
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  const coffeeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3a1f0a",
        roughness: 0.4,
        metalness: 0.1,
      }),
    []
  );

  const bookBlue = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a8b8d4",
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );

  const bookGreen = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a8c8b4",
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );

  const bookBurgundy = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4a8b8",
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );

  const boardingPassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8e0d0",
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  const ticketMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4c8a8",
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  // ===== Headband curve for headphones =====
  const headbandCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, 0.015, 0),
      new THREE.Vector3(-0.18, 0.015, -0.25),
      new THREE.Vector3(0, 0.015, -0.32),
      new THREE.Vector3(0.18, 0.015, -0.25),
      new THREE.Vector3(0.22, 0.015, 0),
    ]);
  }, []);

  return (
    <group dispose={null}>
      {/* =============================================== */}
      {/* LAPTOP — left side of desk                      */}
      {/* =============================================== */}
      <group position={[-1.8, 0.02, 0.3]} rotation={[0, 0.15, 0]}>
        {/* Laptop base */}
        <mesh material={silverMetal} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 1.0]} />
        </mesh>
        {/* Keyboard area (dark inset) */}
        <mesh position={[0, 0.03, 0.05]}>
          <boxGeometry args={[1.3, 0.005, 0.65]} />
          <meshStandardMaterial color="#3a3035" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.04, 0.35]}>
          <boxGeometry args={[0.5, 0.005, 0.25]} />
          <meshStandardMaterial color="#c8b8b0" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Screen (angled ~110 degrees from base = 20 deg back from vertical) */}
        <group position={[0, 0.025, -0.5]} rotation={[-1.22, 0, 0]}>
          {/* Screen back (silver) */}
          <mesh material={silverMetal} castShadow>
            <boxGeometry args={[1.5, 1.0, 0.03]} />
          </mesh>
          {/* Screen display surface */}
          <mesh ref={screenRef} position={[0, 0, 0.02]}>
            <boxGeometry args={[1.35, 0.88, 0.005]} />
            <meshStandardMaterial
              color="#0a0a12"
              emissive="#2a1a30"
              emissiveIntensity={0.15}
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
          {/* Subtle "code lines" on screen */}
          {[0.3, 0.2, 0.1, 0.0, -0.1, -0.2, -0.3].map((y, i) => (
            <mesh key={`line-${i}`} position={[-0.15 + (i % 3) * 0.08, y, 0.025]}>
              <boxGeometry args={[0.4 + (i % 2) * 0.2, 0.015, 0.001]} />
              <meshStandardMaterial
                color="#3a2a4a"
                emissive="#3a2a5a"
                emissiveIntensity={0.08}
                transparent
                opacity={0.4}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* =============================================== */}
      {/* NOTEBOOK / JOURNAL — near center, slightly right */}
      {/* =============================================== */}
      <group position={[0.6, 0.02, 0.6]} rotation={[0, -0.2, 0]}>
        {/* Back cover */}
        <mesh material={darkCover} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.04, 0.95]} />
        </mesh>
        {/* Pages stack */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={`page-${i}`}
            position={[i * 0.003 - 0.005, 0.025 + i * 0.005, i * 0.002]}
            rotation={[0, i * 0.008, 0]}
            material={creamPaper}
          >
            <boxGeometry args={[0.68, 0.003, 0.93]} />
          </mesh>
        ))}
        {/* Front cover (slightly open) */}
        <mesh
          position={[-0.02, 0.055, 0.005]}
          rotation={[0, 0.04, 0.02]}
          material={darkCover}
          castShadow
        >
          <boxGeometry args={[0.7, 0.025, 0.95]} />
        </mesh>
        {/* Elastic band */}
        <mesh position={[0.35, 0.04, 0]}>
          <boxGeometry args={[0.01, 0.06, 0.95]} />
          <meshStandardMaterial color="#c8a0b0" roughness={0.9} />
        </mesh>
      </group>

      {/* =============================================== */}
      {/* PEN — on the notebook                           */}
      {/* =============================================== */}
      <group position={[0.5, 0.1, 0.5]} rotation={[0, -0.5, Math.PI / 2 - 0.05]}>
        {/* Pen body */}
        <mesh material={penMaterial} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        </mesh>
        {/* Pen tip */}
        <mesh position={[0, -0.32, 0]}>
          <coneGeometry args={[0.02, 0.04, 8]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Pen clip */}
        <mesh position={[0, 0.2, 0.022]} material={silverMetal}>
          <boxGeometry args={[0.008, 0.18, 0.004]} />
        </mesh>
        {/* Pen cap ring */}
        <mesh position={[0, 0.12, 0]}>
          <torusGeometry args={[0.022, 0.003, 6, 12]} />
          <meshStandardMaterial color="#d4b0a0" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =============================================== */}
      {/* HEADPHONES — right side of desk                 */}
      {/* =============================================== */}
      <group position={[2.0, 0.02, 0.2]} rotation={[0, -0.4, 0]}>
        {/* Headband */}
        <mesh castShadow>
          <tubeGeometry args={[headbandCurve, 30, 0.025, 8, false]} />
          <meshStandardMaterial color="#d4c0b8" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Headband padding */}
        <mesh>
          <tubeGeometry args={[headbandCurve, 20, 0.032, 8, false]} />
          <meshStandardMaterial
            color="#e8d0c8"
            roughness={0.95}
            metalness={0}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Left ear cup */}
        <group position={[-0.22, 0.03, 0]}>
          <mesh material={headphoneMaterial} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.06, 20]} />
          </mesh>
          {/* Ear pad */}
          <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]} material={headphonePad}>
            <torusGeometry args={[0.09, 0.04, 8, 20]} />
          </mesh>
        </group>
        {/* Right ear cup */}
        <group position={[0.22, 0.03, 0]}>
          <mesh material={headphoneMaterial} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.06, 20]} />
          </mesh>
          {/* Ear pad */}
          <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]} material={headphonePad}>
            <torusGeometry args={[0.09, 0.04, 8, 20]} />
          </mesh>
        </group>
      </group>

      {/* =============================================== */}
      {/* BOOKS — small stack, back-left                  */}
      {/* =============================================== */}
      <group position={[-2.2, 0.02, -1.0]} rotation={[0, 0.1, 0]}>
        {/* Book 1 - dark blue (bottom) */}
        <mesh material={bookBlue} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.08, 0.8]} />
        </mesh>
        {/* Book 1 pages */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.55, 0.06, 0.78]} />
          <meshStandardMaterial color="#f0ead8" roughness={0.95} />
        </mesh>

        {/* Book 2 - forest green (middle) */}
        <mesh
          position={[0.03, 0.09, -0.02]}
          rotation={[0, -0.05, 0]}
          material={bookGreen}
          castShadow
        >
          <boxGeometry args={[0.55, 0.07, 0.75]} />
        </mesh>
        <mesh position={[0.05, 0.09, -0.02]} rotation={[0, -0.05, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.73]} />
          <meshStandardMaterial color="#f0ead8" roughness={0.95} />
        </mesh>

        {/* Book 3 - burgundy (top) */}
        <mesh
          position={[-0.05, 0.17, 0.01]}
          rotation={[0, 0.08, 0]}
          material={bookBurgundy}
          castShadow
        >
          <boxGeometry args={[0.52, 0.06, 0.72]} />
        </mesh>
        <mesh position={[-0.03, 0.17, 0.01]} rotation={[0, 0.08, 0]}>
          <boxGeometry args={[0.47, 0.04, 0.7]} />
          <meshStandardMaterial color="#f0ead8" roughness={0.95} />
        </mesh>
      </group>

      {/* =============================================== */}
      {/* COFFEE MUG — right-front of desk                */}
      {/* =============================================== */}
      <group position={[1.8, 0.15, 1.1]}>
        {/* Mug body */}
        <mesh material={ceramicWhite} castShadow>
          <cylinderGeometry args={[0.14, 0.12, 0.3, 20]} />
        </mesh>
        {/* Mug interior (dark) */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.125, 0.125, 0.04, 20]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.5} />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 20]} />
          <meshStandardMaterial
            color="#3a1f0a"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        {/* Mug handle - use a torus section */}
        <mesh
          position={[0.18, 0.02, 0]}
          rotation={[0, 0, 0]}
          material={ceramicWhite}
          castShadow
        >
          <torusGeometry args={[0.07, 0.02, 8, 12, Math.PI]} />
        </mesh>
        {/* Mug rim */}
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} material={ceramicWhite}>
          <torusGeometry args={[0.14, 0.008, 6, 24]} />
        </mesh>
      </group>

      {/* =============================================== */}
      {/* BOARDING PASS — scattered near front            */}
      {/* =============================================== */}
      <group position={[0.2, 0.02, 1.2]} rotation={[0, 0.35, 0]}>
        <mesh material={boardingPassMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.003, 0.15]} />
        </mesh>
        {/* Printed text lines */}
        {[0, 1, 2].map((i) => (
          <mesh key={`bp-line-${i}`} position={[-0.05 + i * 0.08, 0.004, 0]}>
            <boxGeometry args={[0.06, 0.001, 0.01]} />
            <meshStandardMaterial color="#888888" roughness={0.9} />
          </mesh>
        ))}
        {/* Barcode-like stripe */}
        <mesh position={[0.15, 0.004, 0.04]}>
          <boxGeometry args={[0.08, 0.001, 0.04]} />
          <meshStandardMaterial color="#8a7a7a" roughness={0.9} />
        </mesh>
      </group>

      {/* =============================================== */}
      {/* FOLDED PAPER / TICKET — near notebook           */}
      {/* =============================================== */}
      <group position={[1.0, 0.02, 0.85]} rotation={[0, -0.6, 0]}>
        {/* Folded ticket - two halves slightly angled */}
        <mesh
          position={[0, 0, -0.04]}
          rotation={[0.05, 0, 0]}
          material={ticketMaterial}
          castShadow
        >
          <boxGeometry args={[0.25, 0.003, 0.08]} />
        </mesh>
        <mesh
          position={[0, 0.005, 0.04]}
          rotation={[-0.05, 0, 0]}
          material={ticketMaterial}
          castShadow
        >
          <boxGeometry args={[0.25, 0.003, 0.08]} />
        </mesh>
      </group>

      {/* =============================================== */}
      {/* 3D UNIVERSITY LETTERS — back-right corner       */}
      {/* =============================================== */}
      {/* UC3M */}
      <group position={[1.6, 0.09, -1.4]} rotation={[0, -0.25, 0]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.json"
            size={0.18}
            height={0.1}
            letterSpacing={-0.03}
            bevelEnabled
            bevelThickness={0.008}
            bevelSize={0.005}
            curveSegments={12}
            castShadow
          >
            UC3M
            <meshStandardMaterial color="#003da5" roughness={0.35} metalness={0.3} />
          </Text3D>
        </Center>
      </group>

      {/* Texas A&M */}
      <group position={[2.3, 0.09, -1.45]} rotation={[0, -0.15, 0]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.json"
            size={0.14}
            height={0.08}
            letterSpacing={-0.025}
            bevelEnabled
            bevelThickness={0.008}
            bevelSize={0.005}
            curveSegments={12}
            castShadow
          >
            TAMU
            <meshStandardMaterial color="#500000" roughness={0.35} metalness={0.3} />
          </Text3D>
        </Center>
      </group>
    </group>
  );
}
