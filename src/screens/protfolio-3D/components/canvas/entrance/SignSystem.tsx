import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const SignSystem = (props: { position?: [number, number, number] }) => {
  const groupRef = useRef<import("three").Object3D>(null);
  const signTexture = useTexture("/textures/entrance/sign.webp");
  const mountTexture = useTexture("/textures/entrance/belka.webp");

  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime + timeOffset;
      const windSway = Math.sin(time * 2) * 0.05;

      groupRef.current.rotation.x = windSway;
      groupRef.current.rotation.y = 0;
    }
  });

  return (
    <group {...props}>
      <mesh position={[-0.05, 2.05, 0.65]}>
        <planeGeometry args={[2.7, 0.4]} />
        <meshBasicMaterial
          color="#e0e0e0"
          map={mountTexture}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group ref={groupRef} position={[0, 1.9, 0.6]}>
        <mesh position={[0, -0.5, 0]}>
          <planeGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={signTexture}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};

export default SignSystem;
