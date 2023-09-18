<script lang="ts">
	import AuthCheck from "$lib/components/+AuthCheck.svelte";
	import NavigationAccount from "$lib/components/navigation/+NavigationAccount.svelte";

	import { browser } from "$app/environment";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { fetchGuestCart, fetchUserCart } from "$lib/stores/cartStore.js";

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
		setContext("supabaseState", supabaseState);
		setContext("sessionState", sessionState);
	}
</script>

<!-- <AuthCheck> -->
<NavigationAccount />

<slot />
<!-- </AuthCheck> -->
