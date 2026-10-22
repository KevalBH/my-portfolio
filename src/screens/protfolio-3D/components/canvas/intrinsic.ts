import type { ComponentType, ReactNode, Ref } from "react";
import type { Object3D, PositionalAudio as PositionalAudioImpl, Vector3 } from "three";

import {
  PositionalAudio as PositionalAudioBase,
  type PositionalAudioProps,
} from "@react-three/drei";

type Vec3 = [number, number, number] | Vector3;

interface NodeProps {
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3 | number;
  visible?: boolean;
  children?: ReactNode;
  ref?: Ref<Object3D>;
}

interface BufferProps {
  attach?: string;
  count?: number;
  itemSize?: number;
  array?: ArrayLike<number>;
}

type AudioProps = PositionalAudioProps & {
  distanceModel?: string;
  refDistance?: number;
  rolloffFactor?: number;
  autoplay?: boolean;
  volume?: number;
  ref?: Ref<PositionalAudioImpl>;
};

export const Line = "line" as unknown as ComponentType<NodeProps>;
export const BufferAttribute = "bufferAttribute" as unknown as ComponentType<BufferProps>;
export const Float32BufferAttribute =
  "float32BufferAttribute" as unknown as ComponentType<BufferProps>;
export const PositionalAudio = PositionalAudioBase as unknown as ComponentType<AudioProps>;
