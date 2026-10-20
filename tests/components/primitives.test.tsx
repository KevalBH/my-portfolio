import { render, screen } from "@testing-library/react";

import { Chip } from "@/components/chip";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";
import { Switch } from "@/components/ui/switch";
import { LiftCard } from "@/components/lift-card";
import { BrandMark } from "@/components/brand-mark";
import { ShareCard } from "@/components/share-card";
import { PrintPlate } from "@/components/print-plate";
import { Button, buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/contact-icons";
import { HeroSystem, MonogramMark, SkillMark, WorkMark } from "@/components/graphics";
import {
  CropMarks,
  FolioGraphic,
  InkStroke,
  SealOrbit,
  StudioMark,
} from "@/components/ink";

describe("primitives", () => {
  it("renders button variants, including a slotted child", () => {
    const { rerender } = render(<Button>Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute(
      "data-slot",
      "button",
    );
    expect(buttonVariants()).toContain("bg-accent");
    expect(buttonVariants({ variant: "outline", size: "sm" })).toContain("border");
    expect(buttonVariants({ variant: "default", size: "default" })).toContain("h-11");

    rerender(
      <Button asChild className="extra" variant="outline" size="sm">
        <a href="/notes">Notes</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Notes" })).toHaveClass("extra");
  });

  it("renders the switch, chips, cards, and marks", () => {
    render(
      <>
        <Switch className="extra" aria-label="Power" />
        <Chip>Plain</Chip>
        <Chip emphasized>Named</Chip>
        <Chip bordered className="tracked">
          Edge
        </Chip>
        <Eyebrow>Index</Eyebrow>
        <LiftCard>Body</LiftCard>
        <LiftCard as="section" className="custom" aria-label="Lifted">
          Section
        </LiftCard>
        <Reveal>Shown</Reveal>
        <Reveal as="li" delay={40} className="late">
          Late
        </Reveal>
        <GithubIcon className="size-4" />
        <LinkedinIcon className="size-4" />
        <BrandMark size={32} />
        <BrandMark size={180} rounded />
        <ShareCard
          name="Keval Bhatt"
          title="Lead Frontend Developer"
          location="Bhavnagar"
        />
        <MonogramMark />
        <MonogramMark className="size-8" />
        <HeroSystem />
        <WorkMark index="01" />
        <WorkMark index="02" />
        <WorkMark index="03" />
        <WorkMark index="04" />
        <WorkMark index="05" />
        <SkillMark title="Frontend architecture & performance" />
        <SkillMark title="UI & design systems" />
        <SkillMark title="State & data management" />
        <SkillMark title="Backend & realtime" />
        <SkillMark title="AI-assisted development" />
        <SkillMark title="Cloud & DevOps" />
        <SkillMark title="Leadership & testing" />
        <CropMarks />
        <CropMarks className="inset-2" />
        <StudioMark />
        <StudioMark className="size-10" />
        <InkStroke />
        <InkStroke className="mt-1" />
        <FolioGraphic />
        <FolioGraphic className="opacity-80" />
        <SealOrbit />
        <SealOrbit className="inset-0" />
      </>,
    );

    expect(screen.getByRole("switch", { name: "Power" })).toBeInTheDocument();
    expect(screen.getByText("Keval Bhatt")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /architectural frames/ })).toHaveLength(2);
  });

  it("renders a plate from artwork or a photo", () => {
    const { rerender } = render(
      <PrintPlate alt="Drawn plate" artwork={<span>Drawing</span>} />,
    );
    expect(screen.getByRole("img", { name: "Drawn plate" })).toHaveTextContent("Drawing");
    expect(
      screen.queryByRole("img", { name: "Drawn plate" })?.querySelector("img"),
    ).toBeNull();

    rerender(
      <PrintPlate
        alt="Photo plate"
        src="/art/plate-close.jpg"
        priority
        sizes="200px"
        imageClassName="object-center"
        className="aspect-square"
      />,
    );
    expect(screen.getByRole("img", { name: "Photo plate" })).toHaveAttribute(
      "src",
      expect.stringContaining("plate-close.jpg"),
    );
  });
});
