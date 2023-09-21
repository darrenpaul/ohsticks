<script lang="ts">
	export let title = "";
</script>

<div class="side-by-side-image">
	<h2 class="--heading">{title}</h2>

	<div class="--images">
		<slot />
	</div>
</div>

<style lang="postcss">
	.side-by-side-image {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-8 md:mb-16;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--heading {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply my-16;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-3xl text-center font-bold;
			/* ANIMATION AND EFFECTS */
		}

		.--images {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid md:grid-cols-3 gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
