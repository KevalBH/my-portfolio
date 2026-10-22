import { getSiteContent } from "@/queries/site";

import {
  dustPoint,
  getStagePlates,
  orbitPose,
  paintPlate,
  placePlate,
} from "@/components/stage/plates";

describe("stage plates", () => {
  it("keeps the portfolio to short labels", () => {
    expect(getStagePlates(getSiteContent())).toEqual([
      { kicker: "Name", title: "Keval Bhatt" },
      { kicker: "Role", title: "Lead Frontend" },
      { kicker: "Years", title: "5+" },
      { kicker: "Shipped", title: "25+" },
      { kicker: "Now", title: "21Twelve" },
      { kicker: "Prior", title: "E-logicals" },
      { kicker: "Work", title: "Tablekart" },
      { kicker: "Stack", title: "React · Next" },
    ]);
  });

  it("splits plates to the left and right of center", () => {
    const left = placePlate(0, 8);
    const right = placePlate(5, 8);

    expect(left.position[0]).toBeLessThan(0);
    expect(right.position[0]).toBeGreaterThan(0);
    expect(left.rotation[1]).toBeLessThan(0);
    expect(right.rotation[1]).toBeGreaterThan(0);
    expect(left.position[1]).not.toBe(placePlate(1, 8).position[1]);
  });

  it("orbits the short labels around the seal", () => {
    const parked = orbitPose(0, 8, 4, true);
    const moving = orbitPose(0, 8, Math.PI / 2 / 0.28, false);

    expect(parked.tilt).toBe(0);
    expect(parked.position[1]).toBeGreaterThan(1);
    expect(moving.tilt).not.toBe(0);
    expect(moving.position[0]).toBeGreaterThan(1);
    expect(dustPoint(0, 16).position[0]).not.toBeCloseTo(dustPoint(1, 16).position[0]);
  });

  it("paints a kicker and a title", () => {
    const context = {
      fillRect: jest.fn(),
      fillStyle: "",
      fillText: jest.fn(),
      font: "",
      lineWidth: 0,
      strokeRect: jest.fn(),
      strokeStyle: "",
      textAlign: "left" as CanvasTextAlign,
      textBaseline: "alphabetic" as CanvasTextBaseline,
    };

    paintPlate(context as unknown as CanvasRenderingContext2D, 200, 100, {
      kicker: "Work",
      title: "Tablekart",
    });

    expect(context.fillText).toHaveBeenCalledWith("WORK", 100, 38);
    const titleCall = context.fillText.mock.calls[1];
    expect(titleCall[0]).toBe("Tablekart");
    expect(titleCall[1]).toBe(100);
    expect(titleCall[2]).toBeCloseTo(58);
    expect(context.strokeRect).toHaveBeenCalledWith(46, 46, 108, 8);
  });
});
