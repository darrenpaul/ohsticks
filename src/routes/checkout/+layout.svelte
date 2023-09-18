<script lang="ts">
	import { onMount, setContext } from "svelte";
	import { fetchGuestCart, fetchUserCart } from "$lib/stores/cartStore.js";
	import { writable } from "svelte/store";
	import { browser } from "$app/environment";

	const sessionState = writable();

	export let data;
	let session = data?.session;

	onMount(() => {
		if (session) {
			fetchUserCart();
		} else {
			fetchGuestCart();
		}
	});

	$: {
		session = data?.session;
		sessionState.set(session);
	}

	if (browser) {
		setContext("sessionState", sessionState);
	}
</script>

<div class="page">
	<slot />
</div>

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
