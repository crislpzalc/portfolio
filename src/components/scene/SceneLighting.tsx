"use client";

import { Environment } from "@react-three/drei";

export default function SceneLighting() {
  return (
    <>
      {/* Warm ambient fill — pink-tinted */}
      <ambientLight intensity={0.5} color="#fff0ee" />

      {/* Main key light — upper-right-front, warm rosy white, casts shadows */}
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.2}
        color="#fff0e8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />

      {/* Fill light from left — soft lavender */}
      <directionalLight
        position={[-4, 3, 1]}
        intensity={0.35}
        color="#eeddff"
      />

      {/* Soft point light near the microscope eyepiece — subtle pink glow */}
      <pointLight
        position={[0, 2.0, 0.1]}
        intensity={0.25}
        color="#ffaacc"
        distance={3}
        decay={2}
      />

      {/* Subtle back rim light for depth */}
      <directionalLight
        position={[-1, 4, -4]}
        intensity={0.2}
        color="#ffeef0"
      />

      {/* Environment map for realistic reflections on metals */}
      <Environment preset="apartment" />
    </>
  );
}
