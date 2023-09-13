<script lang="ts">
	import { accountOrderRoute } from "$lib/constants/routes/accountRoute";
	import type { Order } from "$lib/types/order";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { format } from "date-fns";
	import { trans } from "$lib/locales/translateCopy";

	export let order: Order;
</script>

<tr>
	<td>
		<a href={`${accountOrderRoute.path}/${order.id}`}>
			{order.id}
		</a>
	</td>
	<td class="text-center">{format(new Date(order.createdAt._seconds * 1000), "dd MMM, yyyy")}</td>
	<td class="text-center">{order.shippingAddress.address1}</td>
	<td class="text-center">{addCurrencySymbol(order?.total || "0.00")}</td>
	<td class="text-center uppercase font-bold">{order.status}</td>
	<td class="text-center">
		<a href={`${accountOrderRoute.path}/${order.id}`}>
			<p>{trans("page.order.view.label")}</p>
		</a>
	</td>
</tr>
