<script lang="ts">
	import ProductReview from "$lib/components/product/+ProductReview.svelte";
	import Paginate from "../shared/+Paginate.svelte";

	export let reviews;
	let paginatedReviews = [];

	// $: {
	// 	const start = (currentPage.value - 1) * reviewsPerPage.value;
	// 	const end = start + reviewsPerPage.value;

	// 	return props.reviews.slice(start, end);
	// }
</script>

<div class="reviews">
	{#each paginatedReviews as review}
		<ProductReview {review} />
	{/each}

	<Paginate items={reviews} bind:paginatedList={paginatedReviews} />
</div>

<style lang="postcss">
	.reviews {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid grid-cols-1 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
