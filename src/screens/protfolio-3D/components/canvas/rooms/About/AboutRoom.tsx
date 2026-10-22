import { PositionalAudio } from "../../intrinsic";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { useAudio } from "../../../../context/AudioManager";
import { useScene } from "../../../../context/SceneContext";
import { useAchievements } from "../../../../context/AchievementsContext";

import PaperAirplane from "./PaperAirplane";
import InfiniteSkyManager from "./InfiniteSkyManager";

const CHUNK_LENGTH = 40;

export const AUDIO_SETTINGS = {
  volume: 2.5,
  distance: 2,
  rolloff: 0.8,
};

interface Props {
  showRoom?: boolean;
  onReady?: () => void;
  isExiting?: boolean;
  isWarmup?: boolean;
}

const AboutRoom = ({ onReady, isExiting, isWarmup }: Props) => {
  const { camera } = useThree();
  const { isTeleporting, overlayContent } = useScene();
  const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
  const { globalVolume, isMuted } = useAudio();
  const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

  const audioRef = useRef<import("three").PositionalAudio>(null);
  useEffect(() => {
    if (audioRef.current && audioRef.current.setVolume) {
      audioRef.current.setVolume(effectiveVolume);
    }
  }, [effectiveVolume]);

  const overlayRef = useRef(overlayContent);
  useEffect(() => {
    overlayRef.current = overlayContent;
  }, [overlayContent]);

  useEffect(() => {
    if (isExiting || isTeleporting) {
      hidePopup();
    }
  }, [isExiting, isTeleporting, hidePopup]);

  const hasSignaledReady = useRef(false);
  const frameCount = useRef(0);
  const FRAMES_TO_WAIT = 25;

  const scrollPosition = useRef(0);
  const scrollVelocity = useRef(0);

  const baseCameraRotation = useRef({ x: 0, y: 0, z: 0 });
  const isFlightActive = useRef(false);

  const currentBank = useRef(0);
  const currentPitch = useRef(0);

  const roomRef = useRef<import("three").Object3D>(null);
  const airplaneGroupRef = useRef<import("three").Object3D>(null);

  useEffect(() => {
    if (isTeleporting) {
      currentBank.current = 0;
      currentPitch.current = 0;
      isFlightActive.current = false;
      baseCameraRotation.current = { x: 0, y: 0, z: 0 };
      scrollPosition.current = 0;
      scrollVelocity.current = 0;
    }
  }, [isTeleporting]);

  useFrame((state, delta) => {
    if (!hasSignaledReady.current) {
      if (roomRef.current) {
        roomRef.current.traverse((child: import("three").Object3D) => {
          if ((child as import("three").Mesh).isMesh) child.frustumCulled = false;
        });
      }

      frameCount.current++;
      if (frameCount.current >= FRAMES_TO_WAIT) {
        if (roomRef.current) {
          roomRef.current.traverse((child: import("three").Object3D) => {
            if ((child as import("three").Mesh).isMesh) child.frustumCulled = true;
          });
        }

        hasSignaledReady.current = true;
        onReady?.();

        if (!isTeleporting && !isExiting) {
          if (!isWarmup) setTimeout(() => showTutorial("about_fly"), 2000);
        }
      }
    }

    if (isTeleporting) {
      return;
    }

    scrollPosition.current += scrollVelocity.current * delta * 60;

    scrollVelocity.current *= 0.95;
    if (Math.abs(scrollVelocity.current) < 0.001) {
      scrollVelocity.current = 0;
    }

    if (scrollPosition.current > 15) {
      unlockAchievement("about_fly");
    }

    if (isExiting) {
      return;
    }

    if (!isFlightActive.current && scrollPosition.current > 0.5) {
      isFlightActive.current = true;
      baseCameraRotation.current = {
        x: camera.rotation.x,
        y: camera.rotation.y,
        z: camera.rotation.z,
      };
    }

    if (isFlightActive.current) {
      const chunkProgress = (scrollPosition.current % CHUNK_LENGTH) / CHUNK_LENGTH;

      let bankAngle = Math.sin(chunkProgress * Math.PI * 2) * 0.12;
      let pitchAngle = Math.sin(chunkProgress * Math.PI * 4) * 0.05;

      const flightProgress = Math.min(1, (scrollPosition.current - 0.5) / 5.0);
      bankAngle *= flightProgress;
      pitchAngle *= flightProgress;

      const lerpSpeed = 1 - Math.pow(0.02, delta);
      currentBank.current = THREE.MathUtils.lerp(
        currentBank.current,
        bankAngle,
        lerpSpeed,
      );
      currentPitch.current = THREE.MathUtils.lerp(
        currentPitch.current,
        pitchAngle,
        lerpSpeed,
      );

      camera.rotation.x = baseCameraRotation.current.x + currentPitch.current;
      camera.rotation.z = baseCameraRotation.current.z + currentBank.current;
    } else {
      currentBank.current = 0;
      currentPitch.current = 0;
    }

    if (airplaneGroupRef.current) {
      airplaneGroupRef.current.rotation.x = currentPitch.current * 3 + 0.1;
      airplaneGroupRef.current.rotation.z = -currentBank.current * 2;
    }
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (overlayRef.current) return;
      scrollVelocity.current += e.deltaY * 0.002;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const lastTouchY = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastTouchY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (overlayRef.current) return;
      if (e.touches.length === 1) {
        const deltaY = lastTouchY.current - e.touches[0].clientY;
        lastTouchY.current = e.touches[0].clientY;

        scrollVelocity.current += deltaY * 0.005;
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <group ref={roomRef} position={[0, 0, -25]}>
      {!isWarmup && (
        <PositionalAudio
          ref={audioRef}
          url="/sounds/szumwiatru.mp3"
          distanceModel="exponential"
          refDistance={AUDIO_SETTINGS.distance}
          rolloffFactor={AUDIO_SETTINGS.rolloff}
          loop
          autoplay
          volume={effectiveVolume}
        />
      )}

      <group ref={airplaneGroupRef} position={[0, -0.3, 1]}>
        <PaperAirplane scale={0.8} color="#faf8f5" />
      </group>

      <InfiniteSkyManager scrollProgressRef={scrollPosition} />

      <mesh position={[0, 0, -200]}>
        <planeGeometry args={[300, 150]} />
        <meshBasicMaterial color="#87CEEB" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default AboutRoom;
