<script lang="ts">
	import { adminProductRoute } from "$lib/constants/routes/admin/adminProductRoute";
	import { adminOrderRoute } from "$lib/constants/routes/admin/adminOrderRoute";
	import { signOutUser } from "$lib/firebase/firebaseClient";
</script>

<nav>
	<div class="--links">
		<a href={adminProductRoute.path}>{adminProductRoute.label}</a>
		<a href={adminOrderRoute.path}>{adminOrderRoute.label}</a>
	</div>
	<button on:click={signOutUser}>Logout</button>
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
