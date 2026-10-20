import { render, screen } from "@testing-library/react";

import { EmphasizedCopy } from "@/screens/home/emphasized-copy";

describe("EmphasizedCopy", () => {
  it("emphasizes the named skill and leaves the rest as text", () => {
    render(
      <p>
        <EmphasizedCopy text="Hands-on Agentic AI work with Cursor." />
      </p>,
    );

    expect(screen.getByText("Agentic AI").tagName).toBe("STRONG");
    expect(screen.getByText("Hands-on").tagName).toBe("SPAN");
    expect(screen.getByText("work with Cursor.").tagName).toBe("SPAN");
  });
});
