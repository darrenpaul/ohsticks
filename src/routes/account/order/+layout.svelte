<script lang="ts">
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import Footer from "$lib/components/footer/+Footer.svelte";
	import { user } from "$lib/firebase/firebaseClient";
	import "$lib/i18n"; // Import to initialize. Important :)
	import { locale, waitLocale, isLoading } from "svelte-i18n";

	export const load = async () => {
		if (browser) {
			locale.set(window.navigator.language);
		}
		await waitLocale();
	};

	$user;
</script>

{#if $isLoading}
	Please wait...
{:else}
	<div class="page">
		<slot />
	</div>
{/if}

<style lang="scss">
	.page {
		/* SIZE */
		@apply min-h-[100dvh];
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
