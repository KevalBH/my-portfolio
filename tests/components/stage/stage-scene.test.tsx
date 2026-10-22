import { act, fireEvent, render, screen } from "@testing-library/react";

import { StageScene } from "@/components/stage/stage-scene";

interface StageMock {
  camera: {
    lookAt: jest.Mock;
    position: { x: number; y: number; z: number };
  };
  clear: string[];
  disposedTextures: number;
  frames: Array<
    (state: {
      camera: StageMock["camera"];
      clock: { elapsedTime: number };
      pointer: { x: number; y: number };
    }) => void
  >;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

function stageMock(): StageMock {
  const holder = globalThis as typeof globalThis & { __stageMock?: StageMock };
  if (!holder.__stageMock) {
    holder.__stageMock = {
      camera: {
        lookAt: jest.fn(),
        position: { x: 0, y: 1.34, z: 8 },
      },
      clear: [],
      disposedTextures: 0,
      frames: [],
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    };
  }
  return holder.__stageMock;
}

jest.mock("next/font/google", () => ({
  Caveat: () => ({ className: "caveat", style: { fontFamily: "Caveat" } }),
  Patrick_Hand: () => ({ className: "hand", style: { fontFamily: "Patrick Hand" } }),
}));

jest.mock("three", () => ({
  CanvasTexture: class CanvasTexture {
    colorSpace = "";
    needsUpdate = false;
    repeat = { set: jest.fn() };
    wrapS = "";
    wrapT = "";

    dispose() {
      stageMock().disposedTextures += 1;
    }
  },
  DoubleSide: 2,
  RepeatWrapping: 1000,
  SRGBColorSpace: "srgb",
}));

jest.mock("@react-three/fiber", () => ({
  Canvas: ({
    children,
    onCreated,
    style,
  }: {
    children: React.ReactNode;
    onCreated?: (state: { gl: { setClearColor: (color: string) => void } }) => void;
    style?: React.CSSProperties;
  }) => {
    onCreated?.({
      gl: {
        setClearColor: (color: string) => {
          stageMock().clear.push(color);
        },
      },
    });
    return (
      <div data-testid="stage-canvas" style={style}>
        {children}
      </div>
    );
  },
  useFrame: (
    callback: (state: {
      camera: StageMock["camera"];
      clock: { elapsedTime: number };
      pointer: { x: number; y: number };
    }) => void,
  ) => {
    callback({
      camera: stageMock().camera,
      clock: { elapsedTime: 0.6 },
      pointer: { x: 0.2, y: -0.2 },
    });
    stageMock().frames.push(callback);
  },
  useThree: () => ({ camera: stageMock().camera }),
}));

function mockContext() {
  return {
    arc: jest.fn(),
    beginPath: jest.fn(),
    canvas: { height: 512, width: 512 },
    fillRect: jest.fn(),
    fillStyle: "",
    fillText: jest.fn(),
    font: "",
    globalAlpha: 1,
    lineTo: jest.fn(),
    lineWidth: 1,
    moveTo: jest.fn(),
    stroke: jest.fn(),
    strokeStyle: "",
    textAlign: "left" as CanvasTextAlign,
    textBaseline: "alphabetic" as CanvasTextBaseline,
  };
}

function play() {
  stageMock().frames.forEach((frame) =>
    frame({
      camera: stageMock().camera,
      clock: { elapsedTime: 1.2 },
      pointer: { x: 0.4, y: 0.2 },
    }),
  );
}

function spin(target: HTMLElement, deltaY: number) {
  act(() => {
    target.dispatchEvent(
      new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY }),
    );
  });
}

function point(target: Element, type: string, clientY: number) {
  act(() => {
    target.dispatchEvent(
      new MouseEvent(type, { bubbles: true, cancelable: true, clientY }),
    );
  });
}

function door(name: string) {
  const node = document.querySelector(`mesh[name="${name}"]`);
  if (!node) throw new Error(`missing ${name}`);
  return node;
}

