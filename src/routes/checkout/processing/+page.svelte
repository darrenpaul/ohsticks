<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { accountOrderRoute } from "$lib/constants/routes/accountRoute";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import type { OrderItem } from "$lib/types/order";
	import { purchaseEvent } from "$lib/utils/googleTagManager";

	const updateOrderStatus = async () => {
		const sessionId = $page.url.searchParams.get("session_id");
		const orderId = $page.url.searchParams.get("order_id");

		if (!orderId) {
			// TODO: Cancel order
			window.location.replace(homeRoute.path);
			return;
		}

		const orderResponse = await fetch(`/api/order?session_id=${sessionId}&order_id=${orderId}`, {
			method: "PUT"
		});

		const { status, items, shippingMethod } = await orderResponse.json();

		if (status === "paid") {
			track(orderId, items, Number(shippingMethod.price));
			setTimeout(function () {
				window.location.replace(`${accountOrderRoute.path}/${orderId}`);
			}, 2000);
		} else {
			// TODO: Cancel order
			window.location.replace(homeRoute.path);
		}
	};

	const track = async (orderId: string, items: OrderItem[], shipping: number) => {
		purchaseEvent(orderId, items, shipping);
	};

	if (browser) {
		updateOrderStatus();
	}
</script>

<div>Processing</div>

<style lang="scss">
</style>
