import { getSiteContent } from "@/queries/site";

import {
  arrangement,
  cardsFor,
  corridorEnd,
  corridorStart,
  doorById,
  isControl,
  nearestDoor,
  openSketchLink,
  sketchQuality,
  walkBy,
} from "@/components/stage/world/layout";

describe("sketch corridor layout", () => {
  const originalOpen = window.open;
  const originalWidth = window.innerWidth;
  const navState = {
    cores: Object.getOwnPropertyDescriptor(navigator, "hardwareConcurrency"),
    memory: Object.getOwnPropertyDescriptor(navigator, "deviceMemory"),
  };

  afterEach(() => {
    window.open = originalOpen;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalWidth,
    });

    if (navState.cores) {
      Object.defineProperty(navigator, "hardwareConcurrency", navState.cores);
    } else Reflect.deleteProperty(navigator, "hardwareConcurrency");

    if (navState.memory) {
      Object.defineProperty(navigator, "deviceMemory", navState.memory);
    } else Reflect.deleteProperty(navigator, "deviceMemory");
  });

  function setDevice(
    cores: number | undefined,
    memory: number | undefined,
    width: number,
  ) {
    Object.defineProperty(navigator, "hardwareConcurrency", {
      configurable: true,
      value: cores,
    });
    Object.defineProperty(navigator, "deviceMemory", {
      configurable: true,
      value: memory,
    });
    Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  }

  it("keeps the walk inside the corridor", () => {
    expect(walkBy(corridorStart, -80)).toBe(corridorStart);
    expect(walkBy(corridorEnd, 80)).toBe(corridorEnd);
    expect(walkBy(0, 0)).toBe(0);
  });

  it("finds the nearest door only when it is in reach", () => {
    expect(nearestDoor(-4)?.id).toBe("work");
    expect(nearestDoor(corridorStart)).toBeNull();
    expect(nearestDoor(-4, 0)).toBeNull();
    expect(nearestDoor(-9, 6)?.id).toBe("work");
    expect(doorById("studio").label).toBe("Studio");
  });

  it("hangs work and stacks the other rooms", () => {
    const door = doorById("work");

    expect(arrangement("work", 0, 4, door).string).toBe(true);
    expect(arrangement("work", 1, 4, door).position[1]).not.toBe(
      arrangement("work", 0, 4, door).position[1],
    );
    expect(arrangement("studio", 0, 4, doorById("studio")).string).toBe(false);
    expect(arrangement("about", 1, 3, doorById("about")).string).toBe(false);
    expect(arrangement("contact", 2, 4, doorById("contact")).position[1]).toBe(0.86);
  });

  it("turns the resume into room cards", () => {
    const content = getSiteContent();

    expect(cardsFor("work", content)[0]).toMatchObject({
      href: "https://cv-byt.vercel.app/",
      title: "Tablekart",
    });
    expect(cardsFor("studio", content)[0].title).toBe("Lead Frontend Developer");
    expect(cardsFor("about", content).some((card) => card.href)).toBe(true);
    expect(cardsFor("about", content).some((card) => !card.href)).toBe(true);
    expect(cardsFor("contact", content).map((card) => card.title)).toEqual([
      "Email",
      "Phone",
      "LinkedIn",
      "GitHub",
    ]);
  });

  it("ignores empty links and opens the rest in a new tab", () => {
    window.open = jest.fn();

    openSketchLink();
    openSketchLink("");
    openSketchLink("https://github.com/KevalBH");

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      "https://github.com/KevalBH",
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("treats buttons and links as controls", () => {
    expect(isControl(null)).toBe(false);
    expect(isControl(document.createElement("div"))).toBe(false);
    expect(isControl(document.createElement("button"))).toBe(true);
    expect(isControl(document.createElement("a"))).toBe(true);
  });

  it("drops quality on small or weak devices", () => {
    setDevice(undefined, undefined, 1200);
    expect(sketchQuality()).toEqual({ antialias: true, dpr: 1.5 });

    setDevice(2, 16, 1200);
    expect(sketchQuality()).toEqual({ antialias: false, dpr: 1 });

    setDevice(8, 2, 1200);
    expect(sketchQuality()).toEqual({ antialias: false, dpr: 1 });

    setDevice(8, 8, 400);
    expect(sketchQuality()).toEqual({ antialias: false, dpr: 1 });

    setDevice(8, 8, 1200);
    expect(sketchQuality()).toEqual({ antialias: true, dpr: 1.5 });
  });
});
