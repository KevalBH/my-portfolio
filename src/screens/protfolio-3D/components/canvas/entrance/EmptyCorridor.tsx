import * as THREE from "three";
import { useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

interface Props {
  camera?: import("three").Camera;
}

const EmptyCorridor = ({ camera }: Props) => {
  const corridorWidth = 25;
  const corridorHeight = 3.5;
  const [segmentBase, setSegmentBase] = useState(0);

  const floorTexture = useTexture("/textures/entrance/floor_paper.webp");
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(6.6, 20);

  useFrame(() => {
    if (!camera) return;
    const segmentLength = 40;
    const newBase = Math.floor(camera.position.z / segmentLength) * segmentLength;
    if (newBase !== segmentBase) {
      setSegmentBase(newBase);
    }
  });

  const segments = useMemo(() => {
    const result: number[] = [];
    for (let i = -2; i <= 2; i++) {
      result.push(segmentBase + i * 40);
    }
    return result;
  }, [segmentBase]);

  return (
    <group>
      {segments.map((zStart) => (
        <CorridorSegmentEmpty
          key={zStart}
          zStart={zStart}
          corridorWidth={corridorWidth}
          corridorHeight={corridorHeight}
          floorTexture={floorTexture}
        />
      ))}
    </group>
  );
};

interface CorridorSegmentEmptyProps {
  zStart?: number;
  corridorWidth?: number;
  corridorHeight?: number;
  floorTexture?: import("three").Texture;
}

const CorridorSegmentEmpty = ({
  zStart = 0,
  corridorWidth,
  floorTexture,
}: CorridorSegmentEmptyProps) => {
  const length = 40;
  const zCenter = zStart - length / 2;

  return (
    <group>
      <mesh position={[0, -2, zCenter]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[corridorWidth, length]} />
        <meshBasicMaterial
          map={floorTexture}
          transparent={true}
          alphaTest={0.1}
          color="#e0e0e0"
        />
      </mesh>
    </group>
  );
};

export default EmptyCorridor;