describe("stage scene", () => {
  const originalMatchMedia = window.matchMedia;
  const originalOpen = window.open;

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    const mock = stageMock();
    mock.clear = [];
    mock.disposedTextures = 0;
    mock.frames = [];
    mock.rotation.x = 0;
    mock.rotation.y = 0;
    mock.rotation.z = 0;
    mock.position.x = 0;
    mock.position.y = 0;
    mock.position.z = 0;
    mock.camera.position.x = 0;
    mock.camera.position.y = 1.34;
    mock.camera.position.z = 8;
    mock.camera.lookAt.mockClear();
    window.open = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "rotation", {
      configurable: true,
      get: () => mock.rotation,
    });
    Object.defineProperty(HTMLElement.prototype, "position", {
      configurable: true,
      get: () => mock.position,
    });
    HTMLCanvasElement.prototype.getContext = jest.fn(() =>
      mockContext(),
    ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.matchMedia = originalMatchMedia;
    window.open = originalOpen;
    document.body.style.cursor = "";
    Reflect.deleteProperty(HTMLElement.prototype, "rotation");
    Reflect.deleteProperty(HTMLElement.prototype, "position");
  });

  it("walks the paper corridor and opens rooms", () => {
    const view = render(<StageScene />);
    const region = screen.getByRole("region", { name: "Sketch corridor" });

    expect(screen.getByTestId("stage-canvas")).toHaveStyle({ background: "#f3eee4" });
    expect(stageMock().clear).toEqual(["#f3eee4"]);
    expect(screen.getByTestId("walk-status")).toHaveTextContent("At the entrance");
    expect(screen.getByText("Click the doors")).toBeInTheDocument();
    play();

    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(screen.getByRole("button", { name: "Enter the corridor" }), {
      key: "Enter",
    });
    spin(region, 400);
    point(region, "pointermove", 10);
    expect(screen.getByTestId("walk-status")).toHaveTextContent("At the entrance");

    fireEvent.click(screen.getByRole("button", { name: "Enter the corridor" }));
    fireEvent.click(door("entrance-doors"));
    play();
    expect(screen.getByTestId("walk-status")).toHaveTextContent("Walking the corridor");
    expect(screen.getByText("Scroll to walk. Click a door.")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "ArrowDown" });
    fireEvent.keyDown(window, { key: "ArrowUp" });
    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(region, { key: "Enter" });
    fireEvent.keyDown(screen.getByRole("button", { name: "Gallery" }), { key: "Enter" });

    point(screen.getByRole("button", { name: "Studio" }), "pointerdown", 20);
    point(region, "pointermove", 20);
    point(region, "pointerdown", 40);
    point(region, "pointermove", 40);
    point(region, "pointermove", 70);
    point(region, "pointerup", 70);
    point(region, "pointerleave", 70);

    spin(region, 1000);
    expect(screen.getByTestId("walk-status")).toHaveTextContent("Near Gallery");

    fireEvent.keyDown(window, { key: "Enter" });
    play();
    expect(screen.getByRole("link", { name: /Tablekart/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();

    point(door("door-work"), "pointerover", 0);
    expect(document.body.style.cursor).toBe("pointer");
    play();
    point(door("door-work"), "pointerout", 0);
    expect(document.body.style.cursor).toBe("");
    play();

    spin(region, 500);
    expect(screen.getByTestId("walk-status")).toHaveTextContent("Near Gallery");
    point(region, "pointerdown", 12);
    point(region, "pointermove", 30);
    fireEvent.keyDown(window, { key: "Enter" });

    fireEvent.click(door("card-Tablekart"));
    expect(window.open).toHaveBeenCalledWith(
      "https://cv-byt.vercel.app/",
      "_blank",
      "noopener,noreferrer",
    );
    fireEvent.click(door("door-studio"));

    fireEvent.click(screen.getByRole("button", { name: "Back to corridor" }));
    expect(screen.getByText("Scroll to walk. Click a door.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "About" }));
    expect(screen.getByText(/MERN Stack Developer/)).toBeInTheDocument();
    expect(screen.getAllByText("Keval Bhatt").length).toBeGreaterThan(1);
    fireEvent.click(door("card-GitHub"));
    fireEvent.keyDown(window, { key: "Backspace" });

    fireEvent.click(screen.getByRole("button", { name: "Studio" }));
    fireEvent.click(screen.getByRole("button", { name: "Contact" }));
    expect(screen.getByRole("link", { name: /Email/ })).toBeInTheDocument();

    expect(stageMock().camera.lookAt).toHaveBeenCalled();
    view.unmount();
    expect(stageMock().disposedTextures).toBeGreaterThan(0);
    expect(document.body.style.cursor).toBe("");
  });

  it("holds still when motion is reduced", () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;

    const view = render(<StageScene />);
    play();

    expect(stageMock().rotation.y).toBe(0);
    expect(stageMock().position.y).toBe(2.05);
    view.unmount();
  });

  it("skips textures when the label canvas is unavailable", () => {
    HTMLCanvasElement.prototype.getContext = jest.fn(
      () => null,
    ) as unknown as typeof HTMLCanvasElement.prototype.getContext;

    const view = render(<StageScene />);
    fireEvent.keyDown(screen.getByRole("region", { name: "Sketch corridor" }), {
      key: "Enter",
    });
    fireEvent.click(screen.getByRole("button", { name: "About" }));
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(document.querySelector('mesh[name="card-GitHub"]')).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Gallery" }));
    fireEvent.click(screen.getByRole("button", { name: "Studio" }));
    fireEvent.click(screen.getByRole("button", { name: "Contact" }));
    view.unmount();

    expect(stageMock().disposedTextures).toBe(0);
  });
});
