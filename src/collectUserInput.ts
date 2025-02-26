import { queueMove } from "./components/Player";

// Add event listeners to buttons for directional movement
// These IDs should correspond to buttons in your HTML
document
  .getElementById("forward")
  ?.addEventListener("click", () => queueMove("forward"));
document
  .getElementById("backward")
  ?.addEventListener("click", () => queueMove("backward"));
document
  .getElementById("left")
  ?.addEventListener("click", () => queueMove("left"));
document
  .getElementById("right")
  ?.addEventListener("click", () => queueMove("right"));

// Add event listeners for arrow key presses
// preventDefault() prevents the default browser behavior (scrolling)
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      queueMove("forward");
      break;
    case "ArrowDown":
      event.preventDefault();
      queueMove("backward");
      break;
    case "ArrowLeft":
      event.preventDefault();
      queueMove("left");
      break;
    case "ArrowRight":
      event.preventDefault();
      queueMove("right");
      break;
  }
});
