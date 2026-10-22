import {
  useRef,
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
  type RefObject,
} from "react";

import { getInitialRoomFromUrl } from "../hooks/useDocumentMeta";

import type { OverlayContent } from "../types/content";

type TeleportPhase = "closing" | "teleporting" | "opening" | null;

interface SceneContextValue {
  currentRoom: string | null;
  hasEntered: boolean;
  exitRequested: boolean;
  overlayContent: OverlayContent | null;
  enterRoom: (roomId: string | null) => void;
  exitRoom: () => void;
  requestExit: () => void;
  clearExitRequest: () => void;
  markEntered: () => void;
  openOverlay: (content: OverlayContent) => void;
  closeOverlay: () => void;
  isInRoom: boolean;
  initialRoom: string | null;
  deeplinkHandled: RefObject<boolean>;
  teleportTarget: string | null;
  isTeleporting: boolean;
  teleportPhase: TeleportPhase;
  pendingDoorClick: string | null;
  isFastTeleport: boolean;
  teleportTo: (roomId: string) => void;
  startTeleportTransition: () => void;
  openTeleportTransition: () => void;
  completeTeleport: () => void;
  signalRoomReady: () => void;
  finishPaperOpen: () => void;
  cancelTeleport: () => void;
}

interface Props {
  children: ReactNode;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
};

export const SceneProvider = ({ children }: Props) => {
  const initialRoom = useRef(getInitialRoomFromUrl());
  const deeplinkHandled = useRef(false);

  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [exitRequested, setExitRequested] = useState(false);
  const [overlayContent, setOverlayContent] = useState<OverlayContent | null>(null);

  const [teleportTarget, setTeleportTarget] = useState<string | null>(null);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [teleportPhase, setTeleportPhase] = useState<TeleportPhase>(null);
  const [pendingDoorClick, setPendingDoorClick] = useState<string | null>(null);
  const [isFastTeleport, setIsFastTeleport] = useState(false);

  const enterRoom = useCallback((roomId: string | null) => {
    setCurrentRoom(roomId);
    setExitRequested(false);
    setOverlayContent(null);

    setIsTeleporting(false);
    setPendingDoorClick(null);
  }, []);

  const exitRoom = useCallback(() => {
    setCurrentRoom(null);
    setExitRequested(false);
    setOverlayContent(null);
  }, []);

  const requestExit = useCallback(() => {
    setExitRequested(true);
    setOverlayContent(null);
  }, []);

  const clearExitRequest = useCallback(() => {
    setExitRequested(false);
  }, []);

  const markEntered = useCallback(() => {
    setHasEntered(true);
  }, []);

  const openOverlay = useCallback(
    (content: import("../types/content").OverlayContent | null) => {
      setOverlayContent(content);
    },
    [],
  );

  const closeOverlay = useCallback(() => {
    setOverlayContent(null);
  }, []);

  const teleportTo = useCallback(
    (roomId: string) => {
      if (isTeleporting || roomId === currentRoom) return;

      setTeleportTarget(roomId);
      setIsTeleporting(true);
      setIsFastTeleport(true);
      setTeleportPhase("closing");
      setOverlayContent(null);
    },
    [isTeleporting, currentRoom],
  );

  const startTeleportTransition = useCallback(() => {
    setTeleportPhase("teleporting");
  }, []);

  const openTeleportTransition = useCallback(() => {
    setTeleportPhase("opening");
  }, []);

  const completeTeleport = useCallback(() => {
    setPendingDoorClick(teleportTarget);

    setTeleportTarget(null);
  }, [teleportTarget]);

  const signalRoomReady = useCallback(() => {
    if (isFastTeleport) {
      setTeleportPhase("opening");
      setIsFastTeleport(false);
    }
  }, [isFastTeleport]);

  const finishPaperOpen = useCallback(() => {
    setTeleportPhase(null);
  }, []);

  const cancelTeleport = useCallback(() => {
    setTeleportTarget(null);
    setIsTeleporting(false);
    setTeleportPhase(null);
    setPendingDoorClick(null);
    setIsFastTeleport(false);
  }, []);

  const value = useMemo(
    () => ({
      currentRoom,
      hasEntered,
      exitRequested,
      overlayContent,
      enterRoom,
      exitRoom,
      requestExit,
      clearExitRequest,
      markEntered,
      openOverlay,
      closeOverlay,
      isInRoom: currentRoom !== null,

      initialRoom: initialRoom.current,
      deeplinkHandled,

      teleportTarget,
      isTeleporting,
      teleportPhase,
      pendingDoorClick,
      isFastTeleport,
      teleportTo,
      startTeleportTransition,
      openTeleportTransition,
      completeTeleport,
      signalRoomReady,
      finishPaperOpen,
      cancelTeleport,
    }),
    [
      currentRoom,
      hasEntered,
      exitRequested,
      overlayContent,
      enterRoom,
      exitRoom,
      requestExit,
      clearExitRequest,
      markEntered,
      openOverlay,
      closeOverlay,

      teleportTarget,
      isTeleporting,
      teleportPhase,
      pendingDoorClick,
      isFastTeleport,
      teleportTo,
      startTeleportTransition,
      openTeleportTransition,
      completeTeleport,
      signalRoomReady,
      finishPaperOpen,
      cancelTeleport,
    ],
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
};

export default SceneContext;
