<script lang="ts">
	import { adminSaleCreateRoute } from "$lib/constants/routes/adminSaleRoute.js";

	export let data;

	let products = data.products;
	let onSaleProducts = data.products.filter((product) => product.discountPercentage > 0);
</script>

<div>
	<h3>Current Sale Products</h3>

	<a class="slim-button" href={adminSaleCreateRoute.path}>Create Sale</a>
	{#each onSaleProducts as product}
		<div class="flex items-center gap-8">
			<p>{product.name}</p>
			<small>{product.discountPercentage}% off</small>
		</div>
	{/each}
</div>

<style lang="postcss">
</style>
