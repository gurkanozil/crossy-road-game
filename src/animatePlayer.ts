import * as THREE from "three";
import {
  player,
  position,
  movesQueue,
  stepCompleted,
} from "./components/Player";
import { tileSize } from "./constants";

// Create a clock to time the player's movements.  The clock is stopped initially.
const moveClock = new THREE.Clock(false);

/**
 * Animates the player's movement based on the movesQueue.  This function is called in the main animation loop.
 * It updates the player's position and rotation based on the current move in the queue and the elapsed time.
 * Once a move is completed, it calls stepCompleted() to update the player's state and prepare for the next move.
 */
export function animatePlayer() {
  // If there are no moves in the queue, return immediately.
  if (!movesQueue.length) return;

  // Start the clock if it's not already running. This ensures that the elapsed time is correctly calculated.
  if (!moveClock.running) moveClock.start();

  // Define the time it takes to complete one step in seconds.  This value controls the animation speed.
  const stepTime = 0.2;
  // Calculate the progress of the current step, ensuring it doesn't exceed 1.
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  // Update the player's position and rotation using linear interpolation for smooth movement.
  setPosition(progress);
  setRotation(progress);

  // Once a step has ended (progress reaches or exceeds 1), complete the step.
  if (progress >= 1) {
    // Complete the step, stop the clock, and prepare for the next move.
    stepCompleted();
    moveClock.stop();
  }
}

/**
 * Updates the player's position based on the current move and progress.  Uses linear interpolation for smooth transitions.
 * @param progress - The progress of the current step (0-1).  A value of 0 represents the start of the step, and 1 represents the end.
 */
function setPosition(progress: number) {
  // Get the starting position of the player in world coordinates.
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  // Initialize the ending position to the starting position.  This will be updated based on the move direction.
  let endX = startX;
  let endY = startY;

  // Calculate the ending position based on the direction of the move.  Each direction modifies the x or y coordinate.
  if (movesQueue[0] === "left") endX -= tileSize;
  if (movesQueue[0] === "right") endX += tileSize;
  if (movesQueue[0] === "forward") endY += tileSize;
  if (movesQueue[0] === "backward") endY -= tileSize;

  // Use linear interpolation to smoothly move the player between the start and end positions.
  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  // Add a bobbing effect to the player's z-position for visual appeal.  The amplitude of the bob is 8 units.
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

/**
 * Updates the player's rotation based on the current move and progress. Uses linear interpolation for smooth rotation.
 * @param progress - The progress of the current step (0-1).
 */
function setRotation(progress: number) {
  // Determine the target rotation based on the move direction.
  let endRotation;

  if (movesQueue[0] === "forward") {
    endRotation = 0;
  } else if (movesQueue[0] === "left") {
    endRotation = Math.PI / 2;
  } else if (movesQueue[0] === "right") {
    endRotation = -Math.PI / 2;
  } else {
    endRotation = Math.PI;
  }

  // Use linear interpolation to smoothly rotate the player between the current and target rotations.
  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}
