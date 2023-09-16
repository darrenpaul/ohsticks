<script lang="ts">
	import {
		adminProductCreateRoute,
		adminProductEditRoute
	} from "$lib/constants/routes/admin/adminProductRoute";
	import { user } from "$lib/firebase/firebaseClient";
	import type { Product } from "$lib/types/product";
	import { error } from "@sveltejs/kit";
	import { onMount } from "svelte";

	onMount(async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/admin/product", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": accessToken
			}
		});

		products = await response.json();
	});

	export let products: Product[] = [];
</script>

<a href={adminProductCreateRoute.path}>Create Product</a>

<h2>Product List</h2>
<table class="table-fixed">
	<thead>
		<tr>
			<th>Name</th>
			<th>Price</th>
			<th>Quantity</th>
			<th>Feature</th>
		</tr>
	</thead>
	<tbody>
		{#if products}
			{#each products as product}
				<tr>
					<td>
						<a href={`${adminProductEditRoute.path}/${product.id}`}>
							{product.name}
						</a>
					</td>
					<td>{product.price}</td>
					<td>{product.quantity}</td>
					<td>
						<img
							class="w-24 h-24 object-cover"
							src={product.featureImage.src}
							alt={product.name}
							loading="lazy"
						/>
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>
