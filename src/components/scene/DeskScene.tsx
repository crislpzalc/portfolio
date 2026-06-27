"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import Microscope3D from "./Microscope3D";
import Desk from "./Desk";
import DeskObjects from "./DeskObjects";
import SceneLighting from "./SceneLighting";

interface Props {
  onMicroscopeClick: () => void;
  onZoomComplete: () => void;
  zooming: boolean;
  microscopeHovered: boolean;
  onMicroscopeHover: (h: boolean) => void;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const EYEPIECE_LOOK = new THREE.Vector3(0.2, 3.0, -0.15);
const CAMERA_END = new THREE.Vector3(0.2, 3.4, -0.13);
const ORBIT_CENTER = new THREE.Vector3(0, 0.5, 0);

function CameraZoom({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const { camera } = useThree();
  const progress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const tempVec = useRef(new THREE.Vector3());
  const started = useRef(false);
  const completed = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useFrame((_, delta) => {
    if (!active) {
      if (started.current) {
        if (camera instanceof THREE.PerspectiveCamera && camera.fov !== 40) {
          camera.fov = 40;
          camera.updateProjectionMatrix();
        }
      }
      progress.current = 0;
      started.current = false;
      completed.current = false;
      return;
    }

    if (completed.current) return;

    if (!started.current) {
      startPos.current.copy(camera.position);
      started.current = true;
    }

    progress.current = Math.min(1, progress.current + delta * 0.55);
    const t = easeInOutCubic(progress.current);

    camera.position.lerpVectors(startPos.current, CAMERA_END, t);
    tempVec.current.lerpVectors(ORBIT_CENTER, EYEPIECE_LOOK, t);
    camera.lookAt(tempVec.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(40, 25, t);
      camera.updateProjectionMatrix();
    }

    if (progress.current >= 1) {
      completed.current = true;
      onCompleteRef.current();
    }
  });

  return null;
}

function SceneContent({
  onMicroscopeClick,
  microscopeHovered,
  onMicroscopeHover,
  zooming,
}: Omit<Props, "onZoomComplete">) {
  return (
    <>
      <SceneLighting />
      <Desk />
      <DeskObjects />

      <group position={[0.2, 1.5, -0.2]}>
        <Microscope3D
          hovered={microscopeHovered && !zooming}
          onHover={(h) => {
            if (!zooming) onMicroscopeHover(h);
          }}
          onClick={() => {
            if (!zooming) onMicroscopeClick();
          }}
        />
      </group>

      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.5}
        scale={12}
        blur={2.5}
        far={4}
        color="#8a7060"
      />
    </>
  );
}

export default function DeskScene({
  onMicroscopeClick,
  onZoomComplete,
  zooming,
  microscopeHovered,
  onMicroscopeHover,
}: Props) {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 3, 6.5], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneContent
          onMicroscopeClick={onMicroscopeClick}
          zooming={zooming}
          microscopeHovered={microscopeHovered}
          onMicroscopeHover={onMicroscopeHover}
        />
      </Suspense>

      <CameraZoom active={zooming} onComplete={onZoomComplete} />

      <OrbitControls
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={3}
        maxDistance={8}
        enablePan={false}
        autoRotate={!zooming}
        autoRotateSpeed={0.3}
        target={[0, 0.5, 0]}
        enableDamping
        dampingFactor={0.05}
        enabled={!zooming}
      />
    </Canvas>
  );
}
