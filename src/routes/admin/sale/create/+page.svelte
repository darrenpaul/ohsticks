<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";

	export let data;

	let discountPercentage = 0;

	let selectedProducts = data.products.map((product) => {
		return {
			...product,
			selected: false
		};
	});

	const createSale = async () => {
		await fetch(`/api/admin/sale`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				discountPercentage,
				productIds: selectedProducts
					.filter((product) => product.selected)
					.map((product) => product.id)
			})
		});
	};
</script>

<div>
	<h3>Current Sale Products</h3>

	<!-- DISCOUNT -->
	<div class="input-group">
		<label for="discount-percentage">
			{trans("page.createSale.discountPercentage.label")}
			{discountPercentage}%
		</label>
		<input
			type="range"
			min="0"
			max="100"
			id="discount-percentage"
			bind:value={discountPercentage}
		/>
	</div>

	{#each selectedProducts as product}
		<div class="flex items-center gap-8">
			<div class="input-group">
				<label for="visible">{product.name}</label>
				<input type="checkbox" id="visible" name="visible" bind:checked={product.selected} />
			</div>
		</div>
	{/each}

	<button class="slim-button" on:click={createSale}>Create Sale</button>
</div>

<style lang="postcss">
</style>
