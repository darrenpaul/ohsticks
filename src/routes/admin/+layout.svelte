<script lang="ts">
	import { browser } from "$app/environment";
	import AuthAdminCheck from "$lib/components/+AuthAdminCheck.svelte";
	import AdminNavigation from "$lib/components/navigation/+AdminNavigation.svelte";
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
<AdminNavigation />
<slot />
<!-- </AuthAdminCheck> -->
