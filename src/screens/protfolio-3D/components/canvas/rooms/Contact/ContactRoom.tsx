import { PositionalAudio } from "../../intrinsic";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";

import { useAudio } from "../../../../context/AudioManager";
import { useScene } from "../../../../context/SceneContext";
import { usePaintMaterial } from "../../../../hooks/usePaintMaterial";
import { useAchievements } from "../../../../context/AchievementsContext";

import SocialBarrel from "./SocialBarrel";
import GalleryClouds from "../Gallery/GalleryClouds";

const WAVE_LAYERS = 4;

export const AUDIO_SETTINGS = {
  volume: 2,
  distance: 2,
  rolloff: 1.2,
};

export const LATARNIA_SETTINGS = {
  position: [-10, 5, -20],

  rotation: [0, 0.1, 0],

  scale: [4.49, 5],
};

export const STATEK_SETTINGS = {
  position: [0, 1.6, -15],

  rotation: [0, -0.2, 0],

  scale: [3.35, 1.3],
};

const CAMERA_SETTINGS = {
  lookDownAngle: -1.2,

  forceCenterY: -1.05,

  forceStraightZ: 0,

  lerpSpeed: 2.5,
};

interface Props {
  showRoom?: boolean;
  onReady?: () => void;
  isExiting?: boolean;
  isWarmup?: boolean;
}

