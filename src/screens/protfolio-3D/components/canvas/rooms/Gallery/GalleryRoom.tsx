import { PositionalAudio, Line, Float32BufferAttribute } from "../../intrinsic";
import gsap from "gsap";
import * as THREE from "three";
import { Observer } from "gsap/all";
import { useFrame } from "@react-three/fiber";
import {
  memo,
  useRef,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Text, useTexture } from "@react-three/drei";

import { useAudio } from "../../../../context/AudioManager";
import { useScene } from "../../../../context/SceneContext";
import { usePaintMaterial } from "../../../../hooks/usePaintMaterial";
import { useAchievements } from "../../../../context/AchievementsContext";

import GalleryClouds from "./GalleryClouds";
import PaperMaterial from "./PaperMaterial";

gsap.registerPlugin(Observer);

const _tempScale = new THREE.Vector3();

export const AUDIO_SETTINGS = {
  volume: 0.6,
  distance: 2,
  rolloff: 1.5,
};

export const GALLERY_INTERACTION_AUDIO_SETTINGS = {
  volume: 0.6,
  distance: 2,
  rolloff: 2,
};

// veritas

export const FALLBACK_PROJECTS = [
  {
    id: "tablekart",
    title: "TableKart",
    front: "/textures/gallery/tablekart.webp",
    painted: "/textures/gallery/tablekart_painted.webp",
    url: "https://cv-byt.vercel.app/",
    description:
      "A fine-dining reservation and seat-side ordering platform for discovering, booking, and dining at curated local restaurants.",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
  {
    id: "comecloser",
    title: "Come Closer",
    front: "/textures/gallery/comecloser.webp",
    painted: "/textures/gallery/comecloser_painted.webp",
    url: "https://matchnmeet.io",
    description:
      "An ephemeral, browser-based video or chat room application where users can instantly create temporary meeting rooms with custom names and invite others via a shared link, which automatically closes once everyone leaves.",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
  {
    id: "matchmeet",
    title: "Match & Meet",
    front: "/textures/gallery/matchmeet.webp",
    painted: "/textures/gallery/matchmeet_painted.webp",
    url: "https://matchnmeet.io",
    description:
      "Match & Meet is an online dating platform designed to help single individuals connect locally and globally. It allows users to discover matches based on mutual interests and preferences. The platform provides a secure environment to chat, build relationships, and find lasting connections.",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
  {
    id: "oia",
    title: "OIA",
    front: "/textures/gallery/oia.webp",
    painted: "/textures/gallery/oia_painted.webp",
    url: "https://odhavindustries.org",
    description:
      "It serves as a portal for member companies to access official circulars, download application forms (like water/drainage connections), check job openings, browse industry directories, and find quick links to government and regulatory services such as GIDC, GPCB, GST, and PF.",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
  {
    id: "locoshop",
    title: "LocoShop",
    front: "/textures/gallery/locoshop.webp",
    painted: "/textures/gallery/locoshop_painted.webp",
    url: "https://loco-shop-tau.vercel.app",
    description:
      "Locoshop is a global brand locator platform that helps shoppers discover where their favorite top brands are sold in nearby physical stores as well as online, making it easy to locate local retailers and products across multiple cities and countries.",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
  {
    id: "veritas",
    title: "Veritas Global",
    front: "/textures/gallery/veritas.webp",
    url: "https://vertas-global.vercel.app",
    painted: "/textures/gallery/veritas_painted.webp",
    description:
      "Veritas Global is an international security, medical assistance, and travel risk management provider dedicated to safeguarding individuals and organizations worldwide.",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
  {
    id: "prospuh",
    title: "Prospuh",
    front: "/textures/gallery/prospuh.webp",
    painted: "/textures/gallery/prospuh_painted.webp",
    url: "https://prospuh.com",
    description:
      "Prospuh is a fintech platform and mobile-first broker-dealer designed to make investing in global stocks accessible and simple. It allows users to start building and managing their portfolios with low capital entry requirements (starting from $20).",
    techStack: [
      "/textures/gallery/reactlogo.webp",
      "/textures/gallery/jslogo.webp",
      "/textures/gallery/htmllogo.webp",
      "/textures/gallery/csslogo.webp",
    ],
  },
];

const PROJECT_COUNT = 10;
const GAP = 2.5;

const BIRD_WIDTH = 0.49;
const BIRD_HEIGHT = 0.35;

const RIGHT_CROP_AMOUNT = 0.2;

interface Props {
  showRoom?: boolean;
  onReady?: () => void;
  isExiting?: boolean;
  isWarmup?: boolean;
}

const GalleryRoom = ({ showRoom, onReady, isExiting, isWarmup }: Props) => {
  const { isTeleporting } = useScene();
  const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
  const { globalVolume, isMuted } = useAudio();
  const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

  const audioRef = useRef<import("three").PositionalAudio>(null);
  useEffect(() => {
    if (audioRef.current && audioRef.current.setVolume) {
      audioRef.current.setVolume(effectiveVolume);
    }
  }, [effectiveVolume]);

  const groupRef = useRef<import("three").Object3D>(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [globalIsAnimating, setGlobalIsAnimating] = useState(false);
  const cardRefs = useRef<(ProjectCardHandle | null)[]>([]);

  useEffect(() => {
    if (isExiting || isTeleporting) {
      hidePopup();
    }
  }, [isExiting, isTeleporting, hidePopup]);

  const { onBeforeCompile, animatePaint, resetPaint, uniformsData, updateRoomOrigin } =
    usePaintMaterial();

  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const handleCardClick = async (clickedIndex: number) => {
    if (globalIsAnimating || isTransitioning) return;

    unlockAchievement("gallery_inspect");

    if (selectedCard === clickedIndex) {
      setGlobalIsAnimating(true);
      await cardRefs.current[clickedIndex]!.closeCard();
      setSelectedCard(null);
      setGlobalIsAnimating(false);
    } else if (selectedCard !== null) {
      setGlobalIsAnimating(true);
      await cardRefs.current[selectedCard]!.closeCard();
      setSelectedCard(null);
      await cardRefs.current[clickedIndex]!.openCard();
      setSelectedCard(clickedIndex);
      setGlobalIsAnimating(false);
    } else {
      setGlobalIsAnimating(true);
      await cardRefs.current[clickedIndex]!.openCard();
      setSelectedCard(clickedIndex);
      setGlobalIsAnimating(false);
    }
  };

  const hasSignaledReady = useRef(false);
  const frameCount = useRef(0);
  const FRAMES_TO_WAIT = 5;

  useFrame(() => {
    updateRoomOrigin(groupRef);

    if (hasSignaledReady.current) return;
    frameCount.current++;
    if (frameCount.current >= FRAMES_TO_WAIT) {
      hasSignaledReady.current = true;
      onReady?.();

      setTimeout(() => {
        if (!isWarmup) showTutorial("gallery_inspect");
      }, 2000);
    }
  });

  const RAILING_HEIGHT = 1.25;

  const [canHover, setCanHover] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(hover: hover)").matches : true,
  );

  const activeProjects = FALLBACK_PROJECTS;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const handleHoverChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handleHoverChange);
    return () => mq.removeEventListener("change", handleHoverChange);
  }, []);

  const textureUrls = activeProjects.map((p) => p.front) as string[];
  const projectTextures = useTexture(textureUrls);

  const paintedUrls = activeProjects.map((p) =>
    canHover && p.painted ? p.painted : p.front,
  ) as string[];
  const paintedTextures = useTexture(paintedUrls);

  const backTextureRaw = useTexture(
    canHover
      ? "/textures/gallery/tylkartki_painted.webp"
      : "/textures/gallery/tylkartki.webp",
  );
  const overlayTextureRaw = useTexture(
    canHover
      ? "/textures/gallery/przyciskdotylukartki_painted.webp"
      : "/textures/gallery/przyciskdotylukartki.webp",
  );

  const allLogos = useMemo(() => {
    const names = [
      "csslogo",
      "elementorlogo",
      "firebaselogo",
      "htmllogo",
      "jslogo",
      "netlifylogo",
      "phplogo",
      "reactlogo",
      "tailwindlogo",
      "wordpresslogo",
    ];
    return names.map((name) => {
      if (!canHover) return `/textures/gallery/${name}.webp`;
      if (name === "csslogo") return `/textures/gallery/css3logo_painted.webp`;
      return `/textures/gallery/${name}_painted.webp`;
    });
  }, [canHover]);

  useTexture(allLogos);

  const projects = useMemo(() => {
    return Array.from({ length: PROJECT_COUNT }).map((_, i) => {
      const projectIndex = i % activeProjects.length;
      const projectData = activeProjects[projectIndex];

      const frontTex = (projectTextures as THREE.Texture[])[projectIndex];
      const paintedTex = (paintedTextures as THREE.Texture[])[projectIndex];

      if (frontTex) {
        frontTex.colorSpace = THREE.SRGBColorSpace;
      }
      if (paintedTex) {
        paintedTex.colorSpace = THREE.SRGBColorSpace;
      }
      if (backTextureRaw) {
        backTextureRaw.colorSpace = THREE.SRGBColorSpace;
      }
      if (overlayTextureRaw) {
        overlayTextureRaw.colorSpace = THREE.SRGBColorSpace;
      }

      const techStack = projectData.techStack.map((path: string) => {
        if (!canHover) return path;
        const name = path.split("/").pop()!.replace(".webp", "");
        if (name === "csslogo") return "/textures/gallery/css3logo_painted.webp";
        return `/textures/gallery/${name}_painted.webp`;
      });

      return {
        ...projectData,
        index: i,
        frontTexture: frontTex,
        paintedTexture: paintedTex !== frontTex && canHover ? paintedTex : null,
        backTexture: backTextureRaw,
        buttonTexture: overlayTextureRaw,
        techStack: techStack,
      };
    });
  }, [projectTextures, backTextureRaw, overlayTextureRaw]);

  const scrollToIndex = (index: number, onComplete: () => void) => {
    const totalWidth = PROJECT_COUNT * GAP;
    const targetScrollValue = index * GAP;
    const currentScrollValue = currentScroll.current;

    let diff = targetScrollValue - currentScrollValue;
    const halfWidth = totalWidth / 2;
    while (diff > halfWidth) diff -= totalWidth;
    while (diff < -halfWidth) diff += totalWidth;

    const finalTarget = currentScrollValue + diff;

    gsap.to(targetScroll, {
      current: finalTarget,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(currentScroll, {
      current: finalTarget,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onComplete,
    });
  };

  const lastTouchX = useRef(0);
  useEffect(() => {
    const scrollObserver = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onWheel: (e) => {
        if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning)
          return;
        const orig = e.event as Event & { deltaY?: number; touches?: TouchList };
        orig.preventDefault();
        targetScroll.current += (orig.deltaY ?? 0) * 0.005;
      },
      onPress: (e) => {
        if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning)
          return;
        const orig = e.event as Event & { deltaY?: number; touches?: TouchList };
        if (orig.touches && orig.touches.length === 1) {
          lastTouchX.current = orig.touches[0].clientX;
        }
      },
      onDrag: (e) => {
        if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning)
          return;
        const orig = e.event as Event & { deltaY?: number; touches?: TouchList };
        if (orig.touches && orig.touches.length === 1) {
          const deltaX = lastTouchX.current - orig.touches[0].clientX;
          lastTouchX.current = orig.touches[0].clientX;
          targetScroll.current += deltaX * 0.008;
        }
      },
    });

    return () => scrollObserver.kill();
  }, [showRoom, selectedCard, globalIsAnimating]);

  useFrame((state, delta) => {
    currentScroll.current = THREE.MathUtils.lerp(
      currentScroll.current,
      targetScroll.current,
      delta * 5,
    );
  });

  const floorTexture = useTexture("/textures/gallery/floor.webp");
  const railingTexture = useTexture("/textures/gallery/railing.webp");
  const housesTexture = useTexture("/textures/gallery/domki.webp");
  const cityTexture = useTexture("/textures/gallery/miastotlo.webp");
  const birdTexture = useTexture("/textures/gallery/bird_gray.webp");
  const clothespinTexture = useTexture("/textures/gallery/klamerka.webp");

  useEffect(() => {
    if (floorTexture) {
      floorTexture.wrapS = THREE.MirroredRepeatWrapping;
      floorTexture.wrapT = THREE.MirroredRepeatWrapping;
      floorTexture.repeat.set(0.5, 0.5 * 1.835);
      floorTexture.needsUpdate = true;
    }
    if (railingTexture) {
      railingTexture.wrapS = railingTexture.wrapT = THREE.RepeatWrapping;
      railingTexture.repeat.set(7, 1);
      railingTexture.needsUpdate = true;
    }
  }, [floorTexture, railingTexture]);

  const materials = useMemo(() => {
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorTexture,
      color: "#e0e0e0",
      side: THREE.DoubleSide,
    });
    floorMat.onBeforeCompile = onBeforeCompile;
    floorMat.transparent = true;
    floorMat.needsUpdate = true;

    const ropeMat = new THREE.MeshBasicMaterial({ color: "#666666" });
    ropeMat.onBeforeCompile = onBeforeCompile;
    ropeMat.transparent = true;
    ropeMat.needsUpdate = true;

    const thresholdMat = new THREE.MeshBasicMaterial({
      color: "#e0e0e0",
      map: (() => {
        const t = new THREE.TextureLoader().load(
          "/textures/corridor/texturadoprogow.webp",
        );
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(15 / 2.524, 1);
        return t;
      })(),
      side: THREE.DoubleSide,
    });
    thresholdMat.onBeforeCompile = onBeforeCompile;
    thresholdMat.transparent = true;
    thresholdMat.needsUpdate = true;

    return {
      floor: floorMat,
      rope: ropeMat,
      threshold: thresholdMat,
    };
  }, [floorTexture, onBeforeCompile]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-16, 3.5, -6),
      new THREE.Vector3(-8, 2.5, -4.5),
      new THREE.Vector3(0, 1.8, -3),
      new THREE.Vector3(8, 2.5, -4.5),
      new THREE.Vector3(16, 3.5, -6),
    ]);
  }, []);

  const ropeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.015, 8, false);
  }, [curve]);

  const floorShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.1, -2.0);
    shape.lineTo(1.1, -2.0);
    shape.lineTo(7.5, 4);
    shape.lineTo(-7.5, 4);
    shape.lineTo(-1.1, -2.0);
    return shape;
  }, []);

  return (
    <group ref={groupRef}>
      {!isWarmup && (
        <PositionalAudio
          ref={audioRef}
          url="/sounds/szummiasta.mp3"
          distanceModel="exponential"
          refDistance={AUDIO_SETTINGS.distance}
          rolloffFactor={AUDIO_SETTINGS.rolloff}
          loop
          autoplay
          volume={effectiveVolume}
        />
      )}
      <group position={[0, -0.7, -2]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <shapeGeometry args={[floorShape]} />
          <primitive object={materials.floor} />
        </mesh>

        <Line rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <bufferGeometry>
            <Float32BufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([7.5, 4, 0, -7.5, 4, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#999999"
            onBeforeCompile={onBeforeCompile}
            transparent={true}
            needsUpdate={true}
          />
        </Line>

        <mesh position={[0, RAILING_HEIGHT / 2, -3.9]}>
          <planeGeometry args={[20, RAILING_HEIGHT]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={railingTexture}
            transparent={true}
            side={THREE.DoubleSide}
            alphaTest={0.1}
            onBeforeCompile={onBeforeCompile}
            customProgramCacheKey={() => "railing-paint"}
          />
        </mesh>

        <mesh position={[0, 0.01, -3.9]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[15, 0.15]} />
          <primitive object={materials.threshold} />
        </mesh>

        <group position={[0, 1.6, -4]}>
          <mesh geometry={ropeGeometry} material={materials.rope} />

          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              index={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              project={project}
              clothespinTexture={clothespinTexture}
              total={PROJECT_COUNT}
              currentScroll={currentScroll}
              materials={materials}
              curve={curve}
              isSelected={selectedCard === i}
              scrollToIndex={scrollToIndex}
              onClick={handleCardClick}
              isMobile={!canHover}
              isTransitioning={isTransitioning}
              paintProgress={uniformsData.uPaintProgress}
              roomOrigin={uniformsData.uRoomOrigin}
            />
          ))}
        </group>

        <mesh position={[0, -1, -9]} scale={[1, 1, 1]}>
          <planeGeometry args={[15, 15 / 2.357]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={housesTexture}
            transparent={true}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>

        <mesh position={[-15, -1, -9]} scale={[-1, 1, 1]}>
          <planeGeometry args={[15, 15 / 2.357]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={housesTexture}
            transparent={true}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>

        <RightSideHouses
          texture={housesTexture}
          baseWidth={15}
          baseHeight={15 / 2.357}
          cropAmount={RIGHT_CROP_AMOUNT}
        />

        <mesh position={[0, 3.4, -17]} scale={[1, 1, 1]}>
          <planeGeometry args={[30, 30 / 2.357]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={cityTexture}
            transparent={true}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>

        <mesh position={[-30, 3.4, -17]} scale={[-1, 1, 1]}>
          <planeGeometry args={[30, 30 / 2.357]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={cityTexture}
            transparent={true}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>

        <mesh position={[30, 3.4, -17]} scale={[-1, 1, 1]}>
          <planeGeometry args={[30, 30 / 2.357]} />
          <meshBasicMaterial
            color="#e0e0e0"
            map={cityTexture}
            transparent={true}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>

        <FlyingBird texture={birdTexture} />

        <GalleryClouds count={65} seed={123} />

        <mesh position={[0, 5, -20]}>
          <sphereGeometry args={[40, 32, 32]} />
          <meshBasicMaterial
            color="#f0f0f0"
            side={THREE.BackSide}
            transparent
            opacity={0.5}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </group>
    </group>
  );
};

interface FlyingBirdProps {
  texture?: import("three").Texture | null;
}

const FlyingBird = ({ texture }: FlyingBirdProps) => {
  const birdRef = useRef<import("three").Object3D>(null);
  const startX = -25;
  const endX = 25;
  const speed = 2.5;

  const velocityY = useRef(0);
  const gravity = -12.0;
  const jumpStrength = 5.5;
  const jumpInterval = useRef(0);

  useFrame((state, delta) => {
    if (!birdRef.current) return;

    const safeDelta = Math.min(delta, 0.05);

    birdRef.current.position.x += speed * safeDelta;

    if (birdRef.current.position.x > endX) {
      birdRef.current.position.x = startX;
      birdRef.current.position.y = 4.5;
      velocityY.current = 0;
      jumpInterval.current = 0;
      birdRef.current.rotation.z = 0;
    }

    velocityY.current += gravity * safeDelta;
    birdRef.current.position.y += velocityY.current * safeDelta;

    jumpInterval.current -= safeDelta;

    if (jumpInterval.current <= 0 || birdRef.current.position.y < 3.2) {
      velocityY.current = jumpStrength;

      jumpInterval.current = 0.9 + Math.random() * 0.3;
    }

    if (birdRef.current.position.y < 3.0) {
      birdRef.current.position.y = 3.0;
      velocityY.current = jumpStrength;
    }

    if (birdRef.current.position.y > 6.5) {
      birdRef.current.position.y = 6.5;
      velocityY.current = 0;
    }

    const targetRotationZ = THREE.MathUtils.clamp(
      velocityY.current * 0.05,
      -Math.PI / 6,
      Math.PI / 8,
    );

    birdRef.current.rotation.z = THREE.MathUtils.lerp(
      birdRef.current.rotation.z,
      targetRotationZ,
      safeDelta * 8,
    );
  });

  return (
    <mesh
      ref={birdRef}
      position={[startX, 4.5, -10]}
      scale={[BIRD_WIDTH, BIRD_HEIGHT, 1]}
    >
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial
        color="#e0e0e0"
        map={texture as THREE.Texture}
        transparent={true}
        alphaTest={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface ProjectCardHandle {
  closeCard: () => Promise<void>;
  openCard: () => Promise<void>;
}

interface ProjectCardProps {
  index: number;
  project: import("../../../../types/content").GalleryProject;
  clothespinTexture?: import("three").Texture | null;
  currentScroll: import("react").RefObject<number>;
  materials?: {
    floor: import("three").Material;
    rope: import("three").Material;
    threshold: import("three").Material;
  };
  curve: import("three").CatmullRomCurve3;
  isSelected?: boolean;
  scrollToIndex: (index: number, onComplete: () => void) => void;
  onClick: (index: number) => void;
  isMobile?: boolean;
  isTransitioning?: boolean;
  paintProgress?: { value: number } | null;
  roomOrigin?: { value: import("three").Vector3 } | null;
  total?: number;
}

const ProjectCard = memo(
  forwardRef<ProjectCardHandle, ProjectCardProps>(
    (
      {
        index,
        project,
        clothespinTexture,
        currentScroll,
        curve,
        isSelected,
        scrollToIndex,
        onClick,
        isMobile,
        isTransitioning,
        paintProgress,
        roomOrigin,
      }: ProjectCardProps,
      ref,
    ) => {
      const cardRef = useRef<import("three").Object3D>(null!);
      const paperRef = useRef<import("three").Object3D>(null!);
      const materialRef = useRef<import("three").Material>(null!);
      const textRef = useRef<
        import("three").Object3D & { material?: import("three").Material }
      >(null);
      const buttonGroupRef = useRef<import("three").Object3D>(null);
      const detailsGroupRef = useRef<import("three").Object3D>(null);
      const techStackGroupRef = useRef<import("three").Object3D>(null);
      const detailsTextRef1 = useRef<
        import("three").Object3D & { material?: import("three").Material }
      >(null);
      const detailsTextRef2 = useRef<
        import("three").Object3D & { material?: import("three").Material }
      >(null);
      const techTextRef = useRef<
        import("three").Object3D & { material?: import("three").Material }
      >(null);
      const openTextRef = useRef<
        import("three").Object3D & { material?: import("three").Material }
      >(null);
      const [hovered, setHovered] = useState(false);
      const [btnHovered, setBtnHovered] = useState(false);
      const [isAnimating, setIsAnimating] = useState(false);
      const [, setIsScrolling] = useState(false);

      const swaySpeed = useRef(Math.random() * 0.2 + 0.3);
      const swayOffset = useRef(Math.random() * 100);

      const paperAudioRef = useRef<import("three").PositionalAudio>(null);
      const { globalVolume, isMuted } = useAudio();

      const playPaperSound = () => {
        if (paperAudioRef.current) {
          const vol = isMuted
            ? 0
            : GALLERY_INTERACTION_AUDIO_SETTINGS.volume * globalVolume;
          paperAudioRef.current.setVolume(vol);
          if (paperAudioRef.current.isPlaying) paperAudioRef.current.stop();
          paperAudioRef.current.play();
        }
      };

      useImperativeHandle(ref, () => ({
        closeCard: () => {
          return new Promise<void>((resolve) => {
            setIsAnimating(true);
            playPaperSound();

            const timeline = gsap.timeline({
              onComplete: () => {
                setIsAnimating(false);
                resolve();

                if (project.paintedTexture && materialRef.current) {
                  gsap.to(materialRef.current, {
                    uProgress: 0.0,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }
              },
            });

            const localBaseY = -1.1;

            timeline.to(paperRef.current.position, {
              y: localBaseY + 0.6,
              x: 0,
              z: 1,
              duration: 0.35,
              ease: "power2.in",
            });

            timeline.to(
              paperRef.current.rotation,
              {
                x: 0.5,
                z: -0.05,
                y: 0,
                duration: 0.35,
                ease: "power2.in",
              },
              "<",
            );

            if (materialRef.current) {
              timeline.to(
                materialRef.current,
                {
                  bend: 0.6,
                  duration: 0.3,
                  ease: "power2.in",
                },
                "<",
              );
            }

            timeline.to(
              paperRef.current.scale,
              {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3,
                ease: "sine.inOut",
              },
              "<",
            );

            timeline.to(paperRef.current.position, {
              y: localBaseY,
              x: 0,
              z: 0,
              duration: 0.25,
              ease: "power3.out",
            });

            timeline.to(
              paperRef.current.rotation,
              {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.25,
                ease: "power3.out",
              },
              "<",
            );

            if (materialRef.current) {
              timeline.to(
                materialRef.current,
                {
                  bend: 0,
                  duration: 0.3,
                  ease: "power2.out",
                },
                "<",
              );
            }
          });
        },
        openCard: () => {
          return new Promise<void>((resolve) => {
            setIsScrolling(true);
            scrollToIndex(index, () => {
              setIsScrolling(false);
              setIsAnimating(true);
              playPaperSound();

              const isMobile = window.innerWidth < 768;
              const targetX_World = 0;
              const targetY_World = isMobile ? -0.2 : 0.1;
              const targetZ_World = isMobile ? 0.5 : 1.5;

              const parentPos = cardRef.current.position;
              const targetX = targetX_World - parentPos.x;
              const targetY = targetY_World - parentPos.y;
              const targetZ = targetZ_World - parentPos.z;

              const timeline = gsap.timeline({
                onComplete: () => {
                  setIsAnimating(false);
                  resolve();
                },
              });

              timeline.to(
                cardRef.current.rotation,
                {
                  x: 0,
                  y: 0,
                  z: 0,
                  duration: 0.3,
                  ease: "power2.out",
                },
                0,
              );

              if (materialRef.current) materialRef.current.bend = 0;

              const localBaseY = -1.1;

              timeline.to(paperRef.current.position, {
                y: localBaseY - 0.5,
                duration: 0.15,
                ease: "power2.out",
              });

              timeline.to(
                paperRef.current.rotation,
                {
                  x: 0.5,
                  z: -0.05,
                  duration: 0.15,
                  ease: "power2.out",
                },
                "<",
              );

              if (materialRef.current) {
                timeline.to(
                  materialRef.current,
                  {
                    bend: 0.8,
                    duration: 0.15,
                    ease: "power2.out",
                  },
                  "<",
                );

                if (project.paintedTexture) {
                  gsap.to(materialRef.current, {
                    uProgress: 1.0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }
              }

              timeline.to(paperRef.current.position, {
                y: localBaseY + 1.5,
                x: targetX * 0.2,
                z: targetZ * 0.2,
                duration: 0.4,
                ease: "power1.out",
              });

              timeline.to(
                paperRef.current.rotation,
                {
                  x: Math.PI * 0.8,
                  z: 0.05,
                  y: -0.02,
                  duration: 0.4,
                  ease: "power1.inOut",
                },
                "<",
              );

              if (materialRef.current) {
                timeline.to(
                  materialRef.current,
                  {
                    bend: -0.3,
                    duration: 0.4,
                    ease: "power1.inOut",
                  },
                  "<",
                );
              }

              timeline.to(paperRef.current.position, {
                y: targetY,
                x: targetX,
                z: targetZ,
                duration: 0.4,
                ease: "power3.out",
              });

              timeline.to(
                paperRef.current.rotation,
                {
                  x: Math.PI,
                  y: 0,
                  z: 0,
                  duration: 0.4,
                  ease: "power3.out",
                },
                "<",
              );

              if (materialRef.current) {
                timeline.to(
                  materialRef.current,
                  {
                    bend: 0,
                    duration: 0.5,
                    ease: "power2.out",
                  },
                  "<",
                );
              }

              timeline.to(
                paperRef.current.scale,
                {
                  x: 1.1,
                  y: 1.1,
                  z: 1.1,
                  duration: 0.3,
                  ease: "sine.out",
                },
                "-=0.4",
              );
            });
          });
        },
      }));

      const handleClick = (e: import("@react-three/fiber").ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (onClick) onClick(index);
      };

      useEffect(() => {
        if (btnHovered && isSelected) {
          document.body.style.cursor = "pointer";
        } else if (hovered && !isSelected) {
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "auto";
        }
        return () => {
          document.body.style.cursor = "auto";
        };
      }, [hovered, isSelected, btnHovered]);

      useFrame((state) => {
        if (!cardRef.current) return;

        if (textRef.current && paintProgress) {
          const p = paintProgress.value;

          const expectedOpacity =
            p >= 1.0 ? 1.0 : THREE.MathUtils.clamp((p - 0.3) * 2.0, 0.0, 1.0);

          if (textRef.current.fillOpacity !== expectedOpacity) {
            const applyOpacity = (ref: {
              current:
                | (import("three").Object3D & { material?: import("three").Material })
                | null;
            }) => {
              if (ref.current) {
                ref.current.fillOpacity = expectedOpacity;
                if (ref.current.material) {
                  ref.current.material.opacity = expectedOpacity;
                  ref.current.material.transparent = true;
                }
              }
            };
            applyOpacity(textRef);
            applyOpacity(detailsTextRef1);
            applyOpacity(detailsTextRef2);
            applyOpacity(techTextRef);
            applyOpacity(openTextRef);
          }
        }

        if (textRef.current && materialRef.current) {
          const y = textRef.current.position.y;
          const uBend = materialRef.current.bend ?? 0;
          const uWindStrength = materialRef.current.windStrength || 0;
          const uTime = state.clock.getElapsedTime();

          const bendAmount = Math.pow(y, 2.0) * uBend;
          const totalWind = 0.02 + uWindStrength;
          const flutter =
            Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

          textRef.current.position.z = bendAmount + flutter + 0.02;

          const dz_dy =
            2.0 * y * uBend +
            2.0 *
              Math.cos(uTime * 2.0 + y * 2.0) *
              totalWind *
              (1.0 + Math.abs(uBend * 3.0));
          textRef.current.rotation.x = Math.atan(dz_dy);
        }

        if (buttonGroupRef.current && materialRef.current) {
          const y = buttonGroupRef.current.position.y;
          const uBend = materialRef.current.bend ?? 0;
          const uWindStrength = materialRef.current.windStrength || 0;
          const uTime = state.clock.getElapsedTime();

          const bendAmount = Math.pow(y, 2.0) * uBend;
          const totalWind = 0.02 + uWindStrength;
          const flutter =
            Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

          buttonGroupRef.current.position.z = bendAmount + flutter - 0.03;

          const dz_dy =
            2.0 * y * uBend +
            2.0 *
              Math.cos(uTime * 2.0 + y * 2.0) *
              totalWind *
              (1.0 + Math.abs(uBend * 3.0));
          buttonGroupRef.current.rotation.x = Math.PI + Math.atan(dz_dy);

          const targetScale = btnHovered ? 1.08 : 1;
          buttonGroupRef.current.scale.lerp(
            _tempScale.set(targetScale, targetScale, 1),
            0.15,
          );
        }

        if (detailsGroupRef.current && materialRef.current) {
          const y = detailsGroupRef.current.position.y;
          const uBend = materialRef.current.bend ?? 0;
          const uWindStrength = materialRef.current.windStrength || 0;
          const uTime = state.clock.getElapsedTime();

          const bendAmount = Math.pow(y, 2.0) * uBend;
          const totalWind = 0.02 + uWindStrength;
          const flutter =
            Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

          detailsGroupRef.current.position.z = bendAmount + flutter - 0.03;

          const dz_dy =
            2.0 * y * uBend +
            2.0 *
              Math.cos(uTime * 2.0 + y * 2.0) *
              totalWind *
              (1.0 + Math.abs(uBend * 3.0));
          detailsGroupRef.current.rotation.x = Math.PI + Math.atan(dz_dy);
        }

        if (techStackGroupRef.current && materialRef.current) {
          const y = techStackGroupRef.current.position.y;
          const uBend = materialRef.current.bend ?? 0;
          const uWindStrength = materialRef.current.windStrength || 0;
          const uTime = state.clock.getElapsedTime();

          const bendAmount = Math.pow(y, 2.0) * uBend;
          const totalWind = 0.02 + uWindStrength;
          const flutter =
            Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

          techStackGroupRef.current.position.z = bendAmount + flutter - 0.03;

          const dz_dy =
            2.0 * y * uBend +
            2.0 *
              Math.cos(uTime * 2.0 + y * 2.0) *
              totalWind *
              (1.0 + Math.abs(uBend * 3.0));
          techStackGroupRef.current.rotation.x = Math.PI + Math.atan(dz_dy);
        }

        if (isAnimating || isSelected) return;

        const totalWidth = PROJECT_COUNT * GAP;
        let rawX = index * GAP - currentScroll.current;
        const halfWidth = totalWidth / 2;
        let displayX =
          ((((rawX + halfWidth) % totalWidth) + totalWidth) % totalWidth) - halfWidth;

        const u = (displayX + 16) / 32;
        const safeU = THREE.MathUtils.clamp(u, 0, 1);
        const pointOnCurve = curve.getPointAt(safeU);

        cardRef.current.position.set(pointOnCurve.x, pointOnCurve.y, pointOnCurve.z);

        const time = state.clock.getElapsedTime();
        const wind = Math.sin(time * swaySpeed.current + swayOffset.current) * 0.05;

        cardRef.current.rotation.z = wind;
        cardRef.current.rotation.x = 0;

        const dist = Math.abs(displayX);
        const scale = THREE.MathUtils.clamp(1 - dist / 50, 0.7, 1);
        cardRef.current.scale.setScalar(scale);
      });

      return (
        <group
          ref={cardRef}
          onClick={handleClick}
          onPointerEnter={(e) => {
            if (isMobile || isTransitioning) return;
            e.stopPropagation();
            setHovered(true);

            if (materialRef.current && project.paintedTexture && !isSelected) {
              gsap.to(materialRef.current, {
                uProgress: 1.0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          }}
          onPointerLeave={(e) => {
            if (isMobile || isTransitioning) return;
            e.stopPropagation();
            setHovered(false);

            if (materialRef.current && project.paintedTexture && !isSelected) {
              gsap.to(materialRef.current, {
                uProgress: 0.0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          }}
        >
          <mesh position={[0, -0.08, 0.15]} rotation={[0, 0, Math.PI]}>
            <planeGeometry args={[0.3, 0.2]} />
            <meshBasicMaterial
              color="#ffffff"
              map={clothespinTexture}
              transparent={true}
              alphaTest={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          <group ref={paperRef} position={[0, -1.1, 0]}>
            <mesh>
              <planeGeometry args={[1.5, 2, 16, 16]} />
              <PaperMaterial
                ref={materialRef}
                color="#ffffff"
                map={(project.frontTexture ?? null) as import("three").Texture | null}
                mapBack={(project.backTexture ?? null) as import("three").Texture | null}
                mapPainted={
                  (project.paintedTexture ?? null) as import("three").Texture | null
                }
                side={THREE.DoubleSide}
                paintProgress={paintProgress}
                roomOrigin={roomOrigin}
              />
            </mesh>

            <group
              ref={buttonGroupRef}
              position={[0, 0.75, 0]}
              rotation={[Math.PI, 0, 0]}
            >
              <mesh>
                <planeGeometry args={[1.2, 1.2 / 3.613]} />
                <meshBasicMaterial
                  color="#ffffff"
                  map={(project.buttonTexture ?? null) as import("three").Texture | null}
                  transparent={true}
                  alphaTest={0.05}
                />
              </mesh>

              <Text
                ref={openTextRef}
                position={[0, 0, 0.01]}
                fontSize={0.11}
                color={btnHovered ? "#333333" : "#1c1c1c"}
                font="/fonts/CabinSketch-Bold.ttf"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0}
              >
                OPEN PROJECT
              </Text>

              <mesh
                position={[0, 0, 0.02]}
                onClick={(e) => {
                  if (isSelected && !isTransitioning) {
                    e.stopPropagation();
                    window.open(project.url, "_blank");
                  }
                }}
                onPointerEnter={(e) => {
                  if (isSelected && !isTransitioning) {
                    e.stopPropagation();
                    setBtnHovered(true);
                  }
                }}
                onPointerLeave={(e) => {
                  if (isSelected && !isTransitioning) {
                    e.stopPropagation();
                  }
                  setBtnHovered(false);
                }}
              >
                <planeGeometry args={[1.2, 1.2 / 3.613]} />
                <meshBasicMaterial color="#e0e0e0" transparent={true} opacity={0} />
              </mesh>
            </group>

            <group
              ref={detailsGroupRef}
              position={[0, -0.5, 0]}
              rotation={[Math.PI, 0, 0]}
            >
              <Text
                ref={detailsTextRef1}
                position={[0, 0.28, 0.01]}
                fontSize={0.1}
                color="#1c1c1c"
                font="/fonts/CabinSketch-Bold.ttf"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0}
              >
                PROJECT DETAILS:
              </Text>

              <Text
                ref={detailsTextRef2}
                position={[0, 0.2, 0.01]}
                fontSize={0.06}
                color="#333333"
                font="/fonts/CabinSketch-Bold.ttf"
                anchorX="center"
                anchorY="top"
                maxWidth={1.1}
                lineHeight={1.4}
                textAlign="center"
                fillOpacity={0}
              >
                {project.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."}
              </Text>
            </group>

            <group
              ref={techStackGroupRef}
              position={[0, 0.3, 0]}
              rotation={[Math.PI, 0, 0]}
            >
              <Text
                ref={techTextRef}
                position={[0, 0.15, 0.01]}
                fontSize={0.08}
                color="#1c1c1c"
                font="/fonts/CabinSketch-Bold.ttf"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0}
              >
                TECH STACK
              </Text>

              <group position={[0, -0.05, 0.01]}>
                {project.techStack &&
                  project.techStack.map((logoPath: string, idx: number) => {
                    const spacing = 0.3;
                    const startX = -((project.techStack.length - 1) * spacing) / 2;
                    const xPos = startX + idx * spacing;

                    return (
                      <TechStackLogo key={idx} path={logoPath} position={[xPos, 0, 0]} />
                    );
                  })}
              </group>
            </group>

            <Text
              ref={textRef}
              position={[0, 0.7, 0]}
              fontSize={0.2}
              color="#1c1c1c"
              font="/fonts/CabinSketch-Bold.ttf"
              anchorX="center"
              anchorY="middle"
              fillOpacity={0}
            >
              {project.title}
            </Text>

            <PositionalAudio
              ref={paperAudioRef}
              url="/sounds/papersound.mp3"
              distanceModel="exponential"
              rolloffFactor={GALLERY_INTERACTION_AUDIO_SETTINGS.rolloff}
              refDistance={GALLERY_INTERACTION_AUDIO_SETTINGS.distance}
              loop={false}
            />
          </group>
        </group>
      );
    },
  ),
);

interface RightSideHousesProps {
  texture: import("three").Texture;
  baseWidth: number;
  baseHeight: number;
  cropAmount: number;
}

const RightSideHouses = ({
  texture,
  baseWidth,
  baseHeight,
  cropAmount,
}: RightSideHousesProps) => {
  const croppedTexture = useMemo(() => {
    const t = texture.clone();

    t.offset.x = cropAmount;
    t.repeat.x = 1 - cropAmount;
    t.needsUpdate = true;
    return t;
  }, [texture, cropAmount]);

  const newWidth = baseWidth * (1 - cropAmount);

  const newX = 7.5 + newWidth / 2;

  return (
    <mesh position={[newX, -1, -9]} scale={[-1, 1, 1]}>
      <planeGeometry args={[newWidth, baseHeight]} />
      <meshBasicMaterial
        color="#e0e0e0"
        map={croppedTexture}
        transparent={true}
        alphaTest={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface TechStackLogoProps {
  path: string;
  position: [number, number, number];
}

const TechStackLogo = ({ path, position }: TechStackLogoProps) => {
  const texture = useTexture(path);

  return (
    <mesh position={position}>
      <planeGeometry args={[0.17, 0.17]} />
      <meshBasicMaterial
        color="#ffffff"
        map={texture as THREE.Texture}
        transparent={true}
      />
    </mesh>
  );
};

export default GalleryRoom;
