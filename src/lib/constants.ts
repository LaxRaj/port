import { AppMetadata, WindowSize, WindowPosition } from "@/types/window";

export const DEFAULT_WINDOW_SIZE: WindowSize = {
  width: 800,
  height: 600,
};

export const DEFAULT_WINDOW_POSITION: WindowPosition = {
  x: 100,
  y: 100,
};

export const MIN_WINDOW_SIZE: WindowSize = {
  width: 400,
  height: 300,
};

export const MAX_Z_INDEX = 10000;
export const Z_INDEX_INCREMENT = 10;
