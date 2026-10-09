function Paper({ id }: { id: string }) {
  return (
    <>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.72  0 0 0 0 0.58  0 0 0 0 0.42  0 0 0 0.18 0"
          />
        </filter>
      </defs>
      <rect width="1600" height="900" fill="#f3eee4" />
      <rect width="1600" height="900" filter={`url(#${id})`} />
    </>
  );
}

export function MeetingPlate() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="plate-image h-full w-full"
    >
      <Paper id="paper-stage" />
      <circle cx="980" cy="400" r="228" fill="none" stroke="#a35c40" strokeWidth="3" />
      <circle cx="980" cy="400" r="148" fill="none" stroke="#c4a48a" strokeWidth="1.5" />
      <circle cx="900" cy="330" r="18" fill="#b85c38" />
      <circle cx="1092" cy="448" r="28" fill="#9a4a2e" />
      <circle cx="940" cy="510" r="11" fill="#c4623a" />
      <rect x="860" y="672" width="240" height="26" rx="2" fill="#b85c38" />
    </svg>
  );
}

export function TablekartPlate() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="plate-image h-full w-full"
    >
      <Paper id="paper-tablekart" />
      <circle cx="860" cy="430" r="168" fill="none" stroke="#a35c40" strokeWidth="3" />
      <circle cx="860" cy="430" r="46" fill="#c4623a" opacity="0.35" />
      <circle cx="860" cy="236" r="10" fill="#b85c38" />
      <circle cx="1054" cy="430" r="10" fill="#b85c38" />
      <circle cx="860" cy="624" r="10" fill="#b85c38" />
      <circle cx="666" cy="430" r="10" fill="#b85c38" />
      <path d="M1188 248l18 46 46 18-46 18-18 46-18-46-46-18 46-18z" fill="#9a4a2e" />
      <rect x="740" y="700" width="240" height="22" rx="2" fill="#b85c38" />
    </svg>
  );
}
