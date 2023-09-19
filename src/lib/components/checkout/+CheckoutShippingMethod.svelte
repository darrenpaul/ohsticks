<script lang="ts">
	import { browser } from "$app/environment";
	import { shippingMethods } from "$lib/constants/shippingMethods";
	import type { ShippingMethod } from "$lib/types/order";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { getContext } from "svelte";
	import { trans } from "$lib/locales/translateCopy";
	import type { Writable } from "svelte/store";

	const shippingMethodState: Writable<ShippingMethod> = getContext("shippingMethod");

	let shippingMethod: ShippingMethod;

	if (browser) {
		shippingMethodState.subscribe((value) => {
			shippingMethod = value;
		});
	}

	const onChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const selected = shippingMethods.find(({ id }) => id === target.value);
		if (selected) {
			shippingMethodState.set(selected);
		}
	};
</script>

<h4>{trans("form.checkout.shippingMethod.label")}</h4>

{#each shippingMethods as method}
	<div class="shipping-method-radio">
		<input
			class="--input"
			checked={method.id === shippingMethod?.id}
			id={method.id}
			type="radio"
			value={method.id}
			on:change={onChange}
			name="shipping-method"
		/>

		<div class="--label-wrapper">
			<!-- NAME -->
			<label class="" for={method.id}>
				{method.label}
			</label>

			<!-- PRICE -->
			<label class="" for={method.id}>
				{addCurrencySymbol(method.price.toFixed(2))}
			</label>

			<!-- DESCRIPTION -->
			<small>
				{method.description}
			</small>
		</div>
	</div>
{/each}

<style lang="postcss">
	.shipping-method-radio {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-4;
		/* LAYOUT */
		@apply flex items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		@apply text-black;
		/* ANIMATION AND EFFECTS */

		.--input {
			/* SIZE */
			@apply w-8 h-8;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			@apply focus:ring-2;
			/* COLORS */
			@apply focus:ring-transparent accent-black;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--label-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply ml-2;
			/* LAYOUT */
			@apply flex flex-col;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			label {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
				@apply font-semibold;
			}
		}
	}
</style>
