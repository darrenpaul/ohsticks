<script lang="ts">
	export let width = 238;
	export let height = 67;
</script>

<div class="button-icon">
	<svg {width} {height} viewBox="0 0 238 67" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M0.790048 29.35C2.74005 22.85 8.42005 18.05 14.84 16.25C35.79 10.31 139.36 -0.0299724 151.28 0.670028C166.42 1.55003 181.7 1.63003 196.67 4.33003C210.69 6.85003 224.88 11.65 234.64 22.63C246.91 36.47 244.06 56.5 225.57 62.93C217.73 65.65 209.35 64.9 201.16 64.8C192.84 64.7 184.49 64.58 176.17 64.48L122.59 63.8C88.06 63.36 53.54 62.93 19.03 62.49C13.99 62.44 9.45005 59.63 6.44005 55.71C1.57005 49.34 -1.51995 37.11 0.790048 29.35Z"
			class="fill-[#7daedf] hover:fill-[#31BCAF] transition-colors duration-300"
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
