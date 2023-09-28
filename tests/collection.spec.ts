import { test, expect } from "@playwright/test";

const pageUrl = "https://ohsticks-staging.vercel.app/collection/all";

test("has title", async ({ page }) => {
	await page.goto(pageUrl);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle("Get Stuck on OhSticks: Our Awesome Sticker Collection!");
});
