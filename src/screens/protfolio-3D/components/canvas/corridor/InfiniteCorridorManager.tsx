import { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import CorridorSegment, { SEGMENT_LENGTH } from "./CorridorSegment";

interface SegmentVisibilityWrapperProps {
  children?: import("react").ReactNode;
  segmentIndex?: number;
}

const SegmentVisibilityWrapper = ({
  children,
  segmentIndex = 0,
}: SegmentVisibilityWrapperProps) => {
  const groupRef = useRef<import("three").Object3D>(null);
  const { camera } = useThree();

  const startZ = 10 - segmentIndex * SEGMENT_LENGTH;
  const endZ = startZ - SEGMENT_LENGTH;

  useFrame(() => {
    if (!groupRef.current) return;

    const isBehindCamera = camera.position.z < endZ - 5;

    const isFarAhead = camera.position.z > startZ + 30;

    const isVisible = !(isBehindCamera || isFarAhead);

    if (groupRef.current.visible !== isVisible) {
      groupRef.current.visible = isVisible;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

interface Props {
  onDoorEnter?: (roomId: string) => void;
  hideDoorsForSegments?: number[];
  clipSegmentNeg1?: boolean;
  setCameraOverride?: (active: boolean) => void;
}

const InfiniteCorridorManager = ({
  onDoorEnter,
  hideDoorsForSegments = [],
  clipSegmentNeg1 = false,
  setCameraOverride,
}: Props) => {
  const { camera } = useThree();

  const [activeSegments, setActiveSegments] = useState([0, 1]);

  const getSegmentFromZ = useCallback((z: number) => {
    return Math.floor((10 - z) / SEGMENT_LENGTH);
  }, []);

  useFrame(() => {
    const currentSegment = getSegmentFromZ(camera.position.z);

    const shouldBeActive = [currentSegment - 1, currentSegment, currentSegment + 1];

    const needsUpdate =
      shouldBeActive.some((seg) => !activeSegments.includes(seg)) ||
      activeSegments.some((seg) => !shouldBeActive.includes(seg));

    if (needsUpdate) {
      setActiveSegments(shouldBeActive);
    }
  });

  return (
    <group>
      {activeSegments.map((segmentIndex) => (
        <SegmentVisibilityWrapper
          key={`seg-wrap-${segmentIndex}`}
          segmentIndex={segmentIndex}
        >
          <CorridorSegment
            key={`segment-${segmentIndex}`}
            segmentIndex={segmentIndex}
            onDoorEnter={onDoorEnter}
            hideSegmentDoors={hideDoorsForSegments.includes(segmentIndex)}
            zClip={clipSegmentNeg1 && segmentIndex === -1 ? 22 : 100000}
            setCameraOverride={setCameraOverride}
          />
        </SegmentVisibilityWrapper>
      ))}
    </group>
  );
};

export default InfiniteCorridorManager;
