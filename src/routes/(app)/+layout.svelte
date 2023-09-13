<script lang="ts">
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import Footer from "$lib/components/footer/+Footer.svelte";
	import CartMenu from "$lib/components/cart/+CartMenu.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	/** @type {import('./$types').PageData} */
	export let data;

	const cartState = writable(false);

	if (browser) {
		setContext("cartState", cartState);
	}
</script>

{#if data}
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
