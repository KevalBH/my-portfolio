import { render, screen } from "@testing-library/react";

import { ExternalLink } from "@/components/external-link";

describe("ExternalLink", () => {
  it("opens in a new tab and announces that to assistive tech", () => {
    render(<ExternalLink href="https://github.com/KevalBH">GitHub</ExternalLink>);

    const link = screen.getByRole("link", { name: "GitHub Opens in a new tab." });
    expect(link).toHaveAttribute("href", "https://github.com/KevalBH");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
