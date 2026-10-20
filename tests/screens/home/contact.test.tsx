import { render, screen } from "@testing-library/react";

import type { Profile } from "@/lib/content";

import { ContactSection } from "@/screens/home/contact";

const profile = {
  name: "Keval Bhatt",
  title: "Lead Frontend Developer",
  location: "Bhavnagar, India",
  email: "keval.bhatt.777@gmail.com",
  phone: "+91 97766-91766",
  phoneHref: "tel:+919776691766",
  linkedin: "https://www.linkedin.com/in/keval-dev/",
  github: "https://github.com/KevalBH",
  summary: "Summary",
} satisfies Profile;

describe("ContactSection", () => {
  it("lists a mailto and compact external profiles", () => {
    const { container } = render(<ContactSection profile={profile} />);

    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
    expect(screen.getByRole("link", { name: /Phone/ })).toHaveAttribute(
      "href",
      profile.phoneHref,
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      profile.linkedin,
    );
    expect(screen.getByText("www.linkedin.com/in/keval-dev")).toBeInTheDocument();
    expect(screen.getByText("github.com/KevalBH")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(document.getElementById("contact")).toBeInTheDocument();
    expect(container.querySelector("#contact ul")).toHaveClass("lg:grid-cols-3");
  });
});
