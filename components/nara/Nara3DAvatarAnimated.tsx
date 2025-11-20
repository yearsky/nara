"use client";

import { useRef, useEffect } from "react";
import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useFBX, useAnimations, PerspectiveCamera, Environment } from "@react-three/drei";
import { useNaraEmotionStore } from "@/stores/naraEmotionStore";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

interface Nara3DAvatarAnimatedProps {
  fullScreen?: boolean;
}

/**
 * Advanced 3D Avatar with RPM Animation Support
 * Features:
 * - Emotion-based animations
 * - Speaking animations (Talking Variations from RPM)
 * - Idle animations with variations
 * - Mouse tracking
 * - Responsive camera & positioning
 */
export function Nara3DAvatarAnimated({ fullScreen = false }: Nara3DAvatarAnimatedProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sceneRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/nara/nara-rpm.glb");

  // Use original scene directly (cloning breaks SkinnedMesh skeleton binding)
  const scene = React.useMemo(() => {
    // Clone scene with proper skeleton binding using SkeletonUtils
    const cloned = SkeletonUtils.clone(gltf.scene);
    return cloned;
  }, [gltf.scene]);
  const modelAnimations = React.useMemo(() => gltf.animations, [gltf.animations]);

  // Debug: Log model loading with detailed geometry info
  React.useEffect(() => {
    console.log('=== Model Debug Info ===');
    console.log('Has scene:', !!scene);
    console.log('Animations:', modelAnimations?.length || 0);
    console.log('Scene children:', scene?.children?.length || 0);

    // Check if scene has actual geometry and skeleton
    if (scene) {
      let skinnedMeshCount = 0;
      scene.traverse((child) => {
        if (child instanceof THREE.SkinnedMesh) {
          skinnedMeshCount++;
          console.log('✅ Found SkinnedMesh:', child.name, {
            hasSkeleton: !!child.skeleton,
            boneCount: child.skeleton?.bones?.length || 0,
            hasGeometry: !!child.geometry,
            hasMaterial: !!child.material
          });
        } else if ((child as THREE.Mesh).isMesh) {
          console.log('⚠️ Found regular Mesh (not skinned):', child.name);
        }
        if ((child as any).isBone) {
          console.log('Found bone:', child.name);
        }
      });
      console.log(`Total SkinnedMeshes: ${skinnedMeshCount}`);
    }
    console.log('========================');
  }, [scene, modelAnimations]);

  // Get emotion state from Zustand store
  const { emotion, isSpeaking } = useNaraEmotionStore();

  // Load RPM animations (GLB format - official from GitHub)
  // Using variant 002 for more natural hand poses
  const talkingAnim1 = useGLTF("/animations/F_Talking_Variations_002.glb");

  // Combine model animations with RPM talking animation
  const animations = React.useMemo(() => {
    const combinedAnims = [...(modelAnimations || [])];

    // Add talking animation if loaded
    if (talkingAnim1.animations && talkingAnim1.animations.length > 0) {
      combinedAnims.push(...talkingAnim1.animations);
      console.log('Loaded RPM talking animation:', talkingAnim1.animations.length, 'clips');
    }

    return combinedAnims;
  }, [modelAnimations, talkingAnim1]);

  // Setup animation mixer - CRITICAL: attach to scene ref, not group ref
  const { actions, mixer } = useAnimations(animations, sceneRef);

  // Animation parameters based on emotion
  const animationParams = useRef({
    rotationIntensity: 0.15,
    floatIntensity: 0.03,
    floatSpeed: 0.8,
  });

  // Responsive detection
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Debug: Log mixer and actions state
  useEffect(() => {
    if (mixer && actions) {
      console.log('=== Animation Mixer Debug ===');
      console.log('Mixer root:', mixer.getRoot());
      console.log('SceneRef current:', sceneRef.current);
      console.log('Available actions:', Object.keys(actions));
      console.log('============================');
    }
  }, [mixer, actions]);

  // Play animations based on state
  useEffect(() => {
    if (!actions) {
      console.warn('⚠️ No actions available');
      return;
    }

    if (!mixer) {
      console.warn('⚠️ No mixer available');
      return;
    }

    try {
      console.log('=== Animation Playback ===');
      console.log('isSpeaking:', isSpeaking);
      console.log('Available actions:', Object.keys(actions));

      // Stop all current animations
      Object.values(actions).forEach((action) => action?.stop());

      if (isSpeaking) {
        // Try to play RPM talking animation first
        const talkingKey = Object.keys(actions).find(key =>
          key.includes('alk') || key.includes('Talking')
        );
        const talkingAction = actions["F_Talking_Variations_002"] ||
                             actions["F_Talking_Variations_001"] ||
                             actions["mixamo.com"] ||
                             (talkingKey ? actions[talkingKey] : null);

        if (talkingAction) {
          console.log('✅ Playing RPM talking animation:', talkingKey || 'Auto-detected');
          talkingAction.reset().fadeIn(0.3).play();
          talkingAction.setLoop(THREE.LoopRepeat, Infinity);

          // Debug action state
          console.log('Action state:', {
            isRunning: talkingAction.isRunning(),
            time: talkingAction.time,
            timeScale: talkingAction.timeScale,
            weight: talkingAction.getEffectiveWeight()
          });
        } else {
          console.log('❌ No talking animation found, using procedural');
        }
      } else {
        // Play idle or emotion-specific animation
        const idleAction = actions["idle"] || actions["Idle"] || actions[Object.keys(actions)[0]];

        if (idleAction) {
          idleAction.reset().fadeIn(0.3).play();
          idleAction.setLoop(THREE.LoopRepeat, Infinity);
        }
      }
      console.log('=========================');

      return () => {
        Object.values(actions).forEach((action) => action?.fadeOut(0.3));
      };
    } catch (error) {
      console.error('❌ Animation playback error:', error);
    }
  }, [isSpeaking, emotion, actions, mixer]);

  // Procedural idle animation (works even without animation files)
  useFrame((state) => {
    if (groupRef.current) {
      const { rotationIntensity, floatIntensity, floatSpeed } = animationParams.current;

      // Breathing/floating animation - intensity varies by emotion
      const breathingSpeed = isSpeaking ? floatSpeed * 1.5 : floatSpeed;
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * breathingSpeed) * floatIntensity * 0.001;

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

      // Speaking animation - procedural fallback if RPM not playing
      if (isSpeaking) {
        const hasTalkingAnim = Object.keys(actions).some(key =>
          key.includes('alk') || key.includes('Talking')
        );
        if (!hasTalkingAnim) {
          const speakingBob = Math.sin(state.clock.elapsedTime * 4) * 0.01;
          groupRef.current.position.y += speakingBob;
        }
      }
    }
  });

  // Camera settings: aggressive zoom out for full body view
  const cameraSettings = fullScreen
    ? isMobile
      ? { position: [0, 0.5, 5.5] as [number, number, number], fov: 60 } // Mobile fullscreen - much wider view
      : { position: [0, 0.8, 5] as [number, number, number], fov: 55 }   // Desktop fullscreen - wider view
    : isMobile
      ? { position: [0, 0.2, 5] as [number, number, number], fov: 55 }   // Mobile circular
      : { position: [0, 0.5, 4] as [number, number, number], fov: 50 };  // Desktop circular

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

      {/* Character Model - responsive positioning */}
      <group
        ref={groupRef}
        position={[
          0,
          fullScreen
            ? isMobile ? -1.2 : -0.8  // Fullscreen: much lower to show head
            : isMobile ? -0.7 : -0.5, // Circular: lower on mobile
          0
        ]}
        scale={
          fullScreen
            ? isMobile ? 1.0 : 1.2  // Fullscreen: smaller scale for full body view
            : isMobile ? 1.1 : 1.2  // Circular: smaller on mobile
        }
      >
        <primitive ref={sceneRef} object={scene} />
      </group>
    </>
  );
}

// Preload the model and animations for faster initial render
useGLTF.preload("/models/nara/nara-rpm.glb");
useGLTF.preload("/animations/F_Talking_Variations_002.glb");
