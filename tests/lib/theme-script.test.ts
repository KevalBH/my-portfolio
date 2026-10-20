import { themeBootScript } from "@/lib/theme-script";
import { LIGHT_END_HOUR, LIGHT_START_HOUR, THEME_STORAGE_KEY } from "@/lib/theme";

describe("themeBootScript", () => {
  it("applies the same storage key and daylight window as the theme module", () => {
    expect(themeBootScript.startsWith("(function(){")).toBe(true);
    expect(themeBootScript).toContain(JSON.stringify(THEME_STORAGE_KEY));
    expect(themeBootScript).toContain(`h>=${LIGHT_START_HOUR}`);
    expect(themeBootScript).toContain(`h<${LIGHT_END_HOUR}`);
    expect(themeBootScript).toContain('r.classList.toggle("dark",t==="dark")');
  });
});
