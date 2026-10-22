import type { Texture, Vector3 } from "three";

export interface GalleryProject {
  id?: string;
  title?: string;
  url?: string;
  description?: string;
  front: string | null;
  painted: string | null;
  techStack: string[];
  frontTexture?: Texture | string | null;
  backTexture?: Texture | string | null;
  paintedTexture?: Texture | string | null;
  buttonTexture?: Texture | null;
}

export interface StudioItem {
  id: string;
  title?: string;
  platform: string;
  description?: string;
  url?: string;
  device?: string;
  frontTexture: string | null;
  paintedFrontTexture: string | null;
  date?: string;
  views?: string | number;
  likes?: string | number;
  duration?: string;
  readTime?: string;
}

export interface PlacedMonitor extends StudioItem {
  index: number;
  x: number;
  baseY: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  angle: number;
  rot: number;
  platformConfig: {
    shape?: string;
    color: string;
    accentColor: string;
    icon: string;
    label: string;
  };
  isLatest: boolean;
}

export interface AwardItem {
  label: string;
  date: string;
  image: string | null;
  url: string | null;
}

export interface AwardGroup {
  id: string;
  layout: string;
  title: string;
  items: AwardItem[];
  platformConfig: { label: string; color: string; icon: string };
}

export interface Awards {
  sotd: AwardGroup;
  sotm: AwardGroup;
  other: AwardGroup;
}

export interface OverlayContent {
  id?: string;
  title?: string;
  description?: string;
  layout?: string;
  url?: string;
  date?: string;
  views?: string | number;
  likes?: string | number;
  duration?: string;
  readTime?: string;
  items?: AwardItem[];
  platformConfig?: { label?: string; color?: string; icon?: string };
}

export interface DoorMarker {
  side: string;
  relativeZ: number;
}

export interface WallSegment {
  type: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  rotationY?: number;
  width: number;
  isLeft?: boolean;
  trimLowZ?: boolean;
  trimHighZ?: boolean;
  side?: string;
}

export interface CloudSpec {
  id: number;
  position: [number, number, number];
  scale: number;
  opacity: number;
  textureIndex: number;
  driftSpeed: number;
  initialOffset: number;
  rotationOffset?: number;
}

export interface PaintOptions {
  dirX?: number;
  dirY?: number;
  dirZ?: number;
  startDist?: number;
  endDist?: number;
  noiseAxes?: string;
}

export interface ShaderUniform {
  value: number | Vector3 | Texture | boolean | null;
}

export interface ShaderTarget {
  uniforms: Record<string, ShaderUniform>;
  vertexShader: string;
  fragmentShader: string;
}

export interface SoundHandle {
  stop: () => void;
  fade?: (duration?: number) => void;
}
