import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constants";

/**
 * Creates a road mesh for the game.
 * @param rowIndex - The row index of the road.
 * @returns A Three.js Group object representing the road.
 */
export function Road(rowIndex: number) {
  // Create a group to hold the road mesh
  const road = new THREE.Group();
  // Position the road based on the row index
  road.position.y = rowIndex * tileSize;

  // Create the road foundation mesh
  const foundation = new THREE.Mesh(
    // Create a plane geometry for the foundation
    new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize),
    // Create a Lambert material for the foundation with a dark gray color
    new THREE.MeshLambertMaterial({ color: 0x454a59 })
  );
  // Add the foundation to the road group
  road.add(foundation);

  // Return the road group
  return road;
}
