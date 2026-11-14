import { expect, test } from "@playwright/test";

async function completeJourney(page: import("@playwright/test").Page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "FloodLens" })).toBeVisible();
  await expect(page.getByText("Educational experience. Not an alert system.")).toBeVisible();
  await page.getByRole("button", { name: "Explore the story" }).click();
  await expect(page.getByRole("heading", { name: "Territorial context" })).toBeVisible();
  await page.getByRole("button", { name: /Next/ }).click();
  await expect(page.getByRole("heading", { name: "Date comparison" })).toBeVisible();
  await expect(
    page.getByText("It does not represent the advance of water between the two dates."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Understood" }).click();
  await page.getByRole("button", { name: /Observation A/ }).click();
  await page.getByRole("button", { name: /Next/ }).click();
  await expect(page.getByRole("heading", { name: "Evidence" })).toBeVisible();
  // Evidence selection never depends on 3D: it is exercised from the card.
  await page.getByRole("button", { name: "Select on map" }).first().click();
  await expect(page.getByRole("button", { name: "Clear selection" }).first()).toBeVisible();
  await page.getByRole("button", { name: /Next/ }).click();
  await expect(page.getByRole("heading", { name: "Learn" })).toBeVisible();

  const answers = [
    "No: absence of observation or detection is not absence of danger.",
    "No: exposure is not confirmed damage.",
    "No: an observation is a snapshot, not a film.",
  ];
  for (let i = 0; i < answers.length; i++) {
    await page.getByRole("radio", { name: answers[i] }).check();
    await expect(page.getByText("Supported by the evidence.")).toBeVisible();
    await expect(page.getByText("Why the others are not supported:")).toBeVisible();
    if (i < answers.length - 1) {
      await page.getByRole("button", { name: /Next exercise/ }).click();
    }
  }
  await page.getByRole("button", { name: /Go to summary/ }).click();
  await expect(page.getByRole("heading", { name: "Learning summary" })).toBeVisible();
  await expect(page.getByText("No personal risk score.")).toBeVisible();
  await page.getByRole("button", { name: "View sources and method" }).click();
  await expect(page.getByRole("heading", { name: "Sources and method" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Intro to Synthetic Aperture Radar/ })).toBeVisible();
  await expect(page.getByText("Synthetic demonstration data").first()).toBeVisible();
}

test("full guided journey on desktop", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await completeJourney(page);
  expect(errors).toEqual([]);
});

test("full journey on mobile without horizontal overflow", async ({ page }) => {
  await completeJourney(page);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(overflow).toBe(false);
});

test("reduced motion respected and text alternative available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Explore the story" }).click();
  await expect(page.getByRole("button", { name: "Animations skipped" })).toBeVisible();
  await page.locator("summary:visible", { hasText: "Text alternative to the viewer" }).click();
  await expect(page.getByText(/Observation A/).first()).toBeVisible();
});

test("keyboard navigation with visible focus", async ({ page }) => {
  await page.goto("/");
  const btn = page.getByRole("button", { name: "Explore the story" });
  await btn.focus();
  const outline = await btn.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Territorial context" })).toBeVisible();
});