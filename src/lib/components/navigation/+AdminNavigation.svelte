<script lang="ts">
	import { adminProductRoute } from "$lib/constants/routes/admin/adminProductRoute";
	import { adminOrderRoute } from "$lib/constants/routes/admin/adminOrderRoute";
	import { adminPageRoute } from "$lib/constants/routes/admin/adminPageRoute";
</script>

<nav>
	<div class="--links">
		<a href={adminProductRoute.path}>{adminProductRoute.label}</a>
		<a href={adminOrderRoute.path}>{adminOrderRoute.label}</a>
		<a href={adminPageRoute.path}>{adminPageRoute.label}</a>
	</div>
	<!-- <button on:click={() => {}}>Logout</button> -->
</nav>

<style lang="scss">
	nav {
		/* SIZE */
		@apply h-12;
		/* MARGINS AND PADDING */
		@apply px-4;
		/* LAYOUT */
		@apply flex items-center justify-between;
		/* BORDERS */
		/* COLORS */
		@apply bg-slate-400;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--links {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-6;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
