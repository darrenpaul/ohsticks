<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { sumArrayNumbers } from "$lib/utils/maths";
	import { getAllPaidOrders } from "$lib/utils/order";

	export let orders;

	let total = 0;

	const calculateTotalProfit = () => {
		const paidOrders = getAllPaidOrders(orders);

		const productsFromOrders = paidOrders.map((order) => order.items).flat();

		const productsPriceInformation = productsFromOrders.map((orderProduct) => {
			return {
				quantity: orderProduct.quantity,
				price: Number(orderProduct.price),
				tax: 0
			};
		});

		total = sumArrayNumbers(
			productsPriceInformation.map((product) => product.price * product.quantity)
		);
	};

	$: {
		calculateTotalProfit();
	}
</script>

<div class="widget">
	<p>{trans("grossRevenue.label")}</p>

	<h2>
		{addCurrencySymbol(total)}
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
