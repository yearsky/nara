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
        // Enable shadow casting for all meshes
        if (child instanceof THREE.Mesh || child instanceof THREE.SkinnedMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }

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
  const idleAnim = useGLTF("/animations/F_Standing_Idle_001.glb");

  // Combine model animations with RPM animations (talking + idle)
  const animations = React.useMemo(() => {
    const combinedAnims = [...(modelAnimations || [])];

    // Add talking animation if loaded
    if (talkingAnim1.animations && talkingAnim1.animations.length > 0) {
      combinedAnims.push(...talkingAnim1.animations);
      console.log('Loaded RPM talking animation:', talkingAnim1.animations.length, 'clips');
    }

    // Add idle animation if loaded
    if (idleAnim.animations && idleAnim.animations.length > 0) {
      combinedAnims.push(...idleAnim.animations);
      console.log('Loaded RPM idle animation:', idleAnim.animations.length, 'clips');
    }

    return combinedAnims;
  }, [modelAnimations, talkingAnim1, idleAnim]);

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
        // Play idle animation when not speaking
        const idleAction = actions["F_Standing_Idle_001"] ||
                          actions["idle"] ||
                          actions["Idle"] ||
                          actions[Object.keys(actions)[0]];

        if (idleAction) {
          console.log('✅ Playing idle animation');
          idleAction.reset().fadeIn(0.5).play();
          idleAction.setLoop(THREE.LoopRepeat, Infinity);
        } else {
          console.log('⚠️ No idle animation found, using procedural');
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

  // Subtle procedural animation (complement RPM animations)
  useFrame((state) => {
    if (groupRef.current) {
      const { rotationIntensity, floatIntensity, floatSpeed } = animationParams.current;

      // Very subtle breathing - let RPM idle animation handle main movement
      const breathingSpeed = floatSpeed * 0.5;
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * breathingSpeed) * floatIntensity * 0.0005;

      // Mouse follow - subtle and smooth
      const { pointer } = state;
      const followSpeed = 0.03; // Slower for smoother movement

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * rotationIntensity * 0.5, // Reduced intensity
        followSpeed
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * (rotationIntensity * 0.25), // Reduced intensity
        followSpeed
      );
    }
  });

  // Camera settings: optimized for grounded perspective
  const cameraSettings = fullScreen
    ? isMobile
      ? { position: [0, 0.3, 5.5] as [number, number, number], fov: 60 } // Mobile fullscreen
      : { position: [0, 0.2, 5.2] as [number, number, number], fov: 50 }   // Desktop fullscreen - lower angle for ground contact
    : isMobile
      ? { position: [0, 0.2, 5] as [number, number, number], fov: 55 }   // Mobile circular
      : { position: [0, 0.5, 4] as [number, number, number], fov: 50 };  // Desktop circular

  return (
    <>
      {/* Camera Setup */}
      <PerspectiveCamera makeDefault position={cameraSettings.position} fov={cameraSettings.fov} />

      {/* Realistic Studio Lighting Setup */}
      {/* Ambient fill light - softer for realism */}
      <ambientLight intensity={0.5} color="#fffaed" />

      {/* Key light - main directional with high-quality shadows */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.4}
        color="#fff8e7"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
        shadow-radius={4}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={0.6}
        color="#ffeaa7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Ceiling spotlight for dramatic effect */}
      <spotLight
        position={[0, 8, -2]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.0}
        color="#ffeb99"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Rim lights for separation and depth */}
      <pointLight position={[-6, 3, -3]} intensity={0.6} color="#ffd700" castShadow />
      <pointLight position={[6, 2, -3]} intensity={0.5} color="#ffdd66" />

      {/* Subtle floor bounce light */}
      <pointLight position={[0, -1, 0]} intensity={0.3} color="#f5deb3" />

      {/* Wall accent lights */}
      <pointLight position={[0, 3, -4.5]} intensity={0.4} color="#fffacd" distance={5} />

      {/* Warm sunny environment */}
      <Environment preset="sunset" />

      {/* ========== REALISTIC 3D ROOM STRUCTURE ========== */}

      {/* FLOOR - Multi-layered realistic floor */}
      {/* Main floor surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial
          color="#f5deb3"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      {/* Floor planks/tiles pattern for realism */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`floor-line-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-6 + i * 1.7, -1.48, 0]}
        >
          <planeGeometry args={[0.05, 12]} />
          <meshStandardMaterial color="#daa520" opacity={0.3} transparent />
        </mesh>
      ))}

      {/* Floor center accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, -1]}>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.6}
          metalness={0.15}
          opacity={0.2}
          transparent
        />
      </mesh>

      {/* BACK WALL - Main wall with depth */}
      <mesh position={[0, 1.5, -5]} receiveShadow castShadow>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial
          color="#f5f5dc"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* Wall wainscoting (panel bawah dinding) */}
      <mesh position={[0, -0.3, -4.95]}>
        <planeGeometry args={[15, 2.4]} />
        <meshStandardMaterial
          color="#f0e68c"
          roughness={0.85}
        />
      </mesh>

      {/* Wall chair rail (pembatas panel) */}
      <mesh position={[0, 0.9, -4.9]}>
        <boxGeometry args={[15, 0.08, 0.12]} />
        <meshStandardMaterial color="#daa520" />
      </mesh>

      {/* CORNER WALLS - Left and Right for depth */}
      {/* Left wall */}
      <mesh position={[-7.5, 1.5, -0.5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 12]} />
        <meshStandardMaterial
          color="#f0e68c"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[7.5, 1.5, -0.5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 12]} />
        <meshStandardMaterial
          color="#f0e68c"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* BASEBOARDS - Floor trim */}
      {/* Back wall baseboard */}
      <mesh position={[0, -1.35, -4.9]}>
        <boxGeometry args={[15, 0.15, 0.15]} />
        <meshStandardMaterial color="#cd853f" />
      </mesh>

      {/* Left wall baseboard */}
      <mesh position={[-7.4, -1.35, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9, 0.15, 0.15]} />
        <meshStandardMaterial color="#cd853f" />
      </mesh>

      {/* Right wall baseboard */}
      <mesh position={[7.4, -1.35, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[9, 0.15, 0.15]} />
        <meshStandardMaterial color="#cd853f" />
      </mesh>

      {/* CEILING - Realistic ceiling with details */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, -0.5]} receiveShadow>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial
          color="#fffaf0"
          roughness={0.98}
          side={2}
        />
      </mesh>

      {/* Ceiling crown molding */}
      {/* Back wall crown */}
      <mesh position={[0, 5.3, -4.85]}>
        <boxGeometry args={[15, 0.2, 0.2]} />
        <meshStandardMaterial color="#f0e68c" />
      </mesh>

      {/* Left wall crown */}
      <mesh position={[-7.4, 5.3, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9, 0.2, 0.2]} />
        <meshStandardMaterial color="#f0e68c" />
      </mesh>

      {/* Right wall crown */}
      <mesh position={[7.4, 5.3, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[9, 0.2, 0.2]} />
        <meshStandardMaterial color="#f0e68c" />
      </mesh>

      {/* DECORATIVE ELEMENTS */}
      {/* Wall decorative stripe/accent */}
      <mesh position={[0, 3, -4.92]}>
        <boxGeometry args={[10, 0.08, 0.06]} />
        <meshStandardMaterial color="#daa520" metalness={0.3} />
      </mesh>

      {/* Corner shadow enhancers for depth */}
      <mesh position={[-7.3, 1.5, -4.8]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.3, 12, 0.3]} />
        <meshStandardMaterial color="#8b7355" opacity={0.3} transparent />
      </mesh>

      <mesh position={[7.3, 1.5, -4.8]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.3, 12, 0.3]} />
        <meshStandardMaterial color="#8b7355" opacity={0.3} transparent />
      </mesh>

      {/* Contact Shadow - directly under character for grounding */}
      {/* Outer soft shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.475, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.15} transparent />
      </mesh>

      {/* Inner darker shadow for feet contact */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.47, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.5} transparent />
      </mesh>

      {/* Character Model - responsive positioning */}
      <group
        ref={groupRef}
        position={[
          0,
          fullScreen
            ? isMobile ? -1.48 : -1.42  // Fullscreen: feet firmly on floor
            : isMobile ? -0.7 : -0.5,   // Circular: lower on mobile
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
useGLTF.preload("/animations/F_Standing_Idle_001.glb");
