import { fireEvent, render, screen } from "@testing-library/react";

import { ViewToggle } from "@/components/stage/view-toggle";

describe("view toggle", () => {
  afterEach(() => {
    document.body.style.overflow = "";
    document.getElementById("site-page")?.remove();
  });

  it("opens a corridor notice on load and keeps the page in place", () => {
    render(<ViewToggle />);

    expect(screen.getByRole("dialog", { name: "View in 3D" })).toBeInTheDocument();
    expect(screen.getByText("Scroll to walk the corridor.")).toBeInTheDocument();
    expect(screen.queryByTitle("Explore in 3D")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("opens the hand-drawn 3D corridor and closes it", () => {
    const page = document.createElement("div");
    page.id = "site-page";
    document.body.append(page);
    render(<ViewToggle />);

    fireEvent.click(screen.getByRole("button", { name: "View in 3D" }));

    expect(screen.getByTitle("Explore in 3D")).toHaveAttribute("src", "/explore-3d");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    expect(page).toHaveAttribute("inert", "");
    expect(page).toHaveAttribute("aria-hidden", "true");

    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByTitle("Explore in 3D")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTitle("Explore in 3D")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(page).not.toHaveAttribute("inert");
    expect(page).not.toHaveAttribute("aria-hidden");
  });

  it("still opens when the page frame is missing", () => {
    render(<ViewToggle />);

    fireEvent.click(screen.getByRole("button", { name: "View in 3D" }));

    expect(screen.getByTitle("Explore in 3D")).toHaveAttribute("src", "/explore-3d");
    fireEvent.click(screen.getByRole("button", { name: "Back to page" }));
    expect(screen.queryByTitle("Explore in 3D")).not.toBeInTheDocument();
  });

  it("dismisses the notice and lets it be opened again", () => {
    render(<ViewToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Stay on the page" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");

    fireEvent.click(screen.getByRole("button", { name: "View in 3D" }));
    expect(screen.getByRole("dialog", { name: "View in 3D" })).toBeInTheDocument();
  });
});
