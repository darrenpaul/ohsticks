<script lang="ts">
	import AccountUpdateShippingInformation from "$lib/components/account/+AccountUpdateShippingInformation.svelte";
	import AccountUpdateUserPassword from "$lib/components/account/+AccountUpdateUserPassword.svelte";
	import AccountUpdateUserProfile from "$lib/components/account/+AccountUpdateUserProfile.svelte";
</script>

<h1>Account</h1>

<div class="account-page">
	<AccountUpdateUserProfile />

	<AccountUpdateShippingInformation />

	<AccountUpdateUserPassword />
</div>

<p>Change password</p>

<p>Delete account</p>

<style lang="scss">
	.account-page {
		/* SIZE */
		@apply w-[400px];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
