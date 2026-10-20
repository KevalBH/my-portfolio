import { expect, test } from "@playwright/test";

test("shows Playwright runtime details", async ({ browserName, page }, testInfo) => {
  await page.goto("/");

  const viewport = page.viewportSize();
  const details = {
    browser: browserName,
    project: testInfo.project.name,
    title: await page.title(),
    url: page.url(),
    userAgent: await page.evaluate(() => navigator.userAgent),
    version: page.context().browser()?.version() ?? "",
    viewport: viewport ? `${viewport.width}x${viewport.height}` : "default",
  };

  Object.entries(details).forEach(([type, description]) => {
    testInfo.annotations.push({ description, type });
    console.log(`${type}: ${description}`);
  });

  expect(details.browser).toBe("chromium");
  expect(details.title).toContain("Keval Bhatt");
  expect(details.url).toBe("https://keval-bhatt-my-portfolio.vercel.app/");
  expect(details.version).toMatch(/^\d+/);
  expect(details.viewport).toBe("1280x720");
  await expect(page.getByText("Keval Bhatt").first()).toBeVisible();
});
