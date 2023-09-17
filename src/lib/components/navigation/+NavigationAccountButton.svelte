<script lang="ts">
	import PersonIcon from "$lib/components/icons/+PersonIcon.svelte";
	import { loginRoute } from "$lib/constants/routes/accountRoute";
	import LogoutIcon from "$lib/components/icons/+LogoutIcon.svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const supabaseState: Writable<any> = getContext("supabaseState");
	const sessionState: Writable<any> = getContext("sessionState");
</script>

{#if $sessionState}
	<button on:click={$supabaseState.auth.signOut()}><LogoutIcon /></button>
{:else}
	<a href={loginRoute.path}><PersonIcon /></a>
{/if}
