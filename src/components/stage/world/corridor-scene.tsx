"use client";

import type { Group } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, DoubleSide, RepeatWrapping, SRGBColorSpace } from "three";

import { getSiteContent } from "@/queries/site";

import type { DoorId, DoorSpec, SketchCard } from "@/components/stage/world/layout";
import {
  arrangement,
  cardsFor,
  doorById,
  doors,
  openSketchLink,
  wallNotes,
} from "@/components/stage/world/layout";
import {
  paintCard,
  paintCloud,
  paintDoor,
  paintHouse,
  paintMonitor,
  paintNote,
  paintPaper,
  paintPlank,
  paintPlane,
  paintSign,
} from "@/components/stage/world/paint";

const WALL_REPEAT: [number, number] = [2, 10];
const FLOOR_REPEAT: [number, number] = [3, 12];
const CEILING_REPEAT: [number, number] = [2, 8];

interface Props {
  active: DoorId | null;
  antialias: boolean;
  displayFont: string;
  dpr: number;
  entered: boolean;
  handFont: string;
  onArrive: () => void;
  onEnter: (id: DoorId) => void;
  reduced: boolean;
  walk: number;
}

function makeTexture(
  width: number,
  height: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
  repeat: [number, number] | null,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return null;

  paint(context);
  const map = new CanvasTexture(canvas);
  map.colorSpace = SRGBColorSpace;
  map.needsUpdate = true;

  if (repeat) {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(repeat[0], repeat[1]);
  }

  return map;
}

function useDisposableTexture(
  width: number,
  height: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
  repeat: [number, number] | null,
) {
  const texture = useMemo(
    () => makeTexture(width, height, paint, repeat),
    [height, paint, repeat, width],
  );

  useEffect(() => () => texture?.dispose(), [texture]);

  return texture;
}

function paintWall(ctx: CanvasRenderingContext2D) {
  paintPaper(ctx, "wall");
}

function paintFloor(ctx: CanvasRenderingContext2D) {
  paintPaper(ctx, "floor");
}

function paintCeiling(ctx: CanvasRenderingContext2D) {
  paintPaper(ctx, "ceiling");
}

function Rig({
  active,
  entered,
  reduced,
  walk,
}: Pick<Props, "active" | "entered" | "reduced" | "walk">) {
  const activeDoor = active ? doorById(active) : null;

  useFrame(({ camera: rig, clock, pointer }) => {
    const glide = reduced ? 1 : 0.08;
    const bob = reduced ? 0 : pointer.y * 0.05;
    const drift = reduced ? 0 : pointer.x * 0.22;
    const goalZ = activeDoor ? activeDoor.z + 2.2 : entered ? walk : 8.4;
    const goalX = activeDoor ? activeDoor.side * 0.4 : entered ? drift : 0;
    const goalY = activeDoor ? 1.28 : entered ? 1.34 + bob : 1.34;
    const sway = reduced ? 0 : Math.sin(clock.elapsedTime * 0.4) * 0.04;

    rig.position.x += (goalX - rig.position.x) * glide;
    rig.position.y += (goalY - rig.position.y) * glide;
    rig.position.z += (goalZ - rig.position.z) * glide;
    rig.lookAt(goalX * 0.15, 1.22, goalZ - 6 + sway);
  });

  return null;
}

function Shell() {
  const wall = useDisposableTexture(512, 512, paintWall, WALL_REPEAT);
  const floor = useDisposableTexture(512, 512, paintFloor, FLOOR_REPEAT);
  const ceiling = useDisposableTexture(512, 512, paintCeiling, CEILING_REPEAT);

  return (
    <group>
      <mesh position={[0, 0, -16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.7, 56]} />
        <meshBasicMaterial color="#e6dece" map={floor ?? undefined} />
      </mesh>
      <mesh position={[0, 2.8, -16]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.7, 56]} />
        <meshBasicMaterial color="#f4efe4" map={ceiling ?? undefined} />
      </mesh>
      <mesh position={[-1.85, 1.4, -16]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[56, 2.8]} />
        <meshBasicMaterial color="#f4efe4" map={wall ?? undefined} side={DoubleSide} />
      </mesh>
      <mesh position={[1.85, 1.4, -16]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[56, 2.8]} />
        <meshBasicMaterial color="#f4efe4" map={wall ?? undefined} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 1.4, -44]}>
        <planeGeometry args={[3.7, 2.8]} />
        <meshBasicMaterial color="#f4efe4" map={wall ?? undefined} />
      </mesh>
      <mesh position={[0, 0.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 0.9]} />
        <meshBasicMaterial color="#1c1916" />
      </mesh>
    </group>
  );
}

interface DoorProps {
  active: boolean;
  door: DoorSpec;
  font: string;
  onEnter: (id: DoorId) => void;
  reduced: boolean;
}

