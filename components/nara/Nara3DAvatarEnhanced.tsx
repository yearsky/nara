"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import { useNaraEmotionStore } from "@/stores/naraEmotionStore";
import * as THREE from "three";

interface Nara3DAvatarEnhancedProps {
  fullScreen?: boolean;
}

export function Nara3DAvatarEnhanced({ fullScreen = false }: Nara3DAvatarEnhancedProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/nara/nara-rpm.glb");

  // Get emotion state from Zustand store
  const { emotion, isSpeaking } = useNaraEmotionStore();

  // Animation parameters based on emotion
  const animationParams = useRef({
    rotationIntensity: 0.15,
    floatIntensity: 0.03,
    floatSpeed: 0.8,
  });

  // Update animation based on emotion
  useEffect(() => {
    switch (emotion) {
      case "happy":
        animationParams.current = {
          rotationIntensity: 0.2,
          floatIntensity: 0.05,
          floatSpeed: 1.2,
        };
        break;
      case "thinking":
        animationParams.current = {
          rotationIntensity: 0.08,
          floatIntensity: 0.02,
          floatSpeed: 0.5,
        };
        break;
      case "curious":
        animationParams.current = {
          rotationIntensity: 0.18,
          floatIntensity: 0.04,
          floatSpeed: 1.0,
        };
        break;
      case "encouraging":
        animationParams.current = {
          rotationIntensity: 0.15,
          floatIntensity: 0.04,
          floatSpeed: 0.9,
        };
        break;
      default: // neutral
        animationParams.current = {
          rotationIntensity: 0.15,
          floatIntensity: 0.03,
          floatSpeed: 0.8,
        };
    }
  }, [emotion]);

  // Idle animation with emotion-based variations
  useFrame((state) => {
    if (groupRef.current) {
      const { rotationIntensity, floatIntensity, floatSpeed } = animationParams.current;

      // Breathing/floating animation - intensity varies by emotion
      const breathingSpeed = isSpeaking ? floatSpeed * 1.5 : floatSpeed;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * breathingSpeed) * floatIntensity;

      // Mouse follow - more reactive when speaking
      const { pointer } = state;
      const followSpeed = isSpeaking ? 0.08 : 0.05;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * rotationIntensity,
        followSpeed
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * (rotationIntensity * 0.5),
        followSpeed
      );

      // Speaking animation - subtle head bob
      if (isSpeaking) {
        const speakingBob = Math.sin(state.clock.elapsedTime * 4) * 0.01;
        groupRef.current.position.y += speakingBob;
      }
    }
  });

  // Camera settings based on view mode
  const cameraSettings = fullScreen
    ? { position: [0, 0.3, 3.5] as [number, number, number], fov: 50 }
    : { position: [0, 0.5, 4] as [number, number, number], fov: 50 };

  return (
    <>
      {/* Camera Setup */}
      <PerspectiveCamera makeDefault position={cameraSettings.position} fov={cameraSettings.fov} />

      {/* Lighting - warm and inviting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.6}
        castShadow
      />

      {/* Rim light for depth */}
      <pointLight position={[-5, 2, -5]} intensity={0.5} color="#ff9966" />

      {/* Environment for realistic reflections */}
      <Environment preset="sunset" />

      {/* Character Model */}
      <group
        ref={groupRef}
        position={[0, fullScreen ? -0.3 : -0.5, 0]}
        scale={fullScreen ? 1.4 : 1.2}
      >
        <primitive object={scene} />
      </group>
    </>
  );
}

// Preload the model for faster initial render
useGLTF.preload("/models/nara/nara-rpm.glb");
