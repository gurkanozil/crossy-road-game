import * as THREE from "three";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";

/**
 * Creates a truck mesh for the game.
 * @param initialTileIndex - The initial tile index of the truck.
 * @param direction - The direction the truck is moving (true for right, false for left).
 * @param color - The color of the truck cabin.
 * @returns A Three.js Group object representing the truck.
 */
export function Truck(
  initialTileIndex: number,
  direction: boolean,
  color: THREE.ColorRepresentation
) {
  // Create a group to hold all truck parts
  const truck = new THREE.Group();

  // Position the truck based on the initial tile index
  truck.position.x = initialTileIndex * tileSize;

  // Rotate the truck if it's moving to the left
  if (!direction) {
    // Apply a 180-degree rotation around the z-axis
    truck.rotation.z = Math.PI;
  }

  // Create the truck's cargo
  const cargo = new THREE.Mesh(
    new THREE.BoxGeometry(70, 35, 35),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  // Position the cargo
  cargo.position.set(-15, 0, 25); 
  // Enable shadows
  cargo.castShadow = true; 
  cargo.receiveShadow = true; 
  // Add cargo to the truck
  truck.add(cargo); 

  // Create the truck's cabin
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 30),
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  // Position the cabin
  cabin.position.set(35, 0, 20); 
  // Enable shadows
  cabin.castShadow = true; 
  cabin.receiveShadow = true; 
  // Add cabin to the truck
  truck.add(cabin); 

  // Create and add the wheels
  const frontWheel = Wheel(37); // Create the front wheel
  truck.add(frontWheel); // Add the front wheel to the truck group

  const middleWheel = Wheel(5); // Create the middle wheel
  truck.add(middleWheel); // Add the middle wheel to the truck group

  const backWheel = Wheel(-35); // Create the back wheel
  truck.add(backWheel); // Add the back wheel to the truck group

  // Return the truck group
  return truck;
}