function DoorMesh({ active, door, font, onEnter, reduced }: DoorProps) {
  const swing = useRef<Group>(null);
  const [hot, setHot] = useState(false);
  const texture = useMemo(
    () => makeTexture(512, 1024, (ctx) => paintDoor(ctx, door.label, font), null),
    [door.label, font],
  );

  useEffect(() => () => texture?.dispose(), [texture]);

  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );

  useFrame(({ clock }) => {
    if (!swing.current) return;
    if (reduced) {
      swing.current.rotation.y = 0;
      return;
    }

    const swingTo = hot || active ? 0.62 * door.side : Math.sin(clock.elapsedTime) * 0.03;
    swing.current.rotation.y += (swingTo - swing.current.rotation.y) * 0.14;
  });

  return (
    <group
      position={[door.side * 1.8, 1.02, door.z]}
      rotation={[0, (door.side * Math.PI) / 2, 0]}
    >
      <group ref={swing}>
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[1.2, 2.18]} />
          <meshBasicMaterial color="#1c1916" side={DoubleSide} />
        </mesh>
        <mesh
          name={`door-${door.id}`}
          onClick={(event) => {
            event.stopPropagation();
            onEnter(door.id);
          }}
          onPointerOut={() => {
            setHot(false);
            document.body.style.cursor = "";
          }}
          onPointerOver={() => {
            setHot(true);
            document.body.style.cursor = "pointer";
          }}
        >
          <planeGeometry args={[1.05, 2.04]} />
          <meshBasicMaterial
            color={hot || active ? "#fffaf2" : "#f4efe4"}
            map={texture ?? undefined}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function NoteMesh({ font, note }: { font: string; note: (typeof wallNotes)[number] }) {
  const texture = useMemo(
    () => makeTexture(512, 512, (ctx) => paintNote(ctx, note.word, font), null),
    [font, note.word],
  );

  useEffect(() => () => texture?.dispose(), [texture]);

  return (
    <mesh
      position={[note.side * 1.78, 1.7, note.z]}
      rotation={[0, (note.side * -Math.PI) / 2, 0.08]}
    >
      <planeGeometry args={[0.46, 0.46]} />
      <meshBasicMaterial
        color="#f7f1e4"
        map={texture ?? undefined}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}

function Airplane({ reduced }: { reduced: boolean }) {
  const ref = useRef<Group>(null);
  const texture = useDisposableTexture(512, 512, paintPlane, null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (reduced) {
      ref.current.position.y = 2.05;
      return;
    }

    ref.current.position.y = 2.05 + Math.sin(clock.elapsedTime * 0.8) * 0.07;
  });

  return (
    <group ref={ref} position={[0.2, 2.05, -11]}>
      {texture ? (
        <mesh rotation={[0.2, 0.5, 0.2]}>
          <planeGeometry args={[0.52, 0.32]} />
          <meshBasicMaterial map={texture} side={DoubleSide} transparent />
        </mesh>
      ) : null}
    </group>
  );
}

interface CardProps {
  card: SketchCard;
  font: string;
  pose: ReturnType<typeof arrangement>;
}

function CardMesh({ card, font, pose }: CardProps) {
  const texture = useMemo(
    () =>
      makeTexture(640, 400, (ctx) => paintCard(ctx, card.title, card.note, font), null),
    [card.note, card.title, font],
  );

  useEffect(() => () => texture?.dispose(), [texture]);

  if (!texture) return null;

  return (
    <group>
      {pose.string ? (
        <mesh position={[pose.position[0], pose.position[1] + 0.32, pose.position[2]]}>
          <boxGeometry args={[0.012, 0.28, 0.012]} />
          <meshBasicMaterial color="#1c1916" />
        </mesh>
      ) : null}
      <mesh
        name={`card-${card.title}`}
        position={[pose.position[0], pose.position[1], pose.position[2]]}
        onClick={(event) => {
          event.stopPropagation();
          openSketchLink(card.href);
        }}
      >
        <planeGeometry args={[0.62, 0.4]} />
        <meshBasicMaterial color="#fbf7ef" map={texture} side={DoubleSide} />
      </mesh>
    </group>
  );
}

