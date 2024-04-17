<script lang="ts">
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import type { Product } from "$lib/types/product";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";

	export let title: string;
	export let products: Product[];
</script>

<div class="product-list">
	<h2 class="heading">{title}</h2>

	<div class="list">
		{#each products as product, index}
			<ProductListCard {product} {index} />
		{/each}
	</div>
</div>

<style lang="scss">
	@import "./+ProductList.scss";
</style>
