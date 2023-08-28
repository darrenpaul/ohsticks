<script lang="ts">
	import type { Product } from "$lib/types/product";
	import Rating from "$lib/components/shared/+Rating.svelte";
	import ProductFeatureImageSelect from "./+ProductFeatureImageSelect.svelte";
	import { cart, addToCart } from "$lib/stores/cartStore";

	let activeTab = 0;

	export let product: Product;
</script>

<section class="product-tabs">
	<div class="--tab-buttons">
		<button on:click={() => (activeTab = 0)}>Description</button>
		<button on:click={() => (activeTab = 1)}>Specifications</button>
		<button on:click={() => (activeTab = 2)}>Reviews</button>
	</div>

	<div class="--tabs">
		{#if activeTab === 0}
			<div class="--tab">
				<p>{product.description}</p>
			</div>
		{:else if activeTab === 1}
			<div class="--tab">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi mollitia a quaerat pariatur
				incidunt rerum earum at eum fugit, nesciunt, quam enim vel autem tenetur. Natus minima
				excepturi mollitia quia.
			</div>
		{:else if activeTab === 2}
			<div class="--tab">Some Reviews</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.product-feature {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		@apply grid grid-cols-2 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--content {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--header {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex items-center justify-between;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}

			.--add-to-cart-button {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply px-6 py-4;
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply bg-black text-white;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
