import "@testing-library/jest-dom";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

imageConfigDefault.qualities = [75, 95];

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("min-width: 768px"),
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

window.requestAnimationFrame = (callback: FrameRequestCallback) => {
  callback(0);
  return 0;
};

window.cancelAnimationFrame = () => undefined;
