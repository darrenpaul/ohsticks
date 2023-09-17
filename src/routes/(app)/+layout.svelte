<script lang="ts">
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import Footer from "$lib/components/footer/+Footer.svelte";
	import CartMenu from "$lib/components/cart/+CartMenu.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});

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
