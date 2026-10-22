import * as THREE from "three";
import { extend } from "@react-three/fiber";

export interface RevealBasicMaterialParameters extends THREE.MeshBasicMaterialParameters {
  uProgress?: number;
}

class RevealBasicMaterial extends THREE.MeshBasicMaterial {
  _uProgress = 0;
  _shader: { uniforms: Record<string, { value: unknown }> } | null = null;

  constructor(params: RevealBasicMaterialParameters = {}) {
    super(params);
  }

  get uProgress() {
    return this._uProgress;
  }
  set uProgress(v: number) {
    this._uProgress = v;
    if (this._shader) {
      this._shader.uniforms.uProgress.value = v;
    }
  }

  customProgramCacheKey() {
    return "RevealBasicMaterial_v1";
  }

  onBeforeCompile(shader: {
    uniforms: Record<string, { value: unknown }>;
    fragmentShader: string;
  }) {
    this._shader = shader;
    shader.uniforms.uProgress = { value: this._uProgress };

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
            uniform float uProgress;

            float revealRand(vec2 n) {
                return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
            }

            float revealNoise(vec2 p){
                vec2 ip = floor(p);
                vec2 u = fract(p);
                u = u*u*(3.0-2.0*u);
                float res = mix(
                    mix(revealRand(ip),revealRand(ip+vec2(1.0,0.0)),u.x),
                    mix(revealRand(ip+vec2(0.0,1.0)),revealRand(ip+vec2(1.0,1.0)),u.x),u.y);
                return res*res;
            }
            `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <alphatest_fragment>",
      `#include <alphatest_fragment>

            // Brush-stroke reveal: progressively discard pixels from bottom to top
            if (uProgress > 0.001) {
                float rn = revealNoise(vMapUv * 15.0) * 0.15;
                float maskValue = (1.0 - vMapUv.y) + rn;
                float threshold = uProgress * 1.5;
                if (maskValue < threshold) discard;
            }
            `,
    );
  }
}

extend({ RevealBasicMaterial });

export { RevealBasicMaterial };
