"use client";

import { useId, useRef, useState, useEffect } from "react";

interface Detail {
  index: string;
  label: string;
  text: string;
}

const rooms = ["About", "Gallery", "Studio", "Contact"];

const details: Detail[] = [
  {
    index: "01",
    label: "Move",
    text: "Scroll to walk the corridor.",
  },
  {
    index: "02",
    label: "Enter",
    text: "Click a door into About, Gallery, Studio, or Contact.",
  },
  {
    index: "03",
    label: "Look",
    text: "Inside a room, click, drag, and scroll.",
  },
];

export function ViewToggle() {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open && !noticeOpen) return;

    const page = document.getElementById("site-page");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (open) {
      page?.setAttribute("inert", "");
      page?.setAttribute("aria-hidden", "true");
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      page?.removeAttribute("aria-hidden");
    };
  }, [noticeOpen, open]);

  useEffect(() => {
    if (!noticeOpen || open) return;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNoticeOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [noticeOpen, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const enterCorridor = () => {
    setNoticeOpen(false);
    setOpen(true);
  };

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-40 bg-[#fafafa]">
          <iframe
            title="Explore in 3D"
            src="/explore-3d"
            className="size-full border-0"
            allow="autoplay"
          />
        </div>
      ) : null}

      {noticeOpen && !open ? (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#1c1612]/48 p-3 sm:items-center sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setNoticeOpen(false);
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className="border-line bg-bg-2 text-ink reveal relative w-full max-w-[30rem] border px-5 pt-5 pb-5 shadow-[6px_8px_0_rgba(28,25,22,0.16)] outline-none motion-reduce:[animation:none] sm:px-7 sm:pt-7 sm:pb-6"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setNoticeOpen(false)}
              className="text-faint hover:text-ink focus-visible:outline-accent absolute top-3 right-3 px-2 py-1 font-mono text-[10px] tracking-[0.18em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Close
            </button>

            <p className="text-faint font-mono text-[10px] tracking-[0.22em] uppercase">
              Corridor
            </p>
            <h2
              id={titleId}
              className="font-serif text-[2.4rem] leading-[0.9] tracking-tight sm:text-[2.8rem]"
            >
              View in 3D
            </h2>
            <p
              id={descriptionId}
              className="text-muted mt-3 max-w-[26rem] text-sm leading-6"
            >
              A hand-drawn hall through the work. Four rooms sit off one corridor.
            </p>

            <div className="border-line bg-bg relative mt-5 border px-3 py-4" aria-hidden>
              <div className="bg-line absolute top-1/2 right-4 left-4 h-px" />
              <ul className="relative grid grid-cols-4">
                {rooms.map((room, index) => (
                  <li
                    key={room}
                    className={
                      index % 2 === 0
                        ? "flex justify-center pt-7"
                        : "flex justify-center pb-7"
                    }
                  >
                    <span className="border-ink/25 bg-bg-2 text-ink border px-1.5 py-2 font-mono text-[9px] tracking-[0.14em] uppercase">
                      {room}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-5 space-y-3">
              {details.map((detail) => (
                <div key={detail.index} className="grid grid-cols-[2.4rem_1fr] gap-3">
                  <dt className="text-accent font-mono text-[10px] tracking-[0.16em]">
                    {detail.index}
                    <span className="sr-only"> {detail.label}</span>
                  </dt>
                  <dd className="text-ink text-sm leading-5">
                    <span className="font-serif text-base">{detail.label}. </span>
                    <span className="text-muted">{detail.text}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={enterCorridor}
                className="bg-accent focus-visible:outline-accent px-4 py-2.5 font-serif text-[1.25rem] leading-none text-[#1c1612] focus-visible:outline-2 focus-visible:outline-offset-3"
              >
                View in 3D
              </button>
              <button
                type="button"
                onClick={() => setNoticeOpen(false)}
                className="text-muted hover:text-ink focus-visible:outline-accent px-2 py-2 font-serif text-lg leading-none underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3"
              >
                Stay on the page
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {open ? (
        <button
          type="button"
          aria-pressed="true"
          aria-label="Back to page"
          onClick={() => setOpen(false)}
          className="fixed bottom-5 left-5 z-[60] border border-[#1c1916]/20 bg-[#f7f1e4] px-4 py-2 text-[#1c1916] shadow-[3px_4px_0_rgba(28,25,22,0.16)]"
        >
          <span className="block font-mono text-[10px] tracking-[0.22em] text-[#746c63] uppercase">
            Exit
          </span>
          <span className="font-serif text-[1.35rem] leading-none">Back to page</span>
        </button>
      ) : null}

      {!open && !noticeOpen ? (
        <button
          type="button"
          aria-label="View in 3D"
          onClick={() => setNoticeOpen(true)}
          className="border-line bg-bg-2 text-ink focus-visible:outline-accent fixed bottom-5 left-5 z-[60] border px-4 py-2 shadow-[4px_5px_0_rgba(28,25,22,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span className="text-faint block font-mono text-[10px] tracking-[0.22em] uppercase">
            Corridor
          </span>
          <span className="font-serif text-[1.15rem] leading-none">View in 3D</span>
        </button>
      ) : null}
    </>
  );
}
