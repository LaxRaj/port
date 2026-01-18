export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  component: React.ComponentType<Record<string, never>>;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isActive: boolean;
}

export interface AppMetadata {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<Record<string, never>>;
  defaultSize: WindowSize;
  defaultPosition: WindowPosition;
}
