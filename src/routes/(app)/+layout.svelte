<script lang="ts">
	import "$lib/i18n"; // Import to initialize. Important :)
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import Footer from "$lib/components/footer/+Footer.svelte";
	import { isLoading } from "svelte-i18n";
	import CartMenu from "$lib/components/cart/+CartMenu.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	const cartState = writable(false);

	if (browser) {
		setContext("cartState", cartState);
	}
</script>

{#if $isLoading}
	Please wait...
{:else}
	<Navigation />

	<div class="page">
		<slot />
	</div>

	{#if $cartState}
		<CartMenu />
	{/if}

	<Footer />
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
