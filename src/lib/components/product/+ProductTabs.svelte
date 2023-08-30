<script lang="ts">
	import type { Product } from "$lib/types/product";
	import { _ as trans } from "svelte-i18n";

	let activeTab = 0;

	export let product: Product;
</script>

<section class="product-tabs">
	<div class="--tab-buttons">
		<button
			class={`${activeTab === 0 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 0)}
		>
			{$trans("component.productTabs.description.label")}
		</button>

		<button
			class={`${activeTab === 1 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 1)}
		>
			{$trans("component.productTabs.specifications.label")}
		</button>

		<button
			class={`${activeTab === 2 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 2)}
		>
			{$trans("component.productTabs.reviews.label")}
		</button>
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
	.product-tabs {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply px-8 mb-16;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--tab-buttons {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			@apply py-16;
			/* LAYOUT */
			@apply flex justify-center items-center gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--tab-button {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply text-gray-400;
				/* TEXT */
				@apply text-2xl font-bold;
				/* ANIMATION AND EFFECTS */
			}
			.--tab-button-active {
				@extend .--tab-button;
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply text-black;
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
