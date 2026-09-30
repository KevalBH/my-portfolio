import type { Profile } from "@/lib/content";

type HomeFooterProps = {
  name: Profile["name"];
};

export function HomeFooter({ name }: HomeFooterProps) {
  return (
    <footer className="border-line text-faint mt-16 border-t pt-6 text-[11px] sm:mt-20">
      © {new Date().getFullYear()} {name}. Built with Next.js.
    </footer>
  );
}
