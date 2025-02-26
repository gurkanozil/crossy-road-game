import * as THREE from "three";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";

/**
 * Creates a car mesh for the game.
 * @param initialTileIndex - The initial tile index of the car.
 * @param direction - The direction the car is moving (true for right, false for left).
 * @param color - The color of the car.
 * @returns A Three.js Group object representing the car.
 */
export function Car(
  initialTileIndex: number,
  direction: boolean,
  color: THREE.ColorRepresentation
) {
  // Create a group to hold all car parts
  const car = new THREE.Group();

  // Position the car based on the initial tile index
  car.position.x = initialTileIndex * tileSize;

  // Rotate the car if it's moving to the left
  if (!direction) {
    // Apply a 180-degree rotation around the z-axis
    car.rotation.z = Math.PI;
  }

  // Create the main body of the car
  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  // Position the main body
  main.position.z = 12;
  // Enable shadow casting and receiving
  main.castShadow = true;
  main.receiveShadow = true;
  // Add the main body to the car group
  car.add(main);

  // Create the cabin of the car
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(33, 24, 10),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  // Position the cabin
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  // Enable shadow casting and receiving
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  // Add the cabin to the car group
  car.add(cabin);

  // Create and add the front wheel
  const frontWheel = Wheel(18);
  car.add(frontWheel);

  // Create and add the back wheel
  const backWheel = Wheel(-18);
  car.add(backWheel);

  // Return the car group
  return car;
}
