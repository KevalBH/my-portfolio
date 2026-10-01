const regularUrl =
  "https://cdn.jsdelivr.net/fontsource/fonts/geist@5.2.5/latin-400-normal.woff";
const semiboldUrl =
  "https://cdn.jsdelivr.net/fontsource/fonts/geist@5.2.5/latin-600-normal.woff";

async function readFont(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load font: ${url}`);
  return response.arrayBuffer();
}

export async function loadShareFonts() {
  try {
    const [regular, semibold] = await Promise.all([
      readFont(regularUrl),
      readFont(semiboldUrl),
    ]);

    return [
      { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    ];
  } catch {
    return undefined;
  }
}
