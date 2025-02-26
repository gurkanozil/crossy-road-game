import type { MoveDirection } from "../types";

/**
 * Calculates the final position after a series of moves.
 * @param currentPosition - The starting position.
 * @param moves - An array of move directions.  Each direction should be one of "forward", "backward", "left", or "right".
 * @returns The final position after applying all moves.  Returns the currentPosition if any invalid move direction is encountered.
 */
export function calculateFinalPosition(
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) {
  return moves.reduce((position, direction) => {
    // Switch statement for better readability and maintainability.
    switch (direction) {
      case "forward":
        return {
          rowIndex: position.rowIndex + 1,
          tileIndex: position.tileIndex,
        };
      case "backward":
        return {
          rowIndex: position.rowIndex - 1,
          tileIndex: position.tileIndex,
        };
      case "left":
        return {
          rowIndex: position.rowIndex,
          tileIndex: position.tileIndex - 1,
        };
      case "right":
        return {
          rowIndex: position.rowIndex,
          tileIndex: position.tileIndex + 1,
        };
      default:
        // Handle invalid move directions.  Could throw an error or log a warning here depending on requirements.
        return position;
    }
  }, currentPosition);
}
