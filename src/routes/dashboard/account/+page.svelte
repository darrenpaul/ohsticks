<script lang="ts">
	import AccountUserInformation from "$lib/components/account/+AccountUserInformation.svelte";
	import AccountUserPassword from "$lib/components/account/+AccountUserPassword.svelte";
	import { trans } from "$lib/locales/translateCopy";

	export let data;
	let session = data.session;
	let { account } = data;

	$: ({ account } = data);
</script>

<div class="account-page">
	<h1>{trans("page.account.label")}</h1>

	<AccountUserInformation {session} {account} />

	<AccountUserPassword />
</div>

<style lang="postcss">
	.account-page {
		/* SIZE */
		@apply max-w-[500px];
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		h1 {
			@apply my-8;
		}
	}
</style>
