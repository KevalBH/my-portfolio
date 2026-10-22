import { useRef, Suspense, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import AboutRoom from "../rooms/About/AboutRoom";
import StudioRoom from "../rooms/Studio/StudioRoom";
import ContactRoom from "../rooms/Contact/ContactRoom";
import GalleryRoom from "../rooms/Gallery/GalleryRoom";

interface Props {
  onWarmupComplete?: (...args: never[]) => void;
  isLowTier?: boolean;
}

const RoomWarmup = ({ onWarmupComplete, isLowTier }: Props) => {
  const [isDone, setIsDone] = useState(false);
  const frameCount = useRef(0);
  const completeFired = useRef(false);
  const { gl, scene, camera } = useThree();

  useFrame(() => {
    if (isDone || completeFired.current) return;

    frameCount.current++;

    const targetFrames = isLowTier ? 1 : 3;

    if (frameCount.current >= targetFrames) {
      completeFired.current = true;

      let finished = false;
      const finishWarmup = () => {
        if (finished) return;
        finished = true;

        requestAnimationFrame(() => {
          setIsDone(true);
          onWarmupComplete?.();
        });
      };

      if (isLowTier) {
        finishWarmup();
        return;
      }

      const timeout = setTimeout(finishWarmup, 2500);

      if (gl.compileAsync) {
        gl.compileAsync(scene, camera)
          .then(() => {
            clearTimeout(timeout);
            finishWarmup();
          })
          .catch(() => {
            clearTimeout(timeout);
            finishWarmup();
          });
      } else {
        clearTimeout(timeout);
        gl.compile(scene, camera);
        finishWarmup();
      }
    }
  });

  if (isDone) return null;

  if (isLowTier) return null;

  const noop = () => {};

  return (
    <group position={[0, -500, 0]}>
      <Suspense fallback={null}>
        <group position={[-20, 0, 0]}>
          <GalleryRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[20, 0, 0]}>
          <StudioRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[-20, 0, -50]}>
          <AboutRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[20, 0, -50]}>
          <ContactRoom showRoom={true} onReady={noop} isExiting={false} isWarmup={true} />
        </group>
      </Suspense>
    </group>
  );
};

export default RoomWarmup;
