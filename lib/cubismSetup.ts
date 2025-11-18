/**
 * Setup Cubism SDK untuk pixi-live2d-display
 * 
 * Catatan: Download Cubism SDK dari:
 * https://www.live2d.com/download/cubism-sdk/
 * 
 * Extract dan copy file live2dcubismcore.min.js ke /public/cubism/
 */

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      // Script already loading/loaded, wait for it
      const checkLoaded = setInterval(() => {
        if ((window as any).Live2DCubismCore || (window as any).CubismCore) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(checkLoaded);
        if ((window as any).Live2DCubismCore || (window as any).CubismCore) {
          resolve();
        } else {
          reject(new Error("Timeout waiting for existing script"));
        }
      }, 3000);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous"; // Allow CORS

    script.onload = () => {
      // Wait a bit for the global to be available
      setTimeout(() => {
        if ((window as any).Live2DCubismCore || (window as any).CubismCore) {
          console.log(`✓ Cubism SDK loaded from: ${src}`);
          resolve();
        } else {
          reject(new Error(`Script loaded but Live2DCubismCore not found: ${src}`));
        }
      }, 200);
    };

    script.onerror = (error) => {
      document.head.removeChild(script); // Clean up failed script
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
};

export const setupCubismSDK = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  // Check if already loaded
  if ((window as any).Live2DCubismCore || (window as any).CubismCore) {
    console.log("Cubism SDK already loaded");
    return true;
  }

  // Try to load from CDN sources
  const sources = [
    "/cubism/live2dcubismcore.min.js", // Local file (preferred)
    "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js", // Official CDN
    "https://cdn.jsdelivr.net/npm/@guansss/pixi-live2d-display/cubism4/live2dcubismcore.min.js", // Alternative CDN
  ];

  for (const src of sources) {
    try {
      console.log(`Attempting to load Cubism SDK from: ${src}`);
      await loadScript(src);
      const cubismCore = (window as any).Live2DCubismCore || (window as any).CubismCore;
      if (cubismCore) {
        console.log("Cubism SDK loaded successfully");
        return true;
      }
    } catch (error) {
      console.warn(`Failed to load from ${src}:`, error);
      continue;
    }
  }

  console.error("All Cubism SDK sources failed. Please download and host locally.");
  return false;
};

