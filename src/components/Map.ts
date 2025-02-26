import type { Row } from "../types";
import * as THREE from "three";
import { generateRows } from "../utilities/generateRows";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Car } from "./Car";
import { Truck } from "./Truck";

// Array to store the metadata of each row in the game map.  Each element is an object representing a row.
export const metadata: Row[] = [];

// Three.js Group object representing the entire game map.  All rows and objects are added as children of this group.
export const map = new THREE.Group();

/**
 * Initializes the game map.  This function clears the existing map and generates a new one.
 */
export function initializeMap() {
  // Clear existing map data and remove all children from the map group.
  metadata.length = 0; // Clear the metadata array.
  map.remove(...map.children); // Remove all existing rows from the map.

  // Add initial grass rows to the map.  This creates the base layer of the map.
  for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
    const grass = Grass(rowIndex);
    map.add(grass);
  }
  // Add the game rows to the map.  This function generates the rows based on the game logic.
  addRows();
}

/**
 * Adds new rows to the game map.  This function is called during map initialization and when new rows need to be added.
 * The number of rows added is determined by the generateRows function.
 */
export function addRows() {
  // Generate new row data using the generateRows utility function.  The number of rows generated is specified as a parameter.
  const newMetadata = generateRows(20);

  // Get the starting index for adding the new rows to the metadata array.
  const startIndex = metadata.length;
  // Add the newly generated row data to the metadata array.
  metadata.push(...newMetadata);

  // Iterate over the newly generated row data and add the corresponding game objects to the map.
  newMetadata.forEach((rowData, index) => {
    // Calculate the row index based on the starting index and the current index in the loop.
    const rowIndex = startIndex + index + 1;

    // Add forest row
    if (rowData.type === "forest") {
      // Create a grass object for the forest row.
      const row = Grass(rowIndex);
      // Add trees to the forest row.
      rowData.trees.forEach(({ tileIndex, height }) => {
        const three = Tree(tileIndex, height);
        row.add(three);
      });
      // Add the forest row to the map.
      map.add(row);
    }

    // Add car row
    if (rowData.type === "car") {
      // Create a road object for the car row.
      const row = Road(rowIndex);
      // Add cars to the car row.
      rowData.vehicles.forEach((vehicle) => {
        const car = Car(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = car;
        row.add(car);
      });
      // Add the car row to the map.
      map.add(row);
    }

    // Add truck row
    if (rowData.type === "truck") {
      // Create a road object for the truck row.
      const row = Road(rowIndex);
      // Add trucks to the truck row.
      rowData.vehicles.forEach((vehicle) => {
        const truck = Truck(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = truck;
        row.add(truck);
      });
      // Add the truck row to the map.
      map.add(row);
    }
  });
}
