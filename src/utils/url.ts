export function compactUrl(href: string) {
  try {
    const url = new URL(href);
    return `${url.host}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return href;
  }
}
