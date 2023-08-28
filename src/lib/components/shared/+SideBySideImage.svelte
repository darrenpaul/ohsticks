<script lang="ts">
	// import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	// import { _ as trans } from "svelte-i18n";

	// export let title = "Product List Carousel";
</script>

<div class="side-by-side-image">
	<img
		src="https://images.unsplash.com/photo-1572950947476-26a6e4111e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
		alt="Preview"
	/>

	<img
		src="https://images.unsplash.com/photo-1589384267710-7a170981ca78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
		alt="Preview"
	/>
</div>

<style lang="scss">
	.side-by-side-image {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid grid-cols-2;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
