<script lang="ts">
	import type { KeyValueString } from "$lib/types/keyValue";
	import type { Attribute } from "$lib/types/product";

	export let attributes: Attribute[];
	export let selectedAttributes: KeyValueString = {};

	let attributeArray = Object.values(attributes);

	const onAttributeClick = (attribute: string, option: string) => {
		console.log("onAttributeClick ~ option:", option);
		selectedAttributes[attribute.toLowerCase()] = option;
	};
</script>

<div class="product-attribute-select">
	{#each attributeArray as attribute}
		<p class="-title">
			{attribute.name}
		</p>

		<div class="-list">
			{#each attribute.options.split(",") as option}
				<button
					class={`-button  ${
						selectedAttributes[attribute.name.toLowerCase()] === option ? "active" : ""
					}`}
					on:click|preventDefault={() => onAttributeClick(attribute.name, option)}
				>
					{option}
				</button>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.product-attribute-select {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.-title {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply font-bold;
			/* ANIMATION AND EFFECTS */
		}

		.-list {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.-button {
			/* SIZE */
			@apply w-12 h-12;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			@apply border rounded;
			/* COLORS */
			@apply border-black;
			/* TEXT */
			@apply uppercase;
			/* ANIMATION AND EFFECTS */

			&.active {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply bg-black text-white;
				/* TEXT */
				@apply font-bold;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
