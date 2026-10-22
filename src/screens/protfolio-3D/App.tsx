"use client";

import "./styles/main.scss";

import { TextureLoader } from "three";
import { configureTextBuilder } from "troika-three-text";
import { Canvas, useLoader } from "@react-three/fiber";
import { Preload, useTexture, PerformanceMonitor } from "@react-three/drei";
import { lazy, Suspense, useState, useEffect, useCallback } from "react";

import { initAudio } from "./utils/audioManager";
import { useAudio, AudioProvider } from "./context/AudioManager";
import { useScene, SceneProvider } from "./context/SceneContext";
import { AchievementsProvider } from "./context/AchievementsContext";
import { usePerformance, PerformanceProvider } from "./context/PerformanceContext";
import {
  PRELOAD_ALL,
  UI_TEXTURES,
  IMAGE_ASSETS,
  ABOUT_TEXTURES,
  PRELOAD_LOADER,
  CORRIDOR_TEXTURES,
  ENTRANCE_TEXTURES,
  filterTexturesByDevice,
} from "./config/texturePreloadList";

import Preloader from "./components/dom/Preloader";
import NavigationUI from "./components/ui/NavigationUI";
import GlobalOverlay from "./components/ui/GlobalOverlay";
import PaperTransition from "./components/dom/PaperTransition";
import ScreenReaderOverlay from "./components/ui/ScreenReaderOverlay";

configureTextBuilder({
  defaultFontURL: "/fonts/CabinSketch-Bold.ttf",
  useWorker: false,
});

const Experience = lazy(() => import("./components/canvas/Experience"));

const preloadBrowserImage = (path: string) => {
  if (typeof window === "undefined") return;
  const img = new Image();
  img.src = path;
};

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || "");
const isWeakCPU =
  typeof navigator.hardwareConcurrency !== "undefined" &&
  navigator.hardwareConcurrency <= 4;
const isLowRAM =
  typeof navigator.deviceMemory !== "undefined" && navigator.deviceMemory <= 4;
const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 450;
const isLowEnd = isMobileDevice || isWeakCPU || isLowRAM || isSmallScreen;

const supportsHover =
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

if (isLowEnd) {
  const CORE_TEXTURES = [
    ...ENTRANCE_TEXTURES,
    ...CORRIDOR_TEXTURES,
    ...UI_TEXTURES,
    ...IMAGE_ASSETS,
  ];
  const filteredCore = filterTexturesByDevice(CORE_TEXTURES, supportsHover);
  const filteredAbout = filterTexturesByDevice(ABOUT_TEXTURES, supportsHover);

  filteredCore.forEach((path: string) => useTexture.preload(path));
  filteredAbout.forEach((path: string) => useLoader.preload(TextureLoader, path));
} else {
  const filteredAll = filterTexturesByDevice(PRELOAD_ALL, supportsHover);
  const filteredLoader = filterTexturesByDevice(PRELOAD_LOADER, supportsHover);

  filteredAll.forEach((path: string) => useTexture.preload(path));
  filteredLoader.forEach((path: string) => useLoader.preload(TextureLoader, path));
}

const GlobalAudioEnabler = () => {
  const { enableAudio } = useAudio();
  useEffect(() => {
    const handleInteraction = () => enableAudio();
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [enableAudio]);
  return null;
};

function DocumentMetaBridge() {
  const { initialRoom, deeplinkHandled, hasEntered, teleportTo } = useScene();

  useEffect(() => {
    if (initialRoom && hasEntered && !deeplinkHandled.current) {
      deeplinkHandled.current = true;

      setTimeout(() => teleportTo(initialRoom), 300);
    }
  }, [initialRoom, hasEntered, teleportTo, deeplinkHandled]);

  return null;
}

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const { settings, downgradeTier, tier } = usePerformance();

  useEffect(() => {
    initAudio();
  }, []);

  const handleSceneReady = useCallback(() => {
    requestAnimationFrame(() => {
      setSceneReady(true);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setSceneReady(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AudioProvider>
      <SceneProvider>
        <DocumentMetaBridge />
        <GlobalAudioEnabler />
        <div className="app">
          <div className="canvas-wrapper">
            <Canvas
              camera={{
                position: [0, 0.2, 28],
                fov: 60,
                near: 0.1,
                far: 150,
              }}
              gl={{
                antialias: settings.antialias,
                alpha: false,
                powerPreference: settings.powerPreference,
                localClippingEnabled: true,
                failIfMajorPerformanceCaveat: true,
              }}
              dpr={settings.dpr}
              shadows={settings.shadows}
            >
              <color attach="background" args={["#fafafa"]} />
              <fog attach="fog" args={["#fafafa", 15, 50]} />

              <PerformanceMonitor
                onDecline={() => downgradeTier()}
                flipflops={3}
                onFallback={() => downgradeTier()}
              />

              <Suspense fallback={null}>
                <Experience
                  isLoaded={isLoaded}
                  onSceneReady={handleSceneReady}
                  performanceTier={tier}
                />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>

          {isLoaded && (
            <>
              <NavigationUI />
              <GlobalOverlay />
              <PaperTransition />
              <ScreenReaderOverlay />
            </>
          )}

          <Preloader ready={sceneReady} onComplete={() => setIsLoaded(true)} />
        </div>
      </SceneProvider>
    </AudioProvider>
  );
}

export default function App() {
  useEffect(() => {
    const filteredImages = filterTexturesByDevice(IMAGE_ASSETS, supportsHover);

    filteredImages.forEach((path: string) => preloadBrowserImage(path));
  }, []);

  return (
    <PerformanceProvider>
      <AchievementsProvider>
        <AppContent />
      </AchievementsProvider>
    </PerformanceProvider>
  );
}
