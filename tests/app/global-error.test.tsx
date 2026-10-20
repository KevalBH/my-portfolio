import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import GlobalError from "@/app/global-error";

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
  Instrument_Serif: () => ({ variable: "--font-display" }),
}));

const captureException = jest.fn();

jest.mock("@sentry/nextjs", () => ({
  captureException: (...args: unknown[]) => captureException(...args),
}));

describe("GlobalError", () => {
  beforeEach(() => {
    captureException.mockClear();
  });

  it("reports the error and offers a way back", async () => {
    const reset = jest.fn();
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    const user = userEvent.setup();

    render(<GlobalError error={error} reset={reset} />);

    expect(captureException).toHaveBeenCalledWith(error);
    expect(
      screen.getByRole("heading", { name: "Something slipped." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ref abc123")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
    expect(document.head.querySelector("script")?.textContent).toContain("kb-theme");
    expect(document.documentElement).toHaveClass(
      "--font-geist",
      "--font-geist-mono",
      "--font-display",
    );
  });

  it("omits the reference when Next does not provide a digest", () => {
    render(<GlobalError error={new Error("boom")} reset={jest.fn()} />);

    expect(screen.queryByText(/^Ref /)).not.toBeInTheDocument();
  });
});
