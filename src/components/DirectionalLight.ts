import * as THREE from "three";

/**
 * Creates and configures a Three.js DirectionalLight.  This light casts shadows, providing more realistic lighting in the scene.
 * The light's position, shadow map size, and shadow camera frustum are carefully adjusted to ensure optimal shadow rendering.
 * @returns A Three.js DirectionalLight instance.
 */
export function DirectionalLight() {
  // Create a new DirectionalLight instance.  Directional lights cast light from a single direction.
  const dirLight = new THREE.DirectionalLight();
  // Set the light's position.  This determines the direction from which the light shines.
  dirLight.position.set(-100, -100, 200);
  // Set the light's up direction.  This affects how the light's shadows are cast.
  dirLight.up.set(0, 0, 1);
  // Enable shadow casting for the light.  This allows the light to cast shadows on objects in the scene.
  dirLight.castShadow = true;

  // Set the size of the shadow map.  Larger maps result in higher-resolution shadows but require more processing power.
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  // Configure the shadow camera.  The shadow camera determines the area of the scene that is included in the shadows.
  dirLight.shadow.camera.up.set(0, 0, 1); // Set the camera's up direction.
  dirLight.shadow.camera.left = -400; // Set the left boundary of the camera's frustum.
  dirLight.shadow.camera.right = 400; // Set the right boundary of the camera's frustum.
  dirLight.shadow.camera.top = 400; // Set the top boundary of the camera's frustum.
  dirLight.shadow.camera.bottom = -400; // Set the bottom boundary of the camera's frustum.
  dirLight.shadow.camera.near = 50; // Set the near clipping plane of the camera.
  dirLight.shadow.camera.far = 400; // Set the far clipping plane of the camera.

  // Return the configured DirectionalLight instance.
  return dirLight;
}
