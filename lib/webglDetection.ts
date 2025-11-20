/**
 * Detect WebGL support in the browser
 * Returns true if WebGL is available, false otherwise
 */
export function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
}

/**
 * Get WebGL performance tier
 * Returns 'high', 'medium', or 'low' based on device capabilities
 */
export function getWebGLPerformanceTier(): "high" | "medium" | "low" {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");

    if (!gl) return "low";

    // Check for common performance indicators
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const rendererLower = renderer.toLowerCase();

      // High-end GPUs
      if (
        rendererLower.includes("nvidia") ||
        rendererLower.includes("amd") ||
        rendererLower.includes("radeon") ||
        rendererLower.includes("geforce")
      ) {
        return "high";
      }

      // Low-end indicators (software renderers, old Intel)
      if (
        rendererLower.includes("swiftshader") ||
        rendererLower.includes("microsoft basic") ||
        rendererLower.includes("intel(r) hd graphics 3000")
      ) {
        return "low";
      }
    }

    // Default to medium if we can't determine
    return "medium";
  } catch (e) {
    return "low";
  }
}
