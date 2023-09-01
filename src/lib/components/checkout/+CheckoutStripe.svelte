<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import type { Cart } from "$lib/types/cart";

	export let cart: Cart;
	console.log("cart:", cart);
	const handleFormSubmit = async () => {
		// const stripeResponse = await fetch("/api/stripe/create-payment", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// });
		// const { sessionUrl } = await stripeResponse.json();
		// if (sessionUrl) {
		// 	window.location = sessionUrl;
		// }
	};
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<section>
	<form on:submit|preventDefault={handleFormSubmit}>
		<button class="checkout-button" type="submit" id="checkout-button">
			{$trans("component.cartMenu.checkout")}</button
		>
	</form>
</section>

<style lang="scss">
	.checkout-button {
		/* SIZE */
		@apply w-full h-[46px];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid place-items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		@apply bg-black text-white;
		/* ANIMATION AND EFFECTS */
	}
</style>
