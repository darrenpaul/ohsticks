<script lang="ts">
	import CrossIcon from "$lib/components/icons/+CrossIcon.svelte";
	import { _ as trans } from "svelte-i18n";
	import { cart } from "$lib/stores/cartStore";
	import { sumArrayNumbers } from "$lib/utils/maths";
	import { browser } from "$app/environment";
	import CartMenuItem from "./+CartMenuItem.svelte";
	import { getContext } from "svelte";
	import { checkoutRoute } from "$lib/constants/routes/checkoutRoute";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import type { CartItem } from "$lib/types/cart";

	const cartState = getContext("cartState");

	let totalQuantity = 0;
	let totalPrice = 0;

	$: {
		if (browser) {
			if ($cart && $cart?.cartItems) {
				totalQuantity = sumArrayNumbers($cart?.cartItems.map((item: CartItem) => item.quantity));
				totalPrice = sumArrayNumbers(
					$cart?.cartItems.map((item: CartItem) => Number(item.price) * item.quantity)
				);
			}
		}
	}

	const closeCart = () => {
		cartState.set(false);
	};
</script>

<div class="cart-menu">
	<div class="--backdrop" role="button" tabindex={1} on:click={closeCart} on:keydown={() => {}} />

	<div class="--menu">
		<div class="--header">
			<div class="--container">
				<button class="--close-button" on:click={closeCart}>
					<span><CrossIcon width={14} height={14} /></span>
				</button>
			</div>

			<div class="--center">
				<p>{$trans("component.cartMenu.yourCart")}</p>
			</div>

			<div class="--container">
				<p>{totalQuantity}</p>
			</div>
		</div>

		<div class="--list">
			{#if $cart?.cartItems}
				{#each $cart?.cartItems as cartItem (cartItem.id)}
					<CartMenuItem {cartItem} />
				{/each}
			{/if}
		</div>

		<div class="--footer">
			<div class="--total-wrapper">
				<p>{$trans("component.cartMenu.total")}</p>

				<p class="--price">
					{addCurrencySymbol(totalPrice)}
				</p>
			</div>

			<a href={checkoutRoute.path} class="--checkout-button">
				{$trans("component.cartMenu.checkout")}
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.cart-menu {
		/* SIZE */
		@apply w-screen h-[100dvh];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply fixed top-0 left-0 z-cart-menu;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--backdrop {
			/* SIZE */
			@apply w-full h-full;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			@apply bg-black bg-opacity-50;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--menu {
			/* SIZE */
			@apply w-[417px] h-[100dvh];
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply fixed top-0 right-0 flex flex-col;
			/* BORDERS */
			/* COLORS */
			@apply bg-gray-100;
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--header {
				/* SIZE */
				@apply w-full h-[46px];
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex items-center justify-between;
				/* BORDERS */
				/* COLORS */
				@apply bg-white;
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				.--container {
					/* SIZE */
					@apply w-[46px] h-full;
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply grid place-items-center;
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */

					p {
						/* SIZE */
						/* MARGINS AND PADDING */
						/* LAYOUT */
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						@apply text-sm font-bold;
						/* ANIMATION AND EFFECTS */
					}
				}

				.--center {
					/* SIZE */
					@apply w-full h-full;
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply grid place-items-center;
					/* BORDERS */
					@apply border-x border-gray-100;
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}

			.--list {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex-grow flex flex-col gap-4 p-4;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}

			.--footer {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				.--total-wrapper {
					/* SIZE */
					@apply w-full h-[46px];
					/* MARGINS AND PADDING */
					@apply px-4;
					/* LAYOUT */
					@apply flex items-center justify-between;
					/* BORDERS */
					/* COLORS */
					@apply bg-white;
					/* TEXT */
					/* ANIMATION AND EFFECTS */

					.--price {
						/* SIZE */
						/* MARGINS AND PADDING */
						/* LAYOUT */
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						@apply font-bold;
						/* ANIMATION AND EFFECTS */
					}
				}

				.--checkout-button {
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
			}
		}
	}
</style>
