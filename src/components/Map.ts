import type { Row } from "../types";
import * as THREE from "three";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Car } from "./Car";
import { Truck } from "./Truck";

export const metadata: Row[] = [
  {
    type: "truck",
    direction: true,
    speed: 0,
    vehicles: [{ initialTileIndex: -4, color: 0x00ff00 }],
  },
];

export const map = new THREE.Group();

export function initializeMap() {
  const grass = Grass(0);
  map.add(grass);
  addRows();
}

export function addRows() {
  metadata.forEach((rowData, index) => {
    const rowIndex = index + 1;

    if (rowData.type === "forest") {
      const row = Grass(rowIndex);

      rowData.trees.forEach(({ tileIndex, height }) => {
        const three = Tree(tileIndex, height);
        row.add(three);
      });

      map.add(row);
    }

    if (rowData.type === "car") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const car = Car(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        row.add(car);
      });

      map.add(row);
    }

    if (rowData.type === "truck") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const truck = Truck(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        row.add(truck);
      });

      map.add(row);
    }
  });
}