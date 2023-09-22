<script lang="ts">
	import PersonIcon from "$lib/components/icons/+PersonIcon.svelte";
	import { loginRoute } from "$lib/constants/routes/accountRoute";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import NavigationAccountDropdownMenu from "$lib/components/navigation/+NavigationAccountDropdownMenu.svelte";

	const sessionState: Writable<any> = getContext("sessionState");

	let showAccountMenu = false;

	const toggleAccountMenu = async () => {
		showAccountMenu = !showAccountMenu;
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
		// use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
		showAccountMenu = false;
	};
</script>

<div class="navigation-account-button" on:focusout={handleDropdownFocusLoss}>
	{#if $sessionState}
		<button on:click={toggleAccountMenu} aria-label="Logout of account"><PersonIcon /></button>
		{#if showAccountMenu}
			<NavigationAccountDropdownMenu />
		{/if}
	{:else}
		<a href={loginRoute.path} aria-label="Login"><PersonIcon /></a>
	{/if}
</div>

<style lang="postcss">
	.navigation-account-button {
		/* SIZE */
		@apply h-6;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
