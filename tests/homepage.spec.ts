import { test, expect } from "@playwright/test";

const pageUrl = "https://ohsticks-staging.vercel.app/";

test("has title", async ({ page }) => {
	await page.goto(pageUrl);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle("OhSticks: Stickin' it to Boring with Trendy Stickers!");
});
