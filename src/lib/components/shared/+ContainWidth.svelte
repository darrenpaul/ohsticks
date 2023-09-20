<script lang="ts">
	export let background = "bg-neutral-100";
	export let padding = "p-0";
</script>

<div class={`contain-width ${background} ${padding}`}>
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
