<script lang="ts">
	import { onMount } from "svelte";

	export let items: any[];
	export let paginatedList: any[];
	export let itemsPerPage = 5;

	let pages: number;
	let currentPage = 0;
	let pageNumbers: number[] = [];

	onMount(() => {
		onPaginate(0);
		pages = Math.ceil(items.length / itemsPerPage);
		pageNumbers = generatePageNumbers();
	});

	const onPaginate = (index: number) => {
		currentPage = index;
		paginatedList = items.slice(
			currentPage * itemsPerPage,
			currentPage * itemsPerPage + itemsPerPage
		);
		pageNumbers = generatePageNumbers();
	};

	const generatePageNumbers = () => {
		const pageNumberArray = Array.from({ length: pages }, (_, index) => index);

		if (currentPage < 2) {
			return pageNumberArray.slice(0, itemsPerPage + currentPage + 1);
		}

		if (currentPage === pages - 1) {
			return pageNumberArray.slice(currentPage - 2, currentPage + 1);
		}
		return pageNumberArray.slice(currentPage - 1, itemsPerPage + currentPage);
	};
</script>

<div class="paginate">
	<div class="--index-buttons">
		{#each pageNumbers as pageNumber}
			<button
				class={currentPage === pageNumber ? "--index-button-active" : "--index-button"}
				type="button"
				on:click={() => onPaginate(pageNumber)}
			>
				{pageNumber + 1}
			</button>
		{/each}
	</div>
</div>

<style lang="postcss">
	.paginate {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-16;
		/* LAYOUT */
		@apply flex items-center justify-end;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--index-buttons {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--index-button {
				@apply w-12 h-12;
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				@apply border border-orange-400 rounded-full;
				/* COLORS */
				/* TEXT */
				@apply font-bold;
				/* ANIMATION AND EFFECTS */
			}

			.--index-button-active {
				@extend .--index-button;
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply bg-orange-400;
				/* TEXT */
				@apply text-white;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
