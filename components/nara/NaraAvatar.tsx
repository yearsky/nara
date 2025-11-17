"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useNaraEmotionStore } from "@/stores/naraEmotionStore";

// Dynamic import untuk Live2D (code splitting)
const loadLive2D = async () => {
  const [{ Application }, { Live2DModel }] = await Promise.all([
    import("pixi.js"),
    import("pixi-live2d-display"),
  ]);
  return { Application, Live2DModel };
};

interface NaraAvatarProps {
  className?: string;
}

export const NaraAvatar = ({ className }: NaraAvatarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { emotion, isSpeaking } = useNaraEmotionStore();
  const lipSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initPixi = async () => {
      try {
        const { Application, Live2DModel } = await loadLive2D();
        
        const app = new Application();
        await app.init({
          view: canvasRef.current!,
          backgroundColor: 0xffffff,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          resizeTo: canvasRef.current.parentElement || window,
        });

        appRef.current = app;

        // Load Live2D model
        const model = await Live2DModel.from("/models/nara/hiyori_free_t08.model3.json");
        modelRef.current = model;

        // Center and scale model
        const resizeModel = () => {
          if (!model || !app) return;
          const scale = Math.min(
            (app.screen.width * 0.8) / model.width,
            (app.screen.height * 0.8) / model.height
          );
          model.scale.set(scale);
          model.x = app.screen.width / 2;
          model.y = app.screen.height / 2;
        };

        resizeModel();
        app.stage.addChild(model);

        // Enable hit detection
        model.interactive = true;
        model.on("pointertap", () => {
          // Tap interaction - trigger idle motion
          model.motion("Idle", 0);
        });

        // Idle motion loop
        const playIdle = () => {
          if (model) {
            model.motion("Idle", 0);
          }
        };
        const idleInterval = setInterval(playIdle, 10000);

        // Handle window resize
        window.addEventListener("resize", resizeModel);

        setIsLoading(false);

        return () => {
          clearInterval(idleInterval);
          window.removeEventListener("resize", resizeModel);
        };
      } catch (err) {
        console.error("Failed to initialize Live2D:", err);
        setError("Gagal memuat avatar Nara");
        setIsLoading(false);
      }
    };

    initPixi();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
      }
    };
  }, []);

  // Lip sync implementation
  useEffect(() => {
    if (!modelRef.current) return;

    if (isSpeaking) {
      lipSyncIntervalRef.current = setInterval(() => {
        if (modelRef.current) {
          const mouthOpen = 0.2 + Math.random() * 0.8;
          modelRef.current.internalModel.coreModel.setParameterValueById(
            "ParamMouthOpenY",
            mouthOpen
          );
        }
      }, 100);
    } else {
      if (lipSyncIntervalRef.current) {
        clearInterval(lipSyncIntervalRef.current);
        lipSyncIntervalRef.current = null;
      }
      if (modelRef.current) {
        modelRef.current.internalModel.coreModel.setParameterValueById(
          "ParamMouthOpenY",
          0
        );
      }
    }

    return () => {
      if (lipSyncIntervalRef.current) {
        clearInterval(lipSyncIntervalRef.current);
      }
    };
  }, [isSpeaking]);

  // Emotion-based motion (fallback ke Idle karena model hanya punya Idle motion)
  useEffect(() => {
    if (!modelRef.current) return;
    // Model Hiyori hanya punya "Idle" motion, jadi selalu play Idle
    // Emotion changes bisa di-handle via parameter adjustments nanti
    modelRef.current.motion("Idle", 0);
  }, [emotion]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B4513]" />
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

