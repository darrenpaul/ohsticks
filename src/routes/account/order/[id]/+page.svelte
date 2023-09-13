<script lang="ts">
	import { browser } from "$app/environment";
	import CheckoutForm from "$lib/components/checkout/+CheckoutForm.svelte";
	import CheckoutInformation from "$lib/components/checkout/+CheckoutInformation.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import ArrowLeftIcon from "$lib/components/icons/+ArrowLeftIcon.svelte";
	import { user } from "$lib/firebase/firebaseClient";
	import OrderConfirmationHeader from "$lib/components/order/+OrderConfirmationHeader.svelte";
	import OrderConfirmationUpdates from "$lib/components/order/+OrderConfirmationUpdates.svelte";
	import { error } from "@sveltejs/kit";
	import { page } from "$app/stores";
	import type { Order } from "$lib/types/order";
	import OrderConfirmationShipping from "$lib/components/order/+OrderConfirmationShipping.svelte";
	import { collectionRoute } from "$lib/constants/routes/collectionRoute";
	import OrderConfirmationList from "$lib/components/order/+OrderConfirmationList.svelte";
	import OrderConfirmationTotals from "$lib/components/order/+OrderConfirmationTotals.svelte";

	let order: Order;

	const handleOrderFetch = async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch(`/api/order?id=${$page.params.id}`, {
			method: "GET",
			headers: {
				"x-access-token": accessToken
			}
		});

		if (response.ok) {
			const jsonData = await response.json();
			if (jsonData.order) {
				order = jsonData.order;
			}
		} else {
			return error(response.status, "Order not found");
		}
	};

	if (browser) {
		handleOrderFetch();
	}
</script>

<ContainWidth>
	{#if order}
		<div class="order-confirmation-page">
			<div class="--information">
				<OrderConfirmationHeader {order} />

				<OrderConfirmationUpdates {order} />

				<OrderConfirmationShipping {order} />

				<div class="--button-wrapper">
					<a class="submit-button" href={`${collectionRoute.path}/all`}>
						{trans("page.order.continueShopping.label")}
					</a>
				</div>
			</div>

			<div class="--items">
				<OrderConfirmationList items={order.items} />

				<OrderConfirmationTotals {order} />
			</div>
		</div>
	{/if}
</ContainWidth>

<style lang="scss">
	.order-confirmation-page {
		/* SIZE */
		@apply h-[100dvh];
		/* MARGINS AND PADDING */
		@apply pt-20;
		/* LAYOUT */
		@apply grid grid-cols-2 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--information {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--button-wrapper {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply grid grid-cols-2;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				a {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply col-start-2;
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}
		}

		.--items {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
