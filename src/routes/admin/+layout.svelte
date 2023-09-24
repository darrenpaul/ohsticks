<script lang="ts">
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

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

	if (browser) {
		setContext("supabaseState", supabaseState);
		setContext("sessionState", sessionState);
	}
</script>

<div class="page">
	<Navigation />

	<ContainWidth background={"bg-white"}>
		<slot />
	</ContainWidth>
</div>

<style lang="postcss">
	.page {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
