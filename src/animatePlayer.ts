import * as THREE from "three";
import {
  player,
  position,
  movesQueue,
  stepCompleted,
} from "./components/Player";
import { tileSize } from "./constants";

// Create a clock to time the player's movements
const moveClock = new THREE.Clock(false);

/**
 * Animates the player's movement based on the movesQueue.
 */
export function animatePlayer() {
  // If there are no moves in the queue, return
  if (!movesQueue.length) return;

  // Start the clock if it's not already running
  if (!moveClock.running) moveClock.start();

  // Define the time it takes to complete one step
  const stepTime = 0.2; // Seconds it takes to take a step
  // Calculate the progress of the current step
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  // Update the player's position and rotation based on the progress
  setPosition(progress);
  setRotation(progress);

  // Once a step has ended
  if (progress >= 1) {
    // Complete the step, stop the clock, and reset the progress
    stepCompleted();
    moveClock.stop();
  }
}

/**
 * Updates the player's position based on the current move and progress.
 * @param progress - The progress of the current step (0-1).
 */
function setPosition(progress: number) {
  // Get the starting position of the player
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  // Initialize the ending position to the starting position
  let endX = startX;
  let endY = startY;

  // Calculate the ending position based on the direction of the move
  if (movesQueue[0] === "left") endX -= tileSize;
  if (movesQueue[0] === "right") endX += tileSize;
  if (movesQueue[0] === "forward") endY += tileSize;
  if (movesQueue[0] === "backward") endY -= tileSize;

  // Use linear interpolation to smoothly move the player between the start and end positions
  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  // Add a bobbing effect to the player's z-position
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

/**
 * Updates the player's rotation based on the current move and progress.
 * @param progress - The progress of the current step (0-1).
 */
function setRotation(progress: number) {
  // Initialize the ending rotation to 0
  let endRotation = 0;
  // Calculate the ending rotation based on the direction of the move
  if (movesQueue[0] == "forward") endRotation = 0;
  if (movesQueue[0] == "left") endRotation = Math.PI / 2;
  if (movesQueue[0] == "right") endRotation = -Math.PI / 2;
  if (movesQueue[0] == "backward") endRotation = Math.PI;

  // Use linear interpolation to smoothly rotate the player between the start and end rotations
  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}
