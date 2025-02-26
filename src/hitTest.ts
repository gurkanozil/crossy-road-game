import * as THREE from "three";
import { metadata as rows } from "./components/Map";
import { player, position } from "./components/Player";

// Get DOM elements for displaying game results.  These should exist in the HTML.
const resultDOM = document.getElementById("result-container");
const finalScoreDOM = document.getElementById("final-score");

/**
 * Checks for collisions between the player and vehicles.
 * If a collision is detected, the game over screen is displayed, showing the final score.
 */
export function hitTest() {
  // Get the current row from the map data. Subtract 1 because rows are 0-indexed.
  const row = rows[position.currentRow - 1];
  // If the row is not found (e.g., out of bounds), return early.
  if (!row) return;

  // Check if the row contains cars or trucks.
  if (row.type === "car" || row.type === "truck") {
    // Create a bounding box for the player.
    const playerBoundingBox = new THREE.Box3();
    playerBoundingBox.setFromObject(player);

    // Iterate over the vehicles in the row.
    row.vehicles.forEach(({ ref }) => {
      // Check if the vehicle reference is valid.  Throw an error if not.
      if (!ref) throw Error("Vehicle reference is missing");

      // Create a bounding box for the vehicle.
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(ref);

      // Check for intersection between the player and vehicle bounding boxes.
      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        // Check if the DOM elements exist before accessing them.  Return early if not.
        if (!resultDOM || !finalScoreDOM) return;
        // Display the game over screen and set the final score.
        resultDOM.style.visibility = "visible";
        finalScoreDOM.innerText = position.currentRow.toString();
      }
    });
  }
}
