// Records the submission demo: one guided-journey pass, <= 30 seconds,
// 1280x720, English UI, synthetic provenance stamps visible throughout.
// Output: docs/demo/floodlens-demo.webm
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";

const OUT = "docs/demo";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  recordVideo: { dir: `${OUT}/raw`, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();
page.setDefaultTimeout(30_000);
const hold = (ms) => page.waitForTimeout(ms);

await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await hold(2500); // cover

await page.getByRole("button", { name: "Explore the story" }).click();
await hold(2000); // context

await page.getByRole("button", { name: "Next", exact: true }).click();
await page.getByRole("button", { name: "Understood" }).click();
await hold(1500); // comparison, observation B
await page.getByRole("slider").focus();
await page.getByRole("slider").press("Home");
await hold(1500); // blend to observation A
await page.getByRole("slider").press("End");
await hold(1500); // back to B

await page.getByRole("button", { name: "Next", exact: true }).click();
await page.getByRole("button", { name: "Select on map" }).first().click();
await hold(3000); // evidence with selection

await page.getByRole("button", { name: "Next", exact: true }).click();
await page.getByRole("radio").nth(1).check();
await hold(2500); // learn, corrected reasoning

await page.getByRole("button", { name: "Summary", exact: true }).click();
await hold(2000); // summary

await page.getByRole("button", { name: "View sources and method" }).click();
await hold(2500); // sources and method

const video = page.video();
await context.close();
const path = await video.path();
copyFileSync(path, `${OUT}/floodlens-demo.webm`);
await browser.close();
console.log("Demo recorded:", `${OUT}/floodlens-demo.webm`);