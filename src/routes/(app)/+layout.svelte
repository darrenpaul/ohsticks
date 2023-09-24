<script lang="ts">
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import Footer from "$lib/components/footer/+Footer.svelte";
	import CartMenu from "$lib/components/cart/+CartMenu.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { fetchGuestCart, fetchUserCart } from "$lib/stores/cartStore";
	import Toaster from "$lib/components/notification/+Toaster.svelte";

	const cartState = writable(false);
	const supabaseState = writable();
	const sessionState = writable();
	const notificationState = writable([]);

	export let data;

	let supabase;
	let session;
	$: {
		supabase = data?.supabase;
		session = data?.session;
		supabaseState.set(supabase);
		sessionState.set(session);
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
			if (_session) {
				fetchUserCart();
			} else {
				fetchGuestCart();
			}
		});

		return () => subscription.unsubscribe();
	});

	if (browser) {
		setContext("cartState", cartState);
		setContext("supabaseState", supabaseState);
		setContext("sessionState", sessionState);
		setContext("notificationState", notificationState);
	}
</script>

{#if data}
	<Navigation />

	<div class="page">
		<slot />

		<Toaster />
	</div>

	{#if $cartState}
		<CartMenu />
	{/if}

	<Footer />
{/if}

<style lang="postcss">
	.page {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
