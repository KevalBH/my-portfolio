import { compactUrl } from "@/utils/url";

describe("compactUrl", () => {
  it("drops the protocol and a trailing slash", () => {
    expect(compactUrl("https://github.com/KevalBH/")).toBe("github.com/KevalBH");
  });

  it("keeps a nested path", () => {
    expect(compactUrl("https://www.linkedin.com/in/keval-dev")).toBe(
      "www.linkedin.com/in/keval-dev",
    );
  });

  it("returns the original string when it is not a URL", () => {
    expect(compactUrl("not a url")).toBe("not a url");
  });
});
