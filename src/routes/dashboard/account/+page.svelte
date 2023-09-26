<script lang="ts">
	import AccountUpdateShippingInformation from "$lib/components/account/+AccountUpdateShippingInformation.svelte";
	import AccountUpdateUserPassword from "$lib/components/account/+AccountUpdateUserPassword.svelte";

	export let data;
	let session = data.session;
	let { account } = data;

	$: ({ account } = data);
</script>

<div class="account-page">
	<h1>Account</h1>

	<AccountUpdateShippingInformation {session} {account} />

	<AccountUpdateUserPassword />
</div>

<p>Delete account</p>

<style lang="scss">
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
