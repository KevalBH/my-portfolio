import gsap from "gsap";
import type { MutableRefObject } from "react";

import { isTouchDevice } from "./deviceDetect";

const TOUCH_PAINT_HOLD = 1.15;

export const armTouchPaint = (lockUntil: MutableRefObject<number>) => {
  if (!isTouchDevice()) return;
  lockUntil.current = performance.now() + TOUCH_PAINT_HOLD * 1000;
};

export const postponeTouchHide = (
  lockUntil: MutableRefObject<number>,
  delayRef: MutableRefObject<gsap.core.Tween | null>,
  hide: () => void,
) => {
  if (!isTouchDevice()) return false;
  const wait = lockUntil.current - performance.now();
  if (wait <= 0) return false;
  if (delayRef.current) delayRef.current.kill();
  delayRef.current = gsap.delayedCall(wait / 1000, hide);
  return true;
};
