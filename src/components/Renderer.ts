import * as THREE from "three";

/**
 * Creates and configures a Three.js WebGLRenderer.  This renderer is responsible for drawing the 3D scene to the canvas.
 * The renderer is configured with alpha enabled for transparency, antialiasing for smoother edges, and shadow mapping for realistic lighting.
 * @returns A Three.js WebGLRenderer instance.  Throws an error if a canvas element with the class "game" is not found in the DOM.
 */
export function Renderer() {
  // Get the canvas element from the DOM.  The canvas should have the class "game".
  const canvas = document.querySelector("canvas.game");
  // Throw an error if the canvas element is not found.
  if (!canvas) throw new Error("Canvas element with class 'game' not found.");

  // Create a new WebGLRenderer instance with alpha, antialias, and canvas specified.
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // Enables transparency
    antialias: true, // Enables antialiasing for smoother edges
    canvas: canvas, // Specifies the canvas element to render to
  });
  // Set the pixel ratio to match the device's pixel density for high-resolution displays.
  renderer.setPixelRatio(window.devicePixelRatio);
  // Set the renderer's size to match the browser window's dimensions.
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Enable shadow mapping for realistic lighting effects.
  renderer.shadowMap.enabled = true;

  // Return the configured renderer instance.
  return renderer;
}
