import { render, screen } from "@testing-library/react";

import { SectionHeading } from "@/screens/home/section-heading";

describe("SectionHeading", () => {
  it("uses the hero scale when a description is present", () => {
    render(
      <SectionHeading
        level="hero"
        eyebrow="01 / Overview"
        title="A title"
        description="A longer introduction."
        descriptionClassName="max-w-lg"
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "A title" })).toBeInTheDocument();
    expect(screen.getByText("A longer introduction.")).toHaveClass("max-w-lg");
  });

  it("uses a section heading without a description", () => {
    render(<SectionHeading eyebrow="05 / Education" title="Foundations." />);

    expect(screen.getByRole("heading", { level: 2, name: "Foundations." })).toBeInTheDocument();
  });
});