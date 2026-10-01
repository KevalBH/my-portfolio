import { getShareSkills } from "@/queries/site";

type ShareCardProps = {
  name: string;
  title: string;
  location: string;
};

export function ShareCard({ name, title, location }: ShareCardProps) {
  const skills = getShareSkills();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#07080d",
        backgroundImage:
          "radial-gradient(820px 380px at 100% 0%, rgba(141,164,255,0.32), transparent 58%)",
        color: "#eef1f8",
        padding: "68px 76px",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            backgroundColor: "rgba(141,164,255,0.16)",
            border: "1px solid rgba(141,164,255,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8da4ff",
            fontSize: 34,
            fontWeight: 600,
          }}
        >
          K
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: 22,
            color: "#8da4ff",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
          }}
        >
          PORTFOLIO
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 36,
            lineHeight: 1.2,
            color: "#9aa3b8",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {skills.map((skill, index) => (
            <div
              key={skill}
              style={{
                display: "flex",
                marginLeft: index === 0 ? 0 : 12,
                padding: "10px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(141,164,255,0.14)",
                color: "#c9d4ff",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {skill}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", color: "#6d758a", fontSize: 22 }}>{location}</div>
      </div>
    </div>
  );
}
