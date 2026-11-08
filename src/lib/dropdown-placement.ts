/** Keep a popup within the visible viewport, including an on-screen keyboard. */
export function placeDropdown(
  trigger: { top: number; bottom: number; left: number; width: number },
  viewportTop: number,
  viewportHeight: number,
  contentHeight = 256,
) {
  const gap = 8;
  const desiredHeight = Math.min(256, contentHeight);
  const aboveRoom = Math.max(0, trigger.top - viewportTop - gap * 2);
  const belowRoom = Math.max(0, viewportTop + viewportHeight - trigger.bottom - gap * 2);
  const above = belowRoom < desiredHeight && aboveRoom > belowRoom;
  const maxHeight = Math.min(desiredHeight, above ? aboveRoom : belowRoom);
  return {
    above,
    maxHeight,
    top: above ? trigger.top - gap - maxHeight : trigger.bottom + gap,
    left: trigger.left,
    width: trigger.width,
  };
}
