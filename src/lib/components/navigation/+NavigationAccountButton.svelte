<script lang="ts">
	import PersonIcon from "$lib/components/icons/+PersonIcon.svelte";
	import { loginRoute } from "$lib/constants/routes/accountRoute";
	import LogoutIcon from "$lib/components/icons/+LogoutIcon.svelte";
	import { user, logoutUser } from "$lib/firebase/firebaseClient";
</script>

{#if $user}
	<button on:click={logoutUser}><LogoutIcon /></button>
{:else}
	<a href={loginRoute.path}><PersonIcon /></a>
{/if}
