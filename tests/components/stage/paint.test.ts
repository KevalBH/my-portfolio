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

function mockContext(width = 512, height = 512) {
  return {
    arc: jest.fn(),
    beginPath: jest.fn(),
    canvas: { height, width },
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

describe("sketch painters", () => {
  it("draws paper for the wall, floor, and ceiling", () => {
    const wall = mockContext();
    const floor = mockContext();
    const ceiling = mockContext();

    paintPaper(wall, "wall");
    paintPaper(floor, "floor");
    paintPaper(ceiling, "ceiling");

    expect(wall.fillRect).toHaveBeenCalled();
    expect(floor.stroke).toHaveBeenCalled();
    expect(ceiling.arc).toHaveBeenCalled();
  });

  it("letters doors, notes, planes, and cards", () => {
    const door = mockContext(512, 1024);
    const note = mockContext();
    const plane = mockContext();
    const card = mockContext(640, 400);

    paintDoor(door, "Gallery", "Caveat");
    paintNote(note, "React", "Patrick Hand");
    paintPlane(plane);
    paintCard(
      card,
      "Tablekart is a very long name",
      "Hospitality · AI and more words",
      "Caveat",
    );

    expect(door.fillText).toHaveBeenCalledWith("Gallery", 256, 1024 * 0.58);
    expect(note.fillText).toHaveBeenCalledWith("React", 256, 256);
    expect(plane.stroke).toHaveBeenCalled();
    expect(card.fillText).toHaveBeenCalledWith("Tablekart is a ver", 320, 400 * 0.42);
    expect(card.font).toContain("Caveat");

    const sign = mockContext(640, 280);
    paintSign(sign, "Keval Bhatt", "Lead Frontend Developer", "Caveat");
    expect(sign.fillText).toHaveBeenCalledWith("Keval Bhatt", 320, 280 * 0.4);
  });

  it("draws clouds, houses, monitors, and planks", () => {
    const cloud = mockContext(512, 256);
    const house = mockContext();
    const monitor = mockContext();
    const plank = mockContext(512, 128);

    paintCloud(cloud);
    paintHouse(house);
    paintMonitor(monitor);
    paintPlank(plank);

    expect(cloud.arc).toHaveBeenCalled();
    expect(house.stroke).toHaveBeenCalled();
    expect(monitor.fillRect).toHaveBeenCalled();
    expect(plank.stroke).toHaveBeenCalled();
  });
});
