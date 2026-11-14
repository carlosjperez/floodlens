import { expect, test } from "@playwright/test";

async function enter(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore the story" }).click();
}

test("free mode, layer chips and blend control", async ({ page }) => {
  await enter(page);
  await page.getByRole("button", { name: "Guided mode" }).click();
  await expect(page.getByRole("button", { name: "Free mode" })).toBeVisible();

  await page.getByRole("button", { name: "Evidence", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Evidence" })).toBeVisible();
  const chip = page.getByRole("button", { name: /Reference water/ });
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await chip.click();
  await expect(chip).toHaveAttribute("aria-pressed", "false");
  await chip.click();
  await expect(chip).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Comparison", exact: true }).click();
  await page.getByRole("button", { name: "Understood" }).click();
  await page.getByRole("button", { name: /Observation A/ }).click();
  await expect(page.getByText(/blend 0%/)).toBeVisible();
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("End");
  await expect(page.getByText(/blend 100%/)).toBeVisible();
  await slider.press("Home");
  await expect(page.getByText(/blend 0%/)).toBeVisible();
});

test("wrong answers are corrected with explanations", async ({ page }) => {
  await enter(page);
  await page.getByRole("button", { name: "Learn", exact: true }).click();
  await expect(page.getByText("Exercise 1 of 3")).toBeVisible();
  await page.getByRole("radio").nth(0).check();
  await expect(page.getByText("Not supported by the evidence.")).toBeVisible();
  await expect(page.getByText("Why the others are not supported:")).toBeVisible();
  await page.getByRole("radio").nth(1).check();
  await expect(page.getByText("Supported by the evidence.", { exact: true })).toBeVisible();
});

test("restart returns to the cover and clears answers", async ({ page }) => {
  await enter(page);
  await page.getByRole("button", { name: "Learn", exact: true }).click();
  await page.getByRole("radio").nth(1).check();
  await page.getByRole("button", { name: "Summary", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Learning summary" })).toBeVisible();
  await page.getByRole("button", { name: "Restart journey" }).click();
  await expect(page.getByRole("button", { name: "Explore the story" })).toBeVisible();
  await page.getByRole("button", { name: "Explore the story" }).click();
  await page.getByRole("button", { name: "Learn", exact: true }).click();
  await expect(page.getByRole("radio").nth(1)).not.toBeChecked();
});

test("sources screen cites NASA resources with safe external links", async ({ page }) => {
  await enter(page);
  await page.getByRole("button", { name: "Sources and method" }).click();
  const sar = page.getByRole("link", { name: /Intro to Synthetic Aperture Radar/ });
  await expect(sar).toHaveAttribute("href", /earthdata\.nasa\.gov/);
  await expect(sar).toHaveAttribute("target", "_blank");
  await expect(sar).toHaveAttribute("rel", /noopener/);
  const nisar = page.getByRole("link", { name: /NISAR Data User Guide/ });
  await expect(nisar).toHaveAttribute("href", /nisar-docs\.asf\.alaska\.edu/);
  await expect(page.getByText("Synthetic demonstration data").first()).toBeVisible();
});

test("WebGL failure falls back to the text alternative without breaking the journey", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
      if (String(type).includes("webgl")) return null;
      return orig.call(this, type, ...rest);
    } as typeof orig;
  });
  await enter(page);
  await expect(
    page.getByText("The 3D viewer is not available on this device."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Understood" }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Evidence" })).toBeVisible();
  await page.getByRole("button", { name: "Select on map" }).first().click();
  await expect(page.getByRole("button", { name: "Clear selection" }).first()).toBeVisible();
});