<script lang="ts">
	export let width = 238;
	export let height = 67;
</script>

<div class="button-icon">
	<svg {width} {height} viewBox="0 0 238 67" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M236.61 42.66C234.49 48.98 228.76 53.5 222.4 55.05C201.65 60.2 99.7101 67 88.0401 65.92C73.2201 64.56 58.2301 64 43.6301 60.86C29.9601 57.94 16.1901 52.77 6.97009 41.68C-4.61991 27.71 -1.16991 8.15 17.1701 2.44C24.9501 0.0299952 33.1401 1.03 41.1801 1.4C49.3401 1.77 57.5301 2.15 65.6901 2.52L118.23 4.92C152.09 6.47 185.95 8 219.79 9.56C224.74 9.78 229.1 12.67 231.92 16.62C236.49 23.03 239.13 35.13 236.61 42.66Z"
			class="fill-[#F2632E] hover:fill-[#31BCAF] transition-colors duration-300"
		/>
	</svg>

	<div class="--text-wrapper">
		<slot />
	</div>
</div>

<style lang="scss">
	.button-icon {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative flex items-center justify-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--text-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply absolute;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-white font-bold;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
