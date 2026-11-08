import { describe, expect, it } from "vitest";
import { placeDropdown } from "./dropdown-placement";

describe("dropdown viewport clearance", () => {
  it("keeps the phone contact menu above its low trigger", () => {
    const trigger = { top: 680, bottom: 729, left: 48, width: 294 };
    const menu = placeDropdown(trigger, 0, 844);
    expect(menu.above).toBe(true);
    expect(menu.top).toBeGreaterThanOrEqual(8);
    expect(menu.top + menu.maxHeight).toBeLessThan(trigger.top);
    expect(menu.left + menu.width).toBeLessThanOrEqual(390);
  });

  it("opens below when there is room and preserves trigger alignment", () => {
    const menu = placeDropdown({ top: 100, bottom: 149, left: 24, width: 272 }, 0, 844);
    expect(menu.above).toBe(false);
    expect(menu.top).toBeGreaterThan(149);
    expect(menu.top + menu.maxHeight).toBeLessThan(844);
    expect(menu.left).toBe(24);
    expect(menu.width).toBe(272);
  });

  it("fits a short visible viewport while the phone keyboard is open", () => {
    const menu = placeDropdown({ top: 230, bottom: 279, left: 20, width: 280 }, 100, 240);
    expect(menu.top).toBeGreaterThanOrEqual(108);
    expect(menu.top + menu.maxHeight).toBeLessThanOrEqual(332);
    expect(menu.maxHeight).toBeGreaterThan(0);
    expect(menu.maxHeight).toBeLessThan(256);
  });

  it("keeps a short option list next to its trigger", () => {
    const menu = placeDropdown({ top: 600, bottom: 649, left: 20, width: 280 }, 0, 844, 120);
    expect(menu.above).toBe(false);
    expect(menu.maxHeight).toBe(120);
  });
});
