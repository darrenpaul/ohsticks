<script lang="ts">
	export let background = "bg-neutral-100";
</script>

<div class={`contain-width ${background}`}>
	<div class="--inner">
		<slot />
	</div>
</div>

<style lang="scss">
	.contain-width {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--inner {
			/* SIZE */
			@apply w-full max-w-[1170px];
			/* MARGINS AND PADDING */
			@apply mx-auto px-4;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
