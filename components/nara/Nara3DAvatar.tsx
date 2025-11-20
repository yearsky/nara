"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

export function Nara3DAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/nara/nara-rpm.glb");

  // Subtle idle animation - breathing and gentle mouse follow
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation (breathing effect)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;

      // Subtle rotation to follow mouse
      const { pointer } = state;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.08,
        0.05
      );
    }
  });

  return (
    <>
      {/* Camera Setup */}
      <PerspectiveCamera makeDefault position={[0, 0.2, 2.5]} fov={45} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* Environment for realistic reflections */}
      <Environment preset="sunset" />

      {/* Character Model */}
      <group ref={groupRef} position={[0, -1, 0]} scale={1.8}>
        <primitive object={scene} />
      </group>
    </>
  );
}

// Preload the model for faster initial render
useGLTF.preload("/models/nara/nara-rpm.glb");
