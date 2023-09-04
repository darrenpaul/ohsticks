<script lang="ts">
	export let width = 24;
	export let height = 24;
	export let fill = "fill-black";
</script>

<svg
	clip-rule="evenodd"
	fill-rule="evenodd"
	stroke-linejoin="round"
	stroke-miterlimit="2"
	viewBox="0 0 24 24"
	{width}
	{height}
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		class={fill}
		d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"
	/>
</svg>
