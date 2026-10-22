"use client";

import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Caveat, Patrick_Hand } from "next/font/google";

import { getSiteContent } from "@/queries/site";

import type { DoorId } from "@/components/stage/world/layout";
import { CorridorScene } from "@/components/stage/world/corridor-scene";
import {
  cardsFor,
  corridorStart,
  doorById,
  doors,
  isControl,
  nearestDoor,
  roomLead,
  sketchQuality,
  walkBy,
} from "@/components/stage/world/layout";

const hand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

const ink = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function StageScene() {
  const content = getSiteContent();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const quality = sketchQuality();
  const [entered, setEntered] = useState(false);
  const [room, setRoom] = useState<DoorId | null>(null);
  const [walk, setWalk] = useState(corridorStart);
  const dragY = useRef<number | null>(null);
  const root = useRef<HTMLElement>(null);
  const walkRef = useRef(walk);

  useEffect(() => {
    walkRef.current = walk;
  }, [walk]);

  useEffect(() => {
    const node = root.current as HTMLElement;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (!entered || room) return;
      setWalk((current) => walkBy(current, event.deltaY));
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [entered, room]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!entered) {
        if (event.key === "Enter" && !isControl(event.target)) setEntered(true);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const delta = event.key === "ArrowDown" ? 120 : -120;
        setWalk((current) => walkBy(current, delta));
        return;
      }

      if (event.key === "Backspace") {
        setRoom(null);
        return;
      }

      if (event.key !== "Enter") return;
      if (isControl(event.target)) return;
      if (room) return;

      const near = nearestDoor(walkRef.current);
      if (!near) return;
      setRoom(near.id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, room]);

  const nearest = nearestDoor(walk);
  const sheet = room ? cardsFor(room, content) : [];

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isControl(event.target)) return;
    dragY.current = event.clientY;
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!entered) return;
    if (dragY.current === null) return;
    if (room) return;

    const delta = dragY.current - event.clientY;
    dragY.current = event.clientY;
    if (delta === 0) return;
    setWalk((current) => walkBy(current, delta * 8));
  };

  const endDrag = () => {
    dragY.current = null;
  };

  const enterCorridor = () => {
    setEntered(true);
  };

  const openRoom = (id: DoorId) => {
    setEntered(true);
    setRoom(id);
  };

  return (
    <section
      aria-label="Sketch corridor"
      className={`${hand.className} relative h-full w-full overflow-hidden text-[#1c1916]`}
      onPointerDown={onPointerDown}
      onPointerLeave={endDrag}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      ref={root}
      role="region"
    >
      <CorridorScene
        active={room}
        antialias={quality.antialias}
        displayFont={ink.style.fontFamily}
        dpr={quality.dpr}
        entered={entered}
        handFont={hand.style.fontFamily}
        onArrive={enterCorridor}
        onEnter={openRoom}
        reduced={reduced}
        walk={walk}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(28,25,22,0.18))]" />
      <p
        className={`${ink.className} pointer-events-none absolute top-5 left-5 text-4xl leading-none`}
      >
        {content.profile.name}
      </p>
      <p className="sr-only" data-testid="walk-status">
        {!entered
          ? "At the entrance"
          : nearest
            ? `Near ${nearest.label}`
            : "Walking the corridor"}
      </p>
      <nav
        aria-label="Rooms"
        className="pointer-events-auto absolute top-20 left-4 flex flex-wrap gap-2 sm:top-1/2 sm:left-5 sm:w-36 sm:-translate-y-1/2 sm:flex-col"
      >
        {doors.map((door, index) => (
          <button
            aria-label={door.label}
            className={`border px-3 py-2 text-left ${
              nearest?.id === door.id
                ? "border-[#1c1916] bg-[#1c1916] text-[#f6f0e4]"
                : "border-[#1c1916]/25 bg-[#f6f0e4]/85 text-[#1c1916]"
            }`}
            key={door.id}
            onClick={() => openRoom(door.id)}
            type="button"
          >
            <span className="block font-mono text-[10px] tracking-[0.18em]">
              0{index + 1}
            </span>
            <span className={`${ink.className} block text-2xl leading-none`}>
              {door.label}
            </span>
          </button>
        ))}
      </nav>
      {room ? (
        <aside className="pointer-events-auto absolute top-16 right-4 bottom-4 w-[min(26rem,calc(100%-6.5rem))] overflow-auto bg-[#f7f1e4] px-7 pt-8 pb-7 shadow-[8px_12px_0_rgba(28,25,22,0.14)]">
          <span
            aria-hidden
            className="absolute top-0 left-8 h-4 w-16 -translate-y-1/2 -rotate-2 bg-[#e7d48a]"
          />
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase">
            {roomLead[room]}
          </p>
          <h2 className={`${ink.className} mt-2 text-5xl leading-none`}>
            {doorById(room).label}
          </h2>
          {room === "about" ? (
            <p className="mt-4 text-lg leading-6">{content.profile.summary}</p>
          ) : null}
          <ul className="mt-6 space-y-4">
            {sheet.map((card) => (
              <li key={`${card.title}-${card.note}`}>
                {card.href ? (
                  <a
                    className="block underline decoration-[#1c1916]/30 underline-offset-4"
                    href={card.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className={`${ink.className} block text-3xl leading-none`}>
                      {card.title}
                    </span>
                    <span className="mt-1 block text-sm">{card.note}</span>
                  </a>
                ) : (
                  <p>
                    <span className={`${ink.className} block text-3xl leading-none`}>
                      {card.title}
                    </span>
                    <span className="mt-1 block text-sm">{card.note}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
          <button
            className="mt-8 border border-[#1c1916] px-4 py-2"
            onClick={() => setRoom(null)}
            type="button"
          >
            Back to corridor
          </button>
        </aside>
      ) : (
        <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <p className={`${ink.className} text-center text-2xl`}>
            {entered ? "Scroll to walk. Click a door." : "Click the doors"}
          </p>
          {entered ? null : (
            <button
              className="pointer-events-auto border border-[#1c1916] bg-[#f7f1e4] px-4 py-2 text-[#1c1916]"
              onClick={enterCorridor}
              type="button"
            >
              Enter the corridor
            </button>
          )}
        </div>
      )}
    </section>
  );
}
