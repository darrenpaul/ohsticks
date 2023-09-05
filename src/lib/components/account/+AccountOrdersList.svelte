<script lang="ts">
	import { browser } from "$app/environment";
	import { accountOrderRoute, accountRoute } from "$lib/constants/routes/accountRoute";
	import { user } from "$lib/firebase/firebaseClient";
	import type { Order } from "$lib/types/order";
	import { error } from "@sveltejs/kit";

	let orders: Order[] = [];

	const handleOrderFetch = async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/order", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": accessToken
			}
		});

		const jsonData = await response.json();

		if (jsonData.orders) {
			orders = jsonData.orders;
		}
	};

	if (browser) {
		handleOrderFetch();
	}
</script>

<p>My Orders</p>

{#each orders as order}
	<a href={`${accountOrderRoute.path}/${order.id}`}>
		<p>{order.id}</p>
		<p>{order.status}</p>
	</a>
{/each}
