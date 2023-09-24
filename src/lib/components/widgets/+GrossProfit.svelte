<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { sumArrayNumbers } from "$lib/utils/maths";
	import { getAllPaidOrders } from "$lib/utils/order";

	export let orders;
	export let products;

	let total = 0;

	const calculateTotalProfit = () => {
		const paidOrders = getAllPaidOrders(orders);

		const productsFromOrders = paidOrders.map((order) => order.items).flat();

		const productsPriceInformation = productsFromOrders.map((orderProduct) => {
			const matchedProduct = products.find((product) => product.id === orderProduct.id);
			const currency = orderProduct.currency;
			return {
				quantity: orderProduct.quantity,
				price: Number(orderProduct.price),
				manufacturerPrice: Number(matchedProduct.currencyPrice[currency].purchasePrice),
				tax: 0
			};
		});

		const totalManufacturerPrice = sumArrayNumbers(
			productsPriceInformation.map((product) => product.manufacturerPrice * product.quantity)
		);
		const totalSalesPrice = sumArrayNumbers(
			productsPriceInformation.map((product) => product.price * product.quantity)
		);

		total = totalSalesPrice - totalManufacturerPrice;
	};

	$: {
		calculateTotalProfit();
	}
</script>

<div class="widget">
	<p>{trans("grossProfit.label")}</p>

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
