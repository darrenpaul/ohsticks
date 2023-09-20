<script lang="ts">
	import StarIcon from "$lib/components/icons/+StarIcon.svelte";
	import { format } from "date-fns";

	export let review;
</script>

<div class="review">
	<div>
		<div class="--header">
			<div class="--stars">
				{#each Array.from({ length: 5 }) as _, index}
					<StarIcon width={24} height={24} isActive={index < review.rating} />
				{/each}
			</div>
			<p class="--date">{format(new Date(review.createdAt), "MMMM yyyy")}</p>
		</div>

		<h3>{review.title}</h3>

		<p>{review.content}</p>
	</div>
</div>

<style lang="postcss">
	.review {
		/* SIZE */
		@apply w-full;
		/* MARGINS AND PADDING */
		@apply py-4;
		/* LAYOUT */
		/* BORDERS */
		@apply border-b border-gray-200;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-2;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--date {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply text-gray-500;
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}

		.--stars {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--image {
			/* SIZE */
			@apply max-h-[50vh];
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
