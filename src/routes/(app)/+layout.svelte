<script lang="ts">
	import { browser } from "$app/environment";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	const supabaseState = writable();
	const sessionState = writable();

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
		} = supabase.auth.onAuthStateChange((_session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});

	if (browser) {
		setContext("supabaseState", supabaseState);
		setContext("sessionState", sessionState);
	}
</script>

<div class="page">
	<slot />
</div>

<style lang="postcss">
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
