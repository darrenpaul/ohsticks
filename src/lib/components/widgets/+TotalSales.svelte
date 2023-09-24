<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { getAllPaidOrders } from "$lib/utils/order";

	export let orders;

	let totalSales = 0;

	const calculateTotalSales = () => {
		const paidOrders = getAllPaidOrders(orders);
		totalSales = paidOrders.length;
	};

	$: {
		calculateTotalSales();
	}
</script>

<div class="widget">
	<p>{trans("totalPaidSales.label")}</p>

	<h2>
		{totalSales}
	</h2>
</div>

<style lang="scss">
	.widget {
		/* SIZE */
		@apply w-fit;
		/* MARGINS AND PADDING */
		@apply p-4;
		/* LAYOUT */
		/* BORDERS */
		@apply border rounded-xl;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		h2 {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply font-bold text-center;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
