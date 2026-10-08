import type { Profile } from "@/lib/content";

type HomeFooterProps = {
  name: Profile["name"];
};

export function HomeFooter({ name }: HomeFooterProps) {
  return (
    <footer className="border-line text-faint mt-16 flex items-baseline justify-between gap-4 border-t pt-6 font-mono text-[11px] tracking-[0.08em] sm:mt-20">
      © {new Date().getFullYear()} {name}. Built with Next.js.
    </footer>
  );
}
