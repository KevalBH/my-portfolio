const PATH_TO_ROOM: Record<string, string | null> = {
  "/": null,
  "/about": "about",
  "/gallery": "gallery",
  "/studio": "studio",
  "/contact": "contact",
};

export function getInitialRoomFromUrl() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}
