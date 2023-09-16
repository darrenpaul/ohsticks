import { browser } from "$app/environment";
import type { UserPreference } from "$lib/types/userPreference";
import { writable } from "svelte/store";

export const userPreference = writable({} as UserPreference);

export const setUserPreference = async (
	adStorageConsent: string,
	analyticsStorageConsent: string
) => {
	localStorage.setItem("ad_storage", adStorageConsent);
	localStorage.setItem("analytics_storage", analyticsStorageConsent);

	userPreference.set({
		adStorageConsent,
		analyticsStorageConsent
	});
};

export const getUserPreference = async () => {
	const adStorageConsent = localStorage?.getItem("ad_storage") || "denied";

	const analyticsStorageConsent = localStorage?.getItem("analytics_storage") || "denied";

	userPreference.set({
		adStorageConsent,
		analyticsStorageConsent
	});
};

if (browser) {
	getUserPreference();
}
