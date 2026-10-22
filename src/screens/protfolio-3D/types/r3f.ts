import type { ThreeElement } from "@react-three/fiber";

import type { RevealMaterial } from "../components/canvas/shaders/RevealMaterial";
import type { RevealBasicMaterial } from "../components/canvas/shaders/RevealBasicMaterial";

declare module "@react-three/fiber" {
  interface ThreeElements {
    revealMaterial: ThreeElement<typeof RevealMaterial>;
    revealBasicMaterial: ThreeElement<typeof RevealBasicMaterial>;
  }
}

declare module "three" {
  interface Camera {
    savedState: object;
  }

  interface Object3D {
    opacity?: number;
    fillOpacity?: number;
    outlineOpacity?: number;
  }

  interface Material {
    bend?: number;
    windStrength?: number;
    uProgress?: number;
  }
}

declare global {
  interface Navigator {
    readonly deviceMemory?: number;
  }

  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export {};
