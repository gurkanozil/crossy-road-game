import type { MoveDirection } from "../types";
import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { metadata as rows } from "../components/Map";

/**
 * Checks if a given move would result in a valid position on the game board.
 * A valid position is one that is within the board boundaries and does not collide with any obstacles (trees).
 * @param currentPosition - The current position of the player.
 * @param moves - An array of move directions representing the move to be checked.
 * @returns True if the resulting position is valid, false otherwise.
 */
export function endsUpInValidPosition(
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) {
  // Calculate the final position after applying all moves.
  const finalPosition = calculateFinalPosition(currentPosition, moves);

  // Check if the final position is outside the board boundaries.
  // Note: rowIndex is 1-based, while tileIndex is 0-based.  minTileIndex and maxTileIndex define the valid range for tileIndex.
  if (
    finalPosition.rowIndex < 1 || //Check if we are before the first row
    finalPosition.rowIndex > rows.length || //Check if we are after the last row
    finalPosition.tileIndex < minTileIndex || //Check if we are before the first tile
    finalPosition.tileIndex > maxTileIndex //Check if we are after the last tile
  ) {
    // Invalid move: outside the board.
    return false;
  }

  // Check for collision with a tree.  Access the row using 0-based indexing.
  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow && //Check if the row exists
    finalRow.type === "forest" && //Check if the row is a forest
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex) //Check if there is a tree at the final position
  ) {
    // Invalid move: collision with a tree.
    return false;
  }

  // Valid move: within boundaries and no collision.
  return true;
}
