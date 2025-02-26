import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player, initializePlayer } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import "./style.css";
import "./collectUserInput";

// Create the scene
const scene = new THREE.Scene();
// Add the player and map to the scene
scene.add(player);
scene.add(map);

// Add ambient lighting to the scene
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

// Create and add directional light, targeting the player for dynamic lighting
const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

// Create and add the camera to the player, for a first-person perspective
const camera = Camera();
player.add(camera);

// Get references to the score and result elements in the DOM
const scoreDOM = document.getElementById("score");
const resultDOM = document.getElementById("result-container");

// Initialize the game state
initializeGame();

// Add an event listener to the retry button to restart the game
document.querySelector("#retry")?.addEventListener("click", initializeGame);

// Function to initialize the game, resetting player and map positions
function initializeGame() {
  initializePlayer();
  initializeMap();

  // Reset UI elements
  if (scoreDOM) scoreDOM.innerText = "0"; // Reset score display
  if (resultDOM) resultDOM.style.visibility = "hidden"; // Hide the result screen
}

// Create the renderer
const renderer = Renderer();
// Set the animation loop for rendering and game logic updates
renderer.setAnimationLoop(animate);

// Animation loop function, called repeatedly by the renderer
function animate() {
  // Update vehicle animations
  animateVehicles();
  // Update player animations
  animatePlayer();
  // Check for collisions
  hitTest();

  // Render the scene
  renderer.render(scene, camera);
}
