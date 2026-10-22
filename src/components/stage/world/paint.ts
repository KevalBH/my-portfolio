interface SketchContext {
  canvas: { height: number; width: number };
  fillStyle: string | CanvasGradient | CanvasPattern;
  font: string;
  globalAlpha: number;
  lineWidth: number;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  arc: (x: number, y: number, radius: number, start: number, end: number) => void;
  beginPath: () => void;
  fillRect: (x: number, y: number, width: number, height: number) => void;
  fillText: (text: string, x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  moveTo: (x: number, y: number) => void;
  stroke: () => void;
}

function mulberry32(seed: number) {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function traceWobble(
  ctx: SketchContext,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const rand = mulberry32(Math.round(x + y + width + height));
  ctx.beginPath();
  ctx.moveTo(x + rand() * 6, y + rand() * 4);
  ctx.lineTo(x + width - rand() * 5, y + rand() * 5);
  ctx.lineTo(x + width - rand() * 4, y + height - rand() * 4);
  ctx.lineTo(x + rand() * 5, y + height - rand() * 3);
  ctx.lineTo(x + rand() * 4, y + rand() * 3);
  ctx.stroke();
}

export function paintPaper(ctx: SketchContext, kind: "ceiling" | "floor" | "wall") {
  const { height, width } = ctx.canvas;
  const rand = mulberry32(kind === "wall" ? 4 : kind === "floor" ? 9 : 13);

  ctx.globalAlpha = 1;
  ctx.fillStyle = kind === "floor" ? "#e6dece" : "#f4efe4";
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "rgba(28, 25, 22, 0.16)";
  ctx.lineWidth = 1;

  for (let fiber = 0; fiber < 36; fiber += 1) {
    ctx.beginPath();
    ctx.moveTo(rand() * width, rand() * height);
    ctx.lineTo(rand() * width, rand() * height);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(28, 25, 22, 0.28)";
  ctx.lineWidth = 2;

  if (kind === "wall") {
    for (let x = 20; x < width; x += 46) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 6, height);
      ctx.stroke();
    }
    return;
  }

  if (kind === "floor") {
    for (let y = 18; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + 4);
      ctx.stroke();
    }
    return;
  }

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2 - 70);
  ctx.lineTo(width / 2, height / 2 + 70);
  ctx.moveTo(width / 2 - 70, height / 2);
  ctx.lineTo(width / 2 + 70, height / 2);
  ctx.stroke();
}

export function paintDoor(ctx: SketchContext, label: string, font: string) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 8;
  traceWobble(ctx, 36, 36, width - 72, height - 72);
  ctx.lineWidth = 3;
  traceWobble(ctx, 78, 78, width - 156, height - 220);
  ctx.fillStyle = "#1c1916";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `72px ${font}`;
  ctx.fillText(label, width / 2, height * 0.58);
}

export function paintNote(ctx: SketchContext, word: string, font: string) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#1c1916";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `54px ${font}`;
  ctx.fillText(word, width / 2, height / 2);
}

export function paintPlane(ctx: SketchContext) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(width * 0.12, height * 0.62);
  ctx.lineTo(width * 0.78, height * 0.22);
  ctx.lineTo(width * 0.58, height * 0.78);
  ctx.lineTo(width * 0.42, height * 0.48);
  ctx.stroke();
}

export function paintSign(ctx: SketchContext, name: string, title: string, font: string) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 8;
  traceWobble(ctx, 16, 16, width - 32, height - 32);
  ctx.fillStyle = "#1c1916";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `68px ${font}`;
  ctx.fillText(name.slice(0, 16), width / 2, height * 0.4);
  ctx.font = `36px ${font}`;
  ctx.fillText(title.slice(0, 28), width / 2, height * 0.68);
}

export function paintCloud(ctx: SketchContext) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(width * 0.32, height * 0.58, height * 0.22, 0, Math.PI * 2);
  ctx.arc(width * 0.52, height * 0.46, height * 0.28, 0, Math.PI * 2);
  ctx.arc(width * 0.7, height * 0.6, height * 0.2, 0, Math.PI * 2);
  ctx.stroke();
}

export function paintHouse(ctx: SketchContext) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(width * 0.18, height * 0.48);
  ctx.lineTo(width * 0.5, height * 0.16);
  ctx.lineTo(width * 0.82, height * 0.48);
  ctx.stroke();
  traceWobble(ctx, width * 0.28, height * 0.48, width * 0.44, height * 0.36);
}

export function paintMonitor(ctx: SketchContext) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#1c1916";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#f4efe4";
  ctx.fillRect(width * 0.12, height * 0.1, width * 0.76, height * 0.62);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.84);
  ctx.lineTo(width * 0.8, height * 0.84);
  ctx.moveTo(width * 0.5, height * 0.72);
  ctx.lineTo(width * 0.5, height * 0.84);
  ctx.stroke();
}

export function paintPlank(ctx: SketchContext) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#e4d8c4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(12, height * 0.35);
  ctx.lineTo(width - 12, height * 0.3);
  ctx.moveTo(12, height * 0.7);
  ctx.lineTo(width - 12, height * 0.66);
  ctx.stroke();
}

export function paintCard(ctx: SketchContext, title: string, note: string, font: string) {
  const { height, width } = ctx.canvas;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#fbf7ef";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#1c1916";
  ctx.lineWidth = 7;
  traceWobble(ctx, 18, 18, width - 36, height - 36);
  ctx.fillStyle = "#1c1916";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `58px ${font}`;
  ctx.fillText(title.slice(0, 18), width / 2, height * 0.42);
  ctx.font = `34px ${font}`;
  ctx.fillText(note.slice(0, 28), width / 2, height * 0.66);
}
