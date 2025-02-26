import * as THREE from "three";

/**
 * Creates a wheel mesh for vehicles.
 * @param x - The x-coordinate offset for the wheel's position.  Adjust this value to position the wheel correctly relative to its parent vehicle.
 * @returns A Three.js Mesh object representing the wheel.
 */
export function Wheel(x: number) {
  // Create the wheel mesh using a box geometry and a Lambert material.  The Lambert material provides a simple, non-shiny appearance.
  const wheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12), // Dimensions of the wheel (width, height, depth)
    new THREE.MeshLambertMaterial({
      color: 0x333333, // Dark gray color for the wheel
      flatShading: true, // Use flat shading for a less smooth, more blocky appearance
    })
  );
  // Set the wheel's position.  The x-coordinate is determined by the input parameter, allowing for flexible placement.  The z-coordinate is fixed to position the wheel slightly above the ground.
  wheel.position.x = x;
  wheel.position.z = 6;
  // Return the created wheel mesh.
  return wheel;
}
