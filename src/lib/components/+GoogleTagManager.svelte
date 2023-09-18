<script lang="ts">
	import { userPreference, setUserPreference } from "$lib/stores/userPreferenceStore";
	import { trans } from "$lib/locales/translateCopy";
	import { page } from "$app/stores";
	import { PUBLIC_FIREBASE_MEASUREMENT_ID } from "$env/static/public";
	import ToggleInput from "$lib/components/elements/+ToggleInput.svelte";

	let adStorageConsentChecked = false;
	let analyticsStorageChecked = false;

	if (typeof gtag !== "undefined") {
		gtag("config", PUBLIC_FIREBASE_MEASUREMENT_ID, {
			page_title: document.title,
			page_path: $page.url.pathname
		});
	}

	const onAcceptAll = () => {
		const adStorageConsent = "granted";
		const analyticsStorageConsent = "granted";
		saveGdpr(adStorageConsent, analyticsStorageConsent);
	};

	const onAcceptSelection = () => {
		const adStorageConsent = adStorageConsentChecked ? "granted" : "denied";
		const analyticsStorageConsent = analyticsStorageChecked ? "granted" : "denied";

		saveGdpr(adStorageConsent, analyticsStorageConsent);
	};

	const saveGdpr = (adStorageConsent: string, analyticsStorageConsent: string) => {
		setUserPreference(adStorageConsent, analyticsStorageConsent);

		gtag("consent", "update", {
			ad_storage: adStorageConsent,
			analytics_storage: analyticsStorageConsent
		});
	};
</script>

<svelte:head>
	<script>
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != "dataLayer" ? "&l=" + l : "";
			j.async = true;
			j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, "script", "dataLayer", "GTM-N7QQ97Z8");
	</script>

	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("consent", "default", {
			ad_storage: "denied",
			analytics_storage: "denied"
		});
		gtag("js", new Date());
		gtag("config", "G-3H7DHGYGER");
	</script>
</svelte:head>

<!-- Google Tag Manager (noscript) -->
<noscript>
	<iframe
		title="Google Tag Manager"
		src="https://www.googletagmanager.com/ns.html?id=GTM-N7QQ97Z8"
		height="0"
		width="0"
		style="display: none; visibility: hidden"
	>
	</iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

{#if $userPreference.adStorageConsent === "denied" || $userPreference.analyticsStorageConsent === "denied"}
	<div class="accept-gdpr">
		<div class="--toggles">
			<ToggleInput
				text={trans("component.googleTagManager.allowAdStorage.label")}
				bind:checked={adStorageConsentChecked}
			/>

			<ToggleInput
				text={trans("component.googleTagManager.allowAnalyticsStorage.label")}
				bind:checked={analyticsStorageChecked}
			/>
		</div>

		<div class="--buttons">
			<button class="submit-button" on:click={onAcceptSelection} aria-label="Accept GDPR Selection">
				{trans("component.googleTagManager.acceptSelection.label")}
			</button>

			<button class="submit-button --button" on:click={onAcceptAll} aria-label="Accept All GDPR">
				{trans("component.googleTagManager.acceptAll.label")}
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.accept-gdpr {
		/* SIZE */
		@apply w-screen h-fit;
		/* MARGINS AND PADDING */
		@apply p-4 sm:p-16;
		/* LAYOUT */
		@apply fixed left-0 bottom-0 z-gdpr-consent flex flex-col md:flex-row items-center justify-center gap-8;
		/* BORDERS */
		/* COLORS */
		@apply bg-black;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--toggles {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--buttons {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--button {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply bg-white text-black;
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
