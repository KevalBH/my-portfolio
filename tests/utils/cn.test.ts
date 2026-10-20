import { cn } from "@/utils/cn";

describe("cn", () => {
  it("joins class names and drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("lets a later Tailwind class win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
