<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import BrandPortraitIcon from "$lib/components/icons/+BrandPortraitIcon.svelte";
	import { accountOrderRoute } from "$lib/constants/routes/accountRoute";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import type { OrderItem } from "$lib/types/order";
	import { purchaseEvent } from "$lib/utils/googleTagManager";
	import { trans } from "$lib/locales/translateCopy";
	import { deleteCart } from "$lib/stores/cartStore";

	export let data;
	let session = data?.session;

	const updateOrderStatus = async () => {
		const sessionId = $page.url.searchParams.get("session_id");
		const orderId = $page.url.searchParams.get("order_id");

		if (!orderId) {
			// TODO: Cancel order
			redirectToUser(homeRoute.path);
			return;
		}

		const orderResponse = await fetch(`/api/order?session_id=${sessionId}&order_id=${orderId}`, {
			method: "PUT"
		});
		const { status, items, shippingMethod } = await orderResponse.json();

		if (status === "paid") {
			track(orderId, items, Number(shippingMethod.price));
			await deleteCart(session);

			setTimeout(function () {
				const redirectUrl = `${accountOrderRoute.path}/${orderId}`;
				redirectToUser(redirectUrl);
			}, 2000);
		} else {
			// TODO: Cancel order
			redirectToUser(homeRoute.path);
		}
	};

	const redirectToUser = (path: string) => {
		goto(path, { replaceState: true });
	};

	const track = async (orderId: string, items: OrderItem[], shipping: number) => {
		purchaseEvent(orderId, items, shipping);
	};

	if (browser) {
		updateOrderStatus();
	}
</script>

<div class="processing-page">
	<div class="--brand">
		<BrandPortraitIcon />
	</div>

	<h2 class="--title">{trans("page.checkout.processingPayment.label")}</h2>

	<p><b>{trans("page.checkout.pleaseDontClose.label")}</b></p>
	<p>{trans("page.checkout.youWillBeRedirected.label")}</p>
</div>

<style lang="postcss">
	.processing-page {
		/* SIZE */
		@apply h-screen;
		/* MARGINS AND PADDING */
		@apply p-8;
		/* LAYOUT */
		@apply flex flex-col items-center justify-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		@apply text-center;
		/* ANIMATION AND EFFECTS */

		.--brand {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-8;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			@apply animate-bounce;
		}

		.--title {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
