import * as THREE from "three";

/**
 * Creates an orthographic camera for the game.  This camera provides a fixed zoom level, suitable for top-down games.
 * The camera's dimensions are calculated based on the browser window's aspect ratio to maintain a consistent view.
 * @returns A Three.js OrthographicCamera instance.
 */
export function Camera() {
  // Set the base size of the camera's view.  Adjust this value to change the zoom level.
  const size = 300;
  // Calculate the aspect ratio of the browser window.
  const viewRatio = window.innerWidth / window.innerHeight;
  // Calculate the width and height of the camera's view based on the aspect ratio.  This ensures the view is not distorted.
  const width = viewRatio < 1 ? size : size * viewRatio;
  const height = viewRatio < 1 ? size / viewRatio : size;

  // Create a new OrthographicCamera instance.  Orthographic cameras do not have perspective distortion.
  const camera = new THREE.OrthographicCamera(
    width / -2, // left boundary of the camera's view
    width / 2, // right boundary of the camera's view
    height / 2, // top boundary of the camera's view
    height / -2, // bottom boundary of the camera's view
    100, // near clipping plane of the camera
    900 // far clipping plane of the camera
  );

  // Set the camera's up direction.  This is typically (0, 1, 0) for a top-down view, but (0, 0, 1) is used here.
  camera.up.set(0, 0, 1);
  // Set the camera's position.  Adjust these values to change the camera's position relative to the scene.
  camera.position.set(300, -300, 300);
  // Set the camera's target.  The camera will look at this point.
  camera.lookAt(0, 0, 0);

  // Return the created camera.
  return camera;
}
