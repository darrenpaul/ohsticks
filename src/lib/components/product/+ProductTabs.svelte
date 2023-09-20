<script lang="ts">
	import type { Product } from "$lib/types/product";
	import { trans } from "$lib/locales/translateCopy";
	import ProductReviews from "./+ProductReviews.svelte";
	import ProductReviewForm from "./+ProductReviewForm.svelte";

	let activeTab = 1;

	export let product: Product;
	export let reviews;
	export let canReview: boolean;
</script>

<section class="product-tabs">
	<div class="--tab-buttons">
		<button
			class={`${activeTab === 0 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 0)}
			aria-label="View product details"
		>
			{trans("component.productTabs.description.label")}
		</button>

		<button
			class={`${activeTab === 1 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 1)}
			aria-label="View product reviews"
		>
			{trans("component.productTabs.reviews.label")}
		</button>
	</div>

	<div class="--tabs">
		{#if activeTab === 0}
			<div class="--tab">
				{#if product?.contentSections}
					{#each product.contentSections as contentSection}
						<div class="--content">
							<h4>{contentSection.subheading}</h4>
							<p>{contentSection.content}</p>
						</div>
					{/each}
				{/if}
			</div>
		{:else if activeTab === 1}
			<div class="--tab">
				<div class="--reviews">
					{#if reviews.length === 0}
						<h3 class="text-center">{trans("component.productTabs.reviews.noReviews.label")}</h3>
					{:else}
						<ProductReviews {reviews} />
					{/if}

					{#if canReview}
						<ProductReviewForm {product} />
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.product-tabs {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply px-8 my-16;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--tab-buttons {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			@apply pb-8 lg:py-16;
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

		.--tabs {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--tab {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				.--content {
					/* SIZE */
					/* MARGINS AND PADDING */
					@apply mb-8;
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}

				.--reviews {
					/* SIZE */
					@apply max-w-[800px];
					/* MARGINS AND PADDING */
					@apply mx-auto;
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}
		}
	}
</style>
