<script lang="ts">
	import { user } from "$lib/firebase/firebaseClient";

	$user;
</script>

<div class="page">
	<slot />
</div>

<style lang="scss">
	.page {
		/* SIZE */
		@apply min-h-[100dvh];
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
