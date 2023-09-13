<script lang="ts">
	import type { Product } from "$lib/types/product";
	import { trans } from "$lib/locales/translateCopy";

	let activeTab = 0;

	export let product: Product;
</script>

<section class="product-tabs">
	<div class="--tab-buttons">
		<button
			class={`${activeTab === 0 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 0)}
		>
			{trans("component.productTabs.description.label")}
		</button>

		<button
			class={`${activeTab === 2 ? "--tab-button-active" : "--tab-button"}`}
			on:click={() => (activeTab = 2)}
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
				<div class="--tab">Some Reviews</div>
			</div>
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
			}
		}
	}
</style>