const ContactRoom = ({ showRoom, onReady, isExiting, isWarmup }: Props) => {
  const { camera } = useThree();
  const { isTeleporting } = useScene();
  const { hidePopup } = useAchievements();
  const { globalVolume, isMuted } = useAudio();
  const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

  const audioRef = useRef<import("three").PositionalAudio>(null);
  useEffect(() => {
    if (audioRef.current && audioRef.current.setVolume) {
      audioRef.current.setVolume(effectiveVolume);
    }
  }, [effectiveVolume]);

  useEffect(() => {
    if (isExiting || isTeleporting) {
      hidePopup();
    }
  }, [isExiting, isTeleporting, hidePopup]);

  const seaTexture = useTexture("/textures/contact/faletopdown.webp");

  const moloTexture = useTexture("/textures/contact/molo.webp");

  const latarniaTexture = useTexture("/textures/contact/latarnia.webp");

  const statekTexture = useTexture("/textures/contact/statek.webp");

  useEffect(() => {
    if (seaTexture) {
      seaTexture.wrapS = seaTexture.wrapT = THREE.MirroredRepeatWrapping;
      seaTexture.repeat.set(6, 4);
      seaTexture.needsUpdate = true;
    }

    if (moloTexture) {
      moloTexture.wrapS = moloTexture.wrapT = THREE.RepeatWrapping;
      moloTexture.center.set(0.5, 0.5);
      moloTexture.rotation = Math.PI / 2;
      moloTexture.repeat.set(1, 1);
      moloTexture.needsUpdate = true;
    }
  }, [seaTexture, moloTexture]);

  useEffect(() => {
    camera.rotation.reorder("YXZ");

    return () => {
      camera.rotation.reorder("XYZ");
    };
  }, [camera]);

  const groupRef = useRef<import("three").Object3D>(null);
  const { onBeforeCompile, animatePaint, resetPaint, uniformsData, updateRoomOrigin } =
    usePaintMaterial({
      dirX: 1.0,
      dirY: 0.0,
      dirZ: -0.1,
      startDist: -5.0,
      endDist: 55.0,
      noiseAxes: "yz",
    });

  const [, setIsTransitioning] = useState(false);

  const wasTeleportedRef = useRef(false);
  useEffect(() => {
    if (isTeleporting) wasTeleportedRef.current = true;
  }, [isTeleporting]);

  useEffect(() => {
    if (showRoom && !isWarmup) {
      if (wasTeleportedRef.current || isTeleporting) {
        uniformsData.uPaintProgress.value = 1.0;
        setIsTransitioning(false);
      } else {
        setIsTransitioning(true);
        resetPaint();
        animatePaint(0.2, 2.5);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 2700);
      }
    } else {
      uniformsData.uPaintProgress.value = 1.0;
    }
  }, [showRoom, isWarmup, isTeleporting]);

  const hasSignaledReady = useRef(false);
  const frameCount = useRef(0);
  const FRAMES_TO_WAIT = 5;

  const hasAnimatedDown = useRef(false);

  const hasExitTriggered = useRef(false);
  if (isExiting && !hasExitTriggered.current) {
    hasExitTriggered.current = true;
  }

  const waveRefs = useRef<(import("three").Object3D | null)[]>([]);
  const statekRef = useRef<import("three").Object3D>(null);

  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const targetRotZ = useRef(0);

  useEffect(() => {
    if (isTeleporting) {
      hasAnimatedDown.current = false;
      hasExitTriggered.current = false;
      targetRotX.current = 0;
      targetRotY.current = 0;
      targetRotZ.current = 0;
    }
  }, [isTeleporting]);

  useEffect(() => {
    if (!showRoom) {
      hasExitTriggered.current = false;
      if (hasAnimatedDown.current) {
        hasAnimatedDown.current = false;
        targetRotX.current = 0;
        targetRotZ.current = 0;
      }
    }
  }, [hasSignaledReady.current, showRoom, camera]);

  const handleMailSelect = () => {
    const host = window.top ?? window;
    const link = host.document.createElement("a");
    link.href = "mailto:keval.bhatt.777@gmail.com";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    host.document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useFrame((state, delta) => {
    updateRoomOrigin(groupRef);

    if (!hasSignaledReady.current) {
      frameCount.current++;
      if (frameCount.current >= FRAMES_TO_WAIT) {
        hasSignaledReady.current = true;
        onReady?.();
      }
    }

    if (hasAnimatedDown.current && !isExiting && !hasExitTriggered.current) {
      const safeDelta = Math.min(delta, 0.033);
      const lerpSpeed = safeDelta * CAMERA_SETTINGS.lerpSpeed;

      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        targetRotX.current,
        lerpSpeed,
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        targetRotY.current,
        lerpSpeed,
      );
      camera.rotation.z = THREE.MathUtils.lerp(
        camera.rotation.z,
        targetRotZ.current,
        lerpSpeed,
      );
    }

    const time = state.clock.getElapsedTime();
    waveRefs.current.forEach((ref, i) => {
      if (ref) {
        const speed = 0.8 + i * 0.15;
        const amplitude = 0.15 - i * 0.02;
        const offset = i * 0.5;
        ref.position.y = Math.sin(time * speed + offset) * amplitude;
      }
    });

    if (statekRef.current) {
      const bobSpeed = 0.8;
      const bobAmplitude = 0.3;
      statekRef.current.position.y =
        STATEK_SETTINGS.position[1] + Math.sin(time * bobSpeed) * bobAmplitude;

      const sailSpeed = 0.04;
      const sailAmplitude = 12;
      statekRef.current.position.x =
        STATEK_SETTINGS.position[0] + Math.sin(time * sailSpeed) * sailAmplitude;

      const rollAmplitude = 0.05;
      statekRef.current.rotation.z = Math.sin(time * bobSpeed * 1.2) * rollAmplitude;
    }
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.7, -5]}>
      {!isWarmup && (
        <PositionalAudio
          ref={audioRef}
          url="/sounds/szummorza.mp3"
          distanceModel="exponential"
          refDistance={AUDIO_SETTINGS.distance}
          rolloffFactor={AUDIO_SETTINGS.rolloff}
          loop
          autoplay
          volume={effectiveVolume}
        />
      )}

      <GalleryClouds count={45} seed={88} rotationOffset={[0, 1, 0]} />

      <group position={[0, -1, -8]}>
        {Array.from({ length: WAVE_LAYERS }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => (waveRefs.current[i] = el)}
            position={[0, -i * 0.1, -i * 8]}
            rotation={[-Math.PI / 2.5, 0, 0]}
          >
            <planeGeometry args={[80, 30]} />
            <meshBasicMaterial
              map={seaTexture}
              color="#ffffff"
              transparent={true}
              opacity={1 - i * 0.1}
              side={THREE.DoubleSide}
              toneMapped={false}
              onBeforeCompile={onBeforeCompile}
            />
          </mesh>
        ))}
      </group>

      <SocialBarrel
        position={isMobile ? [-1.2, 0.5, -10] : [-3, 0.5, -10]}
        rotation={[0, 0.2, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="LINKEDIN"
        onClick={() => window.open("https://www.linkedin.com/in/keval-dev", "_blank")}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />

      <SocialBarrel
        position={isMobile ? [-1.5, -0.3, -7] : [-5, -0.3, -8]}
        rotation={[0, 0.3, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="GITHUB"
        onClick={() => window.open("https://github.com/KevalBH", "_blank")}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />

      <SocialBarrel
        position={isMobile ? [1.2, 0.5, -10] : [3, 0.5, -10]}
        rotation={[0, -0.2, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="FACEBOOK"
        onClick={() => window.open("https://www.facebook.com", "_blank")}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />

      <SocialBarrel
        position={isMobile ? [1.5, -0.3, -7] : [5, -0.3, -8]}
        rotation={[0, -0.3, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="INSTAGRAM"
        onClick={() => window.open("https://www.instagram.com", "_blank")}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />

      <SocialBarrel
        position={isMobile ? [0, -0.7, -6] : [0, -0.7, -7]}
        rotation={[0, 0, 0]}
        texturePath="/textures/contact/beczka.webp"
        label="MESSAGE"
        onClick={handleMailSelect}
        paintOnBeforeCompile={onBeforeCompile}
        paintUniforms={uniformsData}
      />

      <mesh position={[0, 0.05, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 7]} />
        <meshBasicMaterial
          map={moloTexture}
          color="#e0e0e0"
          side={THREE.DoubleSide}
          transparent
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      <mesh
        position={LATARNIA_SETTINGS.position as [number, number, number]}
        rotation={LATARNIA_SETTINGS.rotation as [number, number, number]}
      >
        <planeGeometry args={LATARNIA_SETTINGS.scale as [number, number]} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={latarniaTexture}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      <mesh
        ref={statekRef}
        position={STATEK_SETTINGS.position as [number, number, number]}
        rotation={STATEK_SETTINGS.rotation as [number, number, number]}
      >
        <planeGeometry args={STATEK_SETTINGS.scale as [number, number]} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={statekTexture}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </group>
  );
};

export default ContactRoom;
