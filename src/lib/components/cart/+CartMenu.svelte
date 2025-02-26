<script lang="ts">
	import CrossIcon from "$lib/components/icons/+CrossIcon.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import { cart } from "$lib/stores/cartStore";
	import { calculateDiscountPrice, sumArrayNumbers } from "$lib/utils/maths";
	import CartMenuItem from "./+CartMenuItem.svelte";
	import { getContext } from "svelte";
	import { checkoutRoute } from "$lib/constants/routes/checkoutRoute";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import type { CartItem } from "$lib/types/cart";
	import type { Writable } from "svelte/store";
	import { cartItemQuantity } from "$lib/utils/cartHelpers";

	const cartState: Writable<boolean> = getContext("cartState");

	let cartQuantity: string;
	let totalPrice = "0.00";

	$: {
		if ($cart) {
			cartQuantity = cartItemQuantity($cart?.cartItems);
			totalPrice = getTotalPrice();
		}
	}

	const getTotalPrice = () => {
		if ($cart && $cart?.cartItems?.length > 0) {
			const pricesAfterDiscount: number[] = $cart?.cartItems.map((item: CartItem) =>
				Number(calculateDiscountPrice(item.price, item.discount, item.quantity))
			);
			return sumArrayNumbers(pricesAfterDiscount);
		}
		return "0.00";
	};

	const closeCart = () => {
		cartState.set(false);
	};
</script>

<div class="cart-menu">
	<div class="--backdrop" role="button" tabindex={1} on:click={closeCart} on:keydown={closeCart} />

	<div class="--menu">
		<div class="--header">
			<div class="--container">
				<button class="--close-button" on:click={closeCart}>
					<span><CrossIcon width={14} height={14} /></span>
				</button>
			</div>

			<div class="--center">
				<p>{trans("component.cartMenu.yourCart")}</p>
			</div>

			<div class="--container">
				<p>{cartQuantity}</p>
			</div>
		</div>

		<div class="--list">
			{#if $cart?.cartItems}
				{#each $cart?.cartItems as cartItem, index}
					<CartMenuItem {cartItem} {index} />
				{/each}
			{/if}
		</div>

		<div class="--footer">
			<div class="--total-wrapper">
				<p>{trans("component.cartMenu.total")}</p>

				<p class="--price">
					{addCurrencySymbol(totalPrice)}
				</p>
			</div>

			<a href={checkoutRoute.path} class="--checkout-button">
				{trans("component.cartMenu.checkout")}
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
			@apply w-full max-w-[417px] h-[100dvh];
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
				@apply flex-shrink-0 flex items-center justify-between;
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
					@apply flex-shrink-0 grid place-items-center;
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */

					.--close-button {
						/* SIZE */
						@apply w-full h-full;
						/* MARGINS AND PADDING */
						/* LAYOUT */
						@apply grid place-items-center;
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						/* ANIMATION AND EFFECTS */
					}
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
				@apply flex-grow flex flex-col gap-4 p-4 overflow-y-scroll;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				/* Chrome, Safari and Opera */
				&::-webkit-scrollbar {
					display: none;
				}
				-ms-overflow-style: none; /* IE and Edge */
				scrollbar-width: none; /* Firefox */
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
