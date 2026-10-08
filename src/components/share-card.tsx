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
        backgroundColor: "#14110e",
        backgroundImage:
          "radial-gradient(820px 380px at 100% 0%, rgba(231,160,106,0.28), transparent 58%)",
        color: "#f6f0e6",
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
            backgroundColor: "rgba(231,160,106,0.16)",
            border: "1px solid rgba(231,160,106,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e7a06a",
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
            color: "#e7a06a",
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
            color: "#c9bbaa",
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
                backgroundColor: "rgba(231,160,106,0.16)",
                color: "#f0d2b4",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {skill}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", color: "#8f8478", fontSize: 22 }}>{location}</div>
      </div>
    </div>
  );
}
