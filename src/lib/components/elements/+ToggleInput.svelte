<script lang="ts">
	export let text: string = "Toggle me";
	export let checked: boolean = false;

	const onToggle = () => {
		checked = !checked;
	};
</script>

<label class="toggle-input">
	<input type="checkbox" value={checked} on:change={onToggle} class="sr-only peer" />
	<div
		class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
	/>
	<span class="--span">{text}</span>
</label>

<style lang="scss">
	.toggle-input {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative inline-flex items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply cursor-pointer;

		.--span {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply ml-3;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			@apply text-white;
			/* TEXT */
			@apply text-sm font-medium;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
