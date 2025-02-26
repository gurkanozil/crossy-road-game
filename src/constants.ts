// Minimum index for tile placement
export const minTileIndex = -8;
// Maximum index for tile placement
export const maxTileIndex = 8;
// Number of tiles per row, calculated from min and max indices
export const tilesPerRow = maxTileIndex - minTileIndex + 1;
// Size of each tile in pixels
export const tileSize = 48;