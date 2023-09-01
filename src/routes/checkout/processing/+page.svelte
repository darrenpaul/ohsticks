<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { homeRoute } from "$lib/constants/routes/homeRoute";

	const updateOrderStatus = async () => {
		const sessionId = $page.url.searchParams.get("session_id");
		const orderId = $page.url.searchParams.get("order_id");

		const orderResponse = await fetch(`/api/order?session_id=${sessionId}&order_id=${orderId}`, {
			method: "PUT"
		});

		const { status } = await orderResponse.json();

		if (status === "paid") {
			window.location.replace("/order");
		} else {
			window.location.replace(homeRoute.path);
		}
	};

	if (browser) {
		updateOrderStatus();
	}
</script>

<div>Processing</div>

<style lang="scss">
</style>
