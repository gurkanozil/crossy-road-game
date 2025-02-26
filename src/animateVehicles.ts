import * as THREE from "three";
import { metadata as rows } from "./components/Map";
import { minTileIndex, maxTileIndex, tileSize } from "./constants";

// Create a clock object to measure time elapsed between frames.
const clock = new THREE.Clock();

/**
 * Animates the vehicles in each row of the map.  Vehicles move horizontally across the screen.
 * The speed and direction of each vehicle is determined by the rowData.
 */
export function animateVehicles() {
  // Get the time elapsed since the last frame.
  const delta = clock.getDelta();

  // Iterate over each row of the map data.
  rows.forEach((rowData) => {
    // Check if the row contains cars or trucks.
    if (rowData.type === "car" || rowData.type === "truck") {
      // Calculate the boundaries of the row, extending beyond the visible area to allow for smooth looping.
      const beginningOfRow = (minTileIndex - 2) * tileSize;
      const endOfRow = (maxTileIndex + 2) * tileSize;

      // Iterate over each vehicle in the row.
      rowData.vehicles.forEach(({ ref }) => {
        // Check if the vehicle reference is valid. Throw an error if not.
        if (!ref) throw Error("Vehicle reference is missing");

        // Update the vehicle's position based on its direction and speed.
        // If the vehicle reaches the end of the row, it wraps around to the beginning.
        if (rowData.direction) {
          //If direction is true, move right
          ref.position.x =
            ref.position.x > endOfRow
              ? beginningOfRow
              : ref.position.x + rowData.speed * delta;
        } else {
          //If direction is false, move left
          ref.position.x =
            ref.position.x < beginningOfRow
              ? endOfRow
              : ref.position.x - rowData.speed * delta;
        }
      });
    }
  });
}
