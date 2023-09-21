<script lang="ts">
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
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

<!-- <AuthAdminCheck> -->
<Navigation />
<slot />
<!-- </AuthAdminCheck> -->