function RoomScenery({ door }: { door: DoorSpec }) {
  const cloud = useDisposableTexture(512, 256, paintCloud, null);
  const house = useDisposableTexture(512, 512, paintHouse, null);
  const monitor = useDisposableTexture(512, 512, paintMonitor, null);
  const plank = useDisposableTexture(512, 128, paintPlank, null);

  if (door.id === "work") {
    return (
      <group>
        <mesh position={[0, 2.15, door.z + 0.35]}>
          <planeGeometry args={[6.6, 1.7]} />
          <meshBasicMaterial color="#d7e4e1" />
        </mesh>
        <mesh position={[0, 0.32, door.z + 1.9]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6.4, 2.6]} />
          <meshBasicMaterial color="#cfc4ae" />
        </mesh>
        {[-1.7, 0.05, 1.75].map((x) => (
          <mesh key={x} position={[x, 0.78, door.z + 0.5]}>
            <planeGeometry args={[0.72, 0.72]} />
            <meshBasicMaterial
              color="#f7f1e4"
              map={house ?? undefined}
              side={DoubleSide}
              transparent
            />
          </mesh>
        ))}
        <mesh position={[0, 1.62, door.z + 1.35]}>
          <boxGeometry args={[3.15, 0.012, 0.012]} />
          <meshBasicMaterial color="#1c1916" />
        </mesh>
      </group>
    );
  }

  if (door.id === "studio") {
    return (
      <group>
        <mesh position={[door.side * -0.15, 1.2, door.z + 1.15]}>
          <planeGeometry args={[1.7, 2.7]} />
          <meshBasicMaterial
            color="#1c1916"
            map={monitor ?? undefined}
            side={DoubleSide}
          />
        </mesh>
      </group>
    );
  }

  if (door.id === "about") {
    return (
      <group>
        <mesh position={[0, 1.7, door.z + 0.15]}>
          <planeGeometry args={[6.4, 3.5]} />
          <meshBasicMaterial color="#d5e3ea" />
        </mesh>
        {[-1.4, 0.2, 1.5].map((x, index) => (
          <mesh key={x} position={[x, 2.15 - index * 0.08, door.z + 0.7]}>
            <planeGeometry args={[1.1, 0.48]} />
            <meshBasicMaterial
              color="#f7f1e4"
              map={cloud ?? undefined}
              side={DoubleSide}
              transparent
            />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, 0.22, door.z + 2.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.6, 3.4]} />
        <meshBasicMaterial color="#b7c6c8" />
      </mesh>
      {[-0.28, 0, 0.28].map((x) => (
        <mesh key={x} position={[x, 0.36, door.z + 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.22, 2.4]} />
          <meshBasicMaterial color="#e4d8c4" map={plank ?? undefined} />
        </mesh>
      ))}
    </group>
  );
}

function RoomCards({ door, font }: { door: DoorSpec; font: string }) {
  const cards = cardsFor(door.id, getSiteContent());

  return (
    <group>
      <RoomScenery door={door} />
      {cards.map((card, index) => (
        <CardMesh
          card={card}
          font={font}
          key={`${card.title}-${card.note}`}
          pose={arrangement(door.id, index, cards.length, door)}
        />
      ))}
    </group>
  );
}

function Entrance({
  displayFont,
  entered,
  onArrive,
  reduced,
}: Pick<Props, "displayFont" | "entered" | "onArrive" | "reduced">) {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const { profile } = getSiteContent();
  const sign = useMemo(
    () =>
      makeTexture(
        640,
        280,
        (ctx) => paintSign(ctx, profile.name, profile.title, displayFont),
        null,
      ),
    [displayFont, profile.name, profile.title],
  );

  useEffect(() => () => sign?.dispose(), [sign]);

  useFrame(({ clock }) => {
    const panels = [left.current, right.current];
    if (panels.includes(null)) return;

    const open =
      reduced || entered ? (entered ? 1.25 : 0) : Math.sin(clock.elapsedTime) * 0.04;
    panels[0]!.rotation.y = -open;
    panels[1]!.rotation.y = open;
  });

  const arrive = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onArrive();
  };

  return (
    <group position={[0, 1.05, 6.15]}>
      <mesh position={[0, 1.42, 0.08]}>
        <planeGeometry args={[1.7, 0.62]} />
        <meshBasicMaterial color="#f7f1e4" map={sign ?? undefined} side={DoubleSide} />
      </mesh>
      <group position={[-0.58, 0, 0]} ref={left}>
        <mesh name="entrance-doors" onClick={arrive}>
          <planeGeometry args={[1.08, 2.16]} />
          <meshBasicMaterial color="#f4efe4" side={DoubleSide} />
        </mesh>
      </group>
      <group position={[0.58, 0, 0]} ref={right}>
        <mesh name="entrance-right" onClick={arrive}>
          <planeGeometry args={[1.08, 2.16]} />
          <meshBasicMaterial color="#f4efe4" side={DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export function CorridorScene({
  active,
  antialias,
  displayFont,
  dpr,
  entered,
  handFont,
  onArrive,
  onEnter,
  reduced,
  walk,
}: Props) {
  const activeDoor = active ? doorById(active) : null;

  return (
    <Canvas
      camera={{ far: 80, fov: 52, near: 0.1, position: [0, 1.34, 8] }}
      dpr={dpr}
      gl={{ alpha: false, antialias }}
      style={{ background: "#f3eee4", height: "100%", width: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#f3eee4");
      }}
    >
      <color args={["#f3eee4"]} attach="background" />
      <fog args={["#f3eee4", 7, 26]} attach="fog" />
      <Rig active={active} entered={entered} reduced={reduced} walk={walk} />
      <Entrance
        displayFont={displayFont}
        entered={entered}
        onArrive={onArrive}
        reduced={reduced}
      />
      <Shell />
      <Airplane reduced={reduced} />
      {wallNotes.map((note) => (
        <NoteMesh font={handFont} key={note.word} note={note} />
      ))}
      {doors.map((door) => (
        <DoorMesh
          active={active === door.id}
          door={door}
          font={displayFont}
          key={door.id}
          onEnter={onEnter}
          reduced={reduced}
        />
      ))}
      {activeDoor ? <RoomCards door={activeDoor} font={handFont} /> : null}
    </Canvas>
  );
}
