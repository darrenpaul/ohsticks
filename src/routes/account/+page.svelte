<script lang="ts">
	import AccountUpdateShippingInformation from "$lib/components/account/+AccountUpdateShippingInformation.svelte";
	import AccountUpdateUserPassword from "$lib/components/account/+AccountUpdateUserPassword.svelte";
</script>

<div class="account-page">
	<h1>Account</h1>

	<AccountUpdateShippingInformation />

	<AccountUpdateUserPassword />
</div>

<p>Delete account</p>

<style lang="scss">
	.account-page {
		/* SIZE */
		@apply w-[500px];
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
