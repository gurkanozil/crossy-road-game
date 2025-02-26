import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constants";

/**
 * Creates a grass patch mesh.  This is the base layer for each row in the game.
 * @param rowIndex - The index of the row. Used to calculate the vertical position of the grass.
 * @returns A Three.js Group object representing the grass patch.  The group contains a foundation mesh.
 */
export function Grass(rowIndex: number) {
  // Create a group to hold the grass foundation. Using a group allows for easier manipulation of the grass patch as a single unit.
  const grass = new THREE.Group();
  // Set the y-coordinate of the grass based on the row index and tile size. This ensures correct vertical positioning on the game map.
  grass.position.y = rowIndex * tileSize;

  // Create the grass foundation mesh using a box geometry and a Lambert material. The Lambert material provides a simple, non-shiny appearance.
  const foundation = new THREE.Mesh(
    // Dimensions of the foundation (width, height, depth). Width is calculated based on tilesPerRow and tileSize.
    new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
    new THREE.MeshLambertMaterial({ color: 0xbaf455 }) // Light green color for the grass
  );
  // Position the foundation slightly above the ground.
  foundation.position.z = 1.5;
  // Enable shadow receiving for the foundation to enhance realism.
  foundation.receiveShadow = true;
  // Add the foundation to the grass group.
  grass.add(foundation);

  // Return the complete grass group.
  return grass;
}
