import gsap from "gsap";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Text, useTexture } from "@react-three/drei";

import { isTouchDevice } from "../../../../utils/deviceDetect";

import "../../shaders/RevealMaterial";

const _tempScale = new THREE.Vector3();

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  texturePath?: string;
  label?: string;
  onClick?: () => void;
  scale?: [number, number];
  paintOnBeforeCompile?: (
    shader: import("../../../../types/content").ShaderTarget,
  ) => void;
  paintUniforms?: {
    uPaintProgress?: { value: number } | null;
    uRoomOrigin?: { value: import("three").Vector3 } | null;
  } | null;
}

const SocialBarrel = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  texturePath = "",
  label,
  onClick,
  scale = [2.12, 2.3],
  paintOnBeforeCompile,
  paintUniforms,
}: Props) => {
  const meshRef = useRef<import("three").Mesh>(null);
  const materialRef = useRef<import("three").Material>(null);
  const paintedRef = useRef<import("three").Object3D>(null);
  const hideDelayRef = useRef<gsap.core.Tween | null>(null);

  const texture = useTexture(texturePath);

  const isTouch = isTouchDevice();
  const paintedTexturePath = isTouch
    ? texturePath
    : texturePath.replace(".png", "_painted.png").replace(".webp", "_painted.webp");
  const texturePainted = useTexture(paintedTexturePath);
  const textRef = useRef<import("three").Object3D>(null);

  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      const phaseOffset = position[0] * 0.5;
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.8 + phaseOffset) * 0.15;

      meshRef.current.position.x = position[0] + Math.sin(time * 0.4 + phaseOffset) * 0.2;

      meshRef.current.rotation.z =
        rotation[2] + Math.sin(time * 0.6 + phaseOffset) * 0.05;

      const targetScale = hovered ? 1.1 : 1;

      meshRef.current.scale.lerp(_tempScale.set(targetScale, targetScale, 1), 0.1);

      if (paintUniforms && textRef.current) {
        const localPos = meshRef.current.position;
        const revealDir = new THREE.Vector3(1.0, 0.0, -0.1).normalize();

        const pStartDist = -5.0;
        const pEndDist = 55.0;
        const pTargetDist = THREE.MathUtils.lerp(
          pStartDist,
          pEndDist,
          paintUniforms?.uPaintProgress?.value ?? 0,
        );
        const pDistFromPlane = pTargetDist - localPos.dot(revealDir);

        textRef.current.fillOpacity = THREE.MathUtils.clamp(pDistFromPlane, 0, 1);
      }
    }
  });

  const handlePointerOver = () => {
    if (isTouch) return;
    document.body.style.cursor = "pointer";
    setHovered(true);

    if (materialRef.current) {
      gsap.to(materialRef.current, {
        uProgress: 1.0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (hideDelayRef.current) hideDelayRef.current.kill();
    if (paintedRef.current) paintedRef.current.visible = true;
  };

  const handlePointerOut = () => {
    if (isTouch) return;
    document.body.style.cursor = "auto";
    setHovered(false);

    if (materialRef.current) {
      gsap.to(materialRef.current, {
        uProgress: 0.0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }

    hideDelayRef.current = gsap.delayedCall(0.55, () => {
      if (paintedRef.current) paintedRef.current.visible = false;
    });
  };

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh ref={paintedRef} position={[0, 0, -0.001]} visible={false}>
        <planeGeometry args={scale} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={texturePainted as THREE.Texture}
          transparent={true}
          alphaTest={0.5}
          side={THREE.DoubleSide}
          onBeforeCompile={paintOnBeforeCompile}
          needsUpdate={!!paintOnBeforeCompile}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <planeGeometry args={scale} />
        <revealMaterial
          color="#e0e0e0"
          ref={materialRef}
          map={texture as THREE.Texture}
          transparent={true}
          alphaTest={0.1}
          uProgress={0.0}
          paintUniforms={paintUniforms}
          paintConfig={{
            dirX: 1.0,
            dirY: 0.0,
            dirZ: -0.1,
            startDist: -5.0,
            endDist: 55.0,
            noiseAxes: "yz",
          }}
        />
      </mesh>

      {label && (
        <Text
          ref={textRef}
          position={[0, scale[1] * 0.26, 0.05]}
          rotation={[0, 0, 0.03]}
          fontSize={scale[0] * 0.14}
          font="/fonts/CabinSketch-Bold.ttf"
          color="#111111"
          fillOpacity={paintUniforms ? 0 : 1}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

export default SocialBarrel;
