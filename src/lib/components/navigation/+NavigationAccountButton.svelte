<script lang="ts">
	import PersonIcon from "$lib/components/icons/+PersonIcon.svelte";
	import { loginRoute } from "$lib/constants/routes/accountRoute";
	import LogoutIcon from "$lib/components/icons/+LogoutIcon.svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import { clearCart } from "$lib/stores/cartStore";
	import { goto } from "$app/navigation";
	import { homeRoute } from "$lib/constants/routes/homeRoute";

	const supabaseState: Writable<any> = getContext("supabaseState");
	const sessionState: Writable<any> = getContext("sessionState");

	const handleLogout = async () => {
		await clearCart();
		await $supabaseState.auth.signOut();
		goto(homeRoute.path, { replaceState: true });
	};
</script>

{#if $sessionState}
	<button on:click={handleLogout}><LogoutIcon /></button>
{:else}
	<a href={loginRoute.path}><PersonIcon /></a>
{/if}
