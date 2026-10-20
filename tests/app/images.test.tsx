import { ImageResponse } from "next/og";

import OpenGraphImage, { alt, contentType, size } from "@/app/opengraph-image";
import IconRoute, { contentType as iconType, size as iconSize } from "@/app/icon";
import AppleIconRoute, {
  contentType as appleType,
  size as appleSize,
} from "@/app/apple-icon";
import TwitterImage, {
  alt as twitterAlt,
  contentType as twitterType,
  size as twitterSize,
} from "@/app/twitter-image";

jest.mock("next/og", () => ({
  ImageResponse: jest.fn((element: unknown, options: unknown) => ({ element, options })),
}));

const imageResponse = jest.mocked(ImageResponse);

function mockFetch(result: "ok" | "missing" | "offline") {
  global.fetch = jest.fn(async () => {
    if (result === "offline") {
      throw new Error("offline");
    }

    return {
      ok: result === "ok",
      arrayBuffer: async () => new ArrayBuffer(8),
    } as Response;
  });
}

describe("generated images", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    imageResponse.mockClear();
  });

  it("publishes the share image contract", () => {
    expect(contentType).toBe("image/png");
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(alt).toContain("Keval Bhatt");
    expect(iconType).toBe("image/png");
    expect(iconSize).toEqual({ width: 32, height: 32 });
    expect(appleType).toBe("image/png");
    expect(appleSize).toEqual({ width: 180, height: 180 });
    expect(twitterAlt).toBe(alt);
    expect(twitterType).toBe(contentType);
    expect(twitterSize).toEqual(size);
  });

  it("embeds loaded fonts in the icons and share card", async () => {
    mockFetch("ok");

    await IconRoute();
    await AppleIconRoute();
    await OpenGraphImage();
    await TwitterImage();

    expect(imageResponse).toHaveBeenCalledTimes(4);
    for (const call of imageResponse.mock.calls) {
      expect(call[1]).toEqual(expect.objectContaining({ fonts: expect.any(Array) }));
    }
  });

  it("still renders when a font response fails or the network is down", async () => {
    mockFetch("missing");
    await IconRoute();
    await AppleIconRoute();

    for (const call of imageResponse.mock.calls) {
      expect(call[1]).not.toHaveProperty("fonts");
    }

    imageResponse.mockClear();
    mockFetch("offline");
    await OpenGraphImage();
    await TwitterImage();

    for (const call of imageResponse.mock.calls) {
      expect(call[1]).not.toHaveProperty("fonts");
    }
  });
});
