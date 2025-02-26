import * as THREE from "three";
import { tileSize } from "../constants";

/**
 * Creates a tree mesh for the game.
 * @param tileIndex - The index of the tile where the tree will be placed.  Used to calculate the tree's x-coordinate.
 * @param height - The height of the tree's crown.  Affects the crown's dimensions and vertical position.
 * @returns A Three.js Group object representing the tree, including trunk and crown.
 */
export function Tree(tileIndex: number, height: number) {
  // Create a group to hold the tree's trunk and crown.  Using a group allows for easier manipulation of the entire tree as a single unit.
  const tree = new THREE.Group();
  // Set the tree's x-coordinate based on the tile index and tile size.  This ensures trees are correctly positioned on the game map.
  tree.position.x = tileIndex * tileSize;

  // Create the tree trunk mesh using a box geometry and a Lambert material.  The Lambert material provides a simple, non-shiny appearance.
  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20), // Dimensions of the trunk (width, height, depth)
    new THREE.MeshLambertMaterial({
      color: 0x4d2926, // Dark brown color for the trunk
      flatShading: true, // Use flat shading for a less smooth, more blocky appearance
    })
  );
  // Position the trunk vertically.
  trunk.position.z = 10;
  // Add the trunk to the tree group.
  tree.add(trunk);

  // Create the tree crown mesh using a box geometry and a Lambert material.  The height parameter determines the crown's height.
  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, height), // Dimensions of the crown (width, height, depth). Height is dynamic.
    new THREE.MeshLambertMaterial({
      color: 0x7aa21d, // Green color for the crown
      flatShading: true, // Use flat shading for a less smooth, more blocky appearance
    })
  );
  // Position the crown vertically, ensuring it sits on top of the trunk.
  crown.position.z = height / 2 + 20;
  // Enable shadow casting and receiving for the crown to enhance realism.
  crown.castShadow = true;
  crown.receiveShadow = true;
  // Add the crown to the tree group.
  tree.add(crown);

  // Return the complete tree group.
  return tree;
}
