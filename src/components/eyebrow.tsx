export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-accent inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase">
      <span className="hero-node bg-accent h-1.5 w-1.5 rounded-full" />
      {children}
    </p>
  );
}
