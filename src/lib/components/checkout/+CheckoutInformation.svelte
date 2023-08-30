<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import { getContext } from "svelte";
	import CheckoutCartList from "./+CheckoutCartList.svelte";
	import { cart } from "$lib/stores/cartStore";
	import { browser } from "$app/environment";
	import { sumArrayNumbers } from "$lib/utils/maths";
	import type { Product } from "$lib/types/product";

	let cartItemsTotal: string;
	let shipping: string = "100.00";
	let total: string;

	$: {
		if (browser) {
			cartItemsTotal = sumArrayNumbers(
				$cart.cartItems.map((item: Product) => Number(item.price) * item.quantity)
			).toFixed(2);
			total = (Number(cartItemsTotal) + Number(shipping)).toFixed(2);
		}
	}

	// Retrieve user store from context
	const user = getContext("user");
	console.log("user:", $user);

	const addPromo = () => {
		console.log("add promo");
		user.set({ name: "apples" });
	};
</script>

<div class="checkout-information">
	<CheckoutCartList />

	<p>coupon code</p>
	<p>subtotal:{cartItemsTotal}</p>
	<p>shipping:{shipping}</p>
	<p>total:{total}</p>

	<button class="submit-button" on:click={addPromo}>checkout</button>
</div>

<style lang="scss">
	.checkout-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-8;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
