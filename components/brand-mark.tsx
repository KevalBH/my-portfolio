type BrandMarkProps = {
  size: number;
  rounded?: boolean;
};

export function BrandMark({ size, rounded = false }: BrandMarkProps) {
  const radius = rounded ? Math.round(size * 0.22) : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0c0e14",
        color: "#8da4ff",
        fontSize: Math.round(size * 0.58),
        fontWeight: 700,
        fontFamily: "Geist",
        borderRadius: radius,
      }}
    >
      K
    </div>
  );
}
