import * as THREE from "three";

export type RowType = "forest" | "car" | "truck";

export type VehicleData = {
  initialTileIndex: number;
  color: THREE.ColorRepresentation;
  ref: THREE.Object3D | null; // Add ref property with type THREE.Object3D or null
};

export type Row =
  | {
      type: "forest";
      trees: { tileIndex: number; height: number }[];
    }
  | {
      type: "car" | "truck"; // Combine car and truck types
      direction: boolean;
      speed: number;
      vehicles: VehicleData[]; // Use VehicleData type for vehicles
    };

export type MoveDirection = "forward" | "backward" | "left" | "right";
