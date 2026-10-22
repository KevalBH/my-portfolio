import { loadShareFonts } from "@/lib/og-font";

describe("loadShareFonts", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("returns both Geist weights", async () => {
    global.fetch = jest.fn(
      async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(4) }) as Response,
    );

    const fonts = await loadShareFonts();

    expect(fonts).toEqual([
      expect.objectContaining({ name: "Geist", weight: 400 }),
      expect.objectContaining({ name: "Geist", weight: 600 }),
    ]);
  });

  it("returns undefined when the font file is missing", async () => {
    global.fetch = jest.fn(
      async () =>
        ({ ok: false, arrayBuffer: async () => new ArrayBuffer(0) }) as Response,
    );

    await expect(loadShareFonts()).resolves.toBeUndefined();
  });

  it("returns undefined when the request fails", async () => {
    global.fetch = jest.fn(async () => {
      throw new Error("offline");
    });

    await expect(loadShareFonts()).resolves.toBeUndefined();
  });
});
