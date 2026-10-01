import { THEME_STORAGE_KEY, LIGHT_END_HOUR, LIGHT_START_HOUR } from "@/lib/theme";

export const themeBootScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var h=new Date().getHours();var t=(s==="light"||s==="dark")?s:(h>=${LIGHT_START_HOUR}&&h<${LIGHT_END_HOUR}?"light":"dark");var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`;
