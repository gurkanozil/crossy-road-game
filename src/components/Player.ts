import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";
import type { MoveDirection } from "../types";

// Creates and returns the player object. The player is composed of a body and a cap.
export const player = Player();

// Player function creates a Three.js Group representing the player.
function Player() {
  const player = new THREE.Group();

  // Creates the player's body mesh.
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  // Enables shadow casting and receiving for the body.
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.z = 10;
  player.add(body);

  // Creates the player's cap mesh.
  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(4, 8, 3),
    new THREE.MeshLambertMaterial({
      color: "red",
      flatShading: true,
    })
  );
  // Positions the cap on top of the body and enables shadow casting and receiving.
  cap.position.z = 21;
  cap.castShadow = true;
  cap.receiveShadow = true;
  player.add(cap);

  // Creates a container group to hold the player's body and cap.  This allows for easier manipulation of the player as a whole.
  const playerContainer = new THREE.Group();
  playerContainer.add(player);

  return playerContainer;
}

//Keeps track of the player's current position on the game board.
export const position: {
  currentRow: number;
  currentTile: number;
} = {
  currentRow: 0,
  currentTile: 0,
};

//Stores the player's movement queue.
export const movesQueue: MoveDirection[] = [];

// Initializes the player's position and clears the moves queue.
export function initializePlayer() {
  // Resets the player's position to the starting point (0,0).
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 0;

  // Resets the player's row and tile index.
  position.currentRow = 0;
  position.currentTile = 0;

  // Clears the movement queue.
  movesQueue.length = 0;
}

// Adds a move to the player's movement queue, ensuring the move is valid.
export function queueMove(direction: MoveDirection) {
  // Checks if the move is valid using the endsUpInValidPosition function.
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  // If the move is valid, adds it to the queue.
  if (isValidMove) {
    movesQueue.push(direction);
  }
}

// Processes the next move in the player's movement queue, updates the player's position, and adds new rows if necessary. Also updates the score.
export function stepCompleted() {
  // Gets the next move from the queue.
  const direction = movesQueue.shift();

  // Updates the player's position based on the direction of the move.
  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;

  // Adds new rows to the map if the player is approaching the end.
  if (position.currentRow > rows.length - 10) addRows();

  // Updates the score displayed on the screen.
  const scoreDOM = document.getElementById("score");
  if (scoreDOM) scoreDOM.innerText = position.currentRow.toString();
}
