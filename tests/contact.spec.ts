import { test, expect } from "@playwright/test";

const pageUrl = "https://ohsticks-staging.vercel.app/contact";

test("has title", async ({ page }) => {
	await page.goto(pageUrl);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle("Get in Touch with OhSticks: Your One-Stop Shop for Stickers!");
});
