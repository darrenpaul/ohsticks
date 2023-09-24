<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import {
		adminProductCreateRoute,
		adminProductEditRoute
	} from "$lib/constants/routes/adminProductRoute";
	import type { Product } from "$lib/types/product";

	export let data;

	let products: Product[] = data.products.sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});
</script>

<div class="products-page">
	<div class="--header">
		<h1>{trans("page.product.productPage.label")}</h1>

		<a class="slim-button" href={adminProductCreateRoute.path}>Create Product</a>
	</div>

	<div class="--list">
		{#each products as product}
			<div class="--card">
				<img src={product.featureImage.src} alt={product.name} loading="lazy" />

				<div class="--group">
					<p class="--title">
						{product.name}
					</p>

					<div class="--categories">
						{#each product.categories as category}
							<p>{category}</p>
						{/each}
					</div>

					<a class="slim-button w-fit" href={`${adminProductEditRoute.path}/${product.id}`}>
						{trans("page.product.view.label")}
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.products-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply my-8;
			/* LAYOUT */
			@apply flex justify-between items-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--list {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--card {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex items-center  gap-8;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				.--group {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply flex flex-col gap-2;
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */

					.--title {
						/* SIZE */
						/* MARGINS AND PADDING */
						/* LAYOUT */
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						@apply font-bold;
						/* ANIMATION AND EFFECTS */
					}

					.--categories {
						/* SIZE */
						/* MARGINS AND PADDING */
						/* LAYOUT */
						@apply flex gap-2;
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						@apply capitalize
						/* ANIMATION AND EFFECTS */;
					}
				}

				img {
					/* SIZE */
					@apply w-40 h-40;
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply flex-shrink-0 object-cover;
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}
		}
	}
</style>
