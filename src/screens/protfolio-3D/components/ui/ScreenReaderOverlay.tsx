import "../../styles/ScreenReaderOverlay.scss";

import { CONTENT_DATA } from "../../config/contentData";
import { useScene } from "../../context/SceneContext";

import { AWARDS_DATA } from "../canvas/rooms/About/InfiniteSkyManager";
import { FALLBACK_PROJECTS } from "../canvas/rooms/Gallery/GalleryRoom";

const ScreenReaderOverlay = () => {
  const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();

  const projects = FALLBACK_PROJECTS;
  const studio = CONTENT_DATA;
  const awards = AWARDS_DATA;

  return (
    <div
      className="sr-overlay"
      role="complementary"
      aria-label="Accessible navigation for 3D portfolio"
    >
      <a href="#sr-main-nav" className="sr-focusable sr-only">
        Skip to accessible navigation
      </a>

      <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
        <h1>Keval Bhatt — Creative Developer Portfolio</h1>
        <h2>Portfolio Navigation</h2>

        {!hasEntered && (
          <p>
            Welcome to Keval's interactive 3D portfolio. Click or press Enter on the doors
            to enter.
          </p>
        )}

        {hasEntered && !isInRoom && (
          <>
            <p>You are in the corridor. Choose a room to explore:</p>
            <ul>
              <li>
                <button onClick={() => teleportTo("about")} type="button">
                  About — My story, skills, and journey
                </button>
              </li>
              <li>
                <button onClick={() => teleportTo("gallery")} type="button">
                  The Gallery — My projects and work
                </button>
              </li>
              <li>
                <button onClick={() => teleportTo("contact")} type="button">
                  Contact — Get in touch with me
                </button>
              </li>
              <li>
                <button onClick={() => teleportTo("studio")} type="button">
                  The Studio — Technologies and experience
                </button>
              </li>
            </ul>
          </>
        )}

        {hasEntered && isInRoom && (
          <>
            <p>
              You are in the{" "}
              {currentRoom === "about"
                ? "About"
                : currentRoom === "gallery"
                  ? "Gallery"
                  : currentRoom === "contact"
                    ? "Contact"
                    : currentRoom === "studio"
                      ? "Studio"
                      : currentRoom}{" "}
              room.
            </p>
            <button onClick={requestExit} type="button">
              Go back to corridor
            </button>

            {currentRoom === "about" && (
              <div aria-label="About room content">
                <h3>About Me</h3>
                <p>
                  This room contains my personal story, awards, journey milestones, and
                  technology skills displayed as interactive balloons.
                </p>

                {awards && (
                  <section>
                    <h4>My Awards</h4>
                    <ul>
                      {awards.featured.items.map((a: import("../../types/content").AwardItem, i: number) => (
                        <li key={`featured-${i}`}>
                          {a.label} - {a.date} {a.url && <a href={a.url}>View</a>}
                        </li>
                      ))}
                      {awards.sotd &&
                        awards.sotd.items &&
                        awards.sotd.items.map((a: import("../../types/content").AwardItem, i: number) => (
                          <li key={i}>
                            {a.label} - {a.date} {a.url && <a href={a.url}>View</a>}
                          </li>
                        ))}
                      {awards.sotm &&
                        awards.sotm.items &&
                        awards.sotm.items.map((a: import("../../types/content").AwardItem, i: number) => (
                          <li key={i}>
                            {a.label} - {a.date} {a.url && <a href={a.url}>View</a>}
                          </li>
                        ))}
                      {awards.other &&
                        awards.other.items &&
                        awards.other.items.map((a: import("../../types/content").AwardItem, i: number) => (
                          <li key={i}>
                            {a.label} - {a.date} {a.url && <a href={a.url}>View</a>}
                          </li>
                        ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
            {currentRoom === "gallery" && (
              <div aria-label="Gallery room content">
                <h3>My Projects</h3>
                <p>
                  Browse through my portfolio projects displayed on paper cards. Click on
                  a project card to see details and visit the live site.
                </p>

                {projects && projects.length > 0 && (
                  <ul>
                    {projects.map((p: import("../../types/content").GalleryProject, i: number) => (
                      <li key={i}>
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                        {p.url && <a href={p.url}>Visit {p.title}</a>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {currentRoom === "contact" && (
              <div aria-label="Contact room content">
                <h3>Contact Me</h3>
                <p>
                  Find my social media links displayed as floating barrels. Click to visit
                  my profiles on LinkedIn, GitHub, and other platforms.
                </p>
              </div>
            )}
            {currentRoom === "studio" && (
              <div aria-label="Studio room content">
                <h3>The Studio</h3>
                <p>
                  Explore my experience and skills on rotating monitors. Click a monitor
                  to read detailed information about my work.
                </p>

                {studio && studio.length > 0 && (
                  <ul>
                    {studio.map((s: import("../../types/content").StudioItem, i: number) => (
                      <li key={i}>
                        <h4>
                          {s.title} ({s.platform})
                        </h4>
                        <p>{s.description}</p>
                        {s.url && <a href={s.url}>View content</a>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <h3>Quick Navigation</h3>
            <ul>
              {currentRoom !== "about" && (
                <li>
                  <button onClick={() => teleportTo("about")} type="button">
                    Go to About
                  </button>
                </li>
              )}
              {currentRoom !== "gallery" && (
                <li>
                  <button onClick={() => teleportTo("gallery")} type="button">
                    Go to Gallery
                  </button>
                </li>
              )}
              {currentRoom !== "contact" && (
                <li>
                  <button onClick={() => teleportTo("contact")} type="button">
                    Go to Contact
                  </button>
                </li>
              )}
              {currentRoom !== "studio" && (
                <li>
                  <button onClick={() => teleportTo("studio")} type="button">
                    Go to Studio
                  </button>
                </li>
              )}
            </ul>
          </>
        )}
      </nav>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isInRoom && `Entered ${currentRoom} room`}
      </div>
    </div>
  );
};

export default ScreenReaderOverlay;
