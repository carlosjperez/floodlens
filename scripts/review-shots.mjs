// Batched review captures for the impeccable finish round.
// Walks the full guided journey on desktop and mobile and saves one
// screenshot per chapter into .impeccable/review/. Reduced motion is
// emulated so camera transitions never blur a capture.
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const OUT = ".impeccable/review";
const BASE = "http://localhost:4173/";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });

async function capture(label, viewport, isMobile) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile,
    hasTouch: isMobile,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60_000);
  const shot = (name) => page.screenshot({ path: `${OUT}/${label}-${name}.png` });
  const settle = (ms = 1500) => page.waitForTimeout(ms);

  await page.goto(BASE, { waitUntil: "networkidle" });
  await shot("cover");

  await page.getByRole("button", { name: "Explore the story" }).click();
  await settle();
  await shot("context");

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Understood" }).click();
  await page.getByRole("button", { name: /Observation A/ }).click();
  await settle();
  await shot("comparison");

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Select on map" }).first().click();
  await settle();
  await shot("evidence");

  await page.getByRole("button", { name: "Next", exact: true }).click();
  for (let i = 0; i < 3; i++) {
    await page.getByRole("radio").nth(1).check();
    await settle(400);
    if (i === 0) await shot("learn");
    await page
      .getByRole("button", { name: i < 2 ? "Next exercise" : "Go to summary" })
      .click();
  }
  await settle(600);
  await shot("summary");

  await page.getByRole("button", { name: "View sources and method" }).click();
  await settle();
  await shot("sources");

  await context.close();
}

await capture("desktop", { width: 1440, height: 900 }, false);
await capture("mobile", { width: 390, height: 844 }, true);
copyFileSync(`${OUT}/desktop-comparison.png`, `${OUT}/desktop.png`);
copyFileSync(`${OUT}/mobile-comparison.png`, `${OUT}/mobile.png`);
await browser.close();
console.log("Review captures written to", OUT);