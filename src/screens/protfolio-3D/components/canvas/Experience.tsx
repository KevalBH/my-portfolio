import { useThree } from "@react-three/fiber";
import { Suspense, useCallback } from "react";

import { useScene } from "../../context/SceneContext";
import useInfiniteCamera from "../../hooks/useInfiniteCamera";

import RoomWarmup from "./corridor/RoomWarmup";
import SignSystem from "./entrance/SignSystem";
import TeleportRoom from "./corridor/TeleportRoom";
import EmptyCorridor from "./entrance/EmptyCorridor";
import EntranceDoors from "./entrance/EntranceDoors";
import InfiniteCorridorManager from "./corridor/InfiniteCorridorManager";

const ENTRANCE_DOORS_Z = 22;

interface Props {
  isLoaded?: boolean;
  onSceneReady?: () => void;
  performanceTier?: string;
}

const Experience = ({ onSceneReady, performanceTier }: Props) => {
  const { hasEntered, markEntered, enterRoom, isTeleporting, isInRoom } = useScene();

  const { camera } = useThree();

  const { setCameraOverride } = useInfiniteCamera({
    segmentLength: 80,
    scrollSpeed: 0.025,
    parallaxIntensity: 0.4,
    smoothing: 0.06,
    scrollEnabled: hasEntered && !isTeleporting && !isInRoom,
    parallaxEnabled: hasEntered && !isTeleporting && !isInRoom,
  });

  const handleEntranceComplete = useCallback(() => {
    markEntered();
  }, [markEntered]);

  const handleDoorEnter = useCallback(
    (doorId: string) => {
      enterRoom(doorId);
    },
    [enterRoom],
  );

  const isLowTier = performanceTier === "LOW";

  return (
    <>
      <RoomWarmup onWarmupComplete={onSceneReady} isLowTier={isLowTier} />
      <Suspense fallback={null}>
        {!hasEntered && <EmptyCorridor camera={camera} />}

        {!hasEntered && (
          <EntranceDoors
            position={[0, 0, ENTRANCE_DOORS_Z]}
            onComplete={handleEntranceComplete}
          />
        )}

        {!hasEntered && <SignSystem position={[0, 0, ENTRANCE_DOORS_Z]} />}

        <InfiniteCorridorManager
          onDoorEnter={handleDoorEnter}
          hideDoorsForSegments={hasEntered ? [] : [-1]}
          clipSegmentNeg1={!hasEntered}
          setCameraOverride={setCameraOverride}
        />

        <TeleportRoom />
      </Suspense>
    </>
  );
};

export default Experience;
