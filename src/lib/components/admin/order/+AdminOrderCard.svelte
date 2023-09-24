<script lang="ts">
	import { adminOrderRoute } from "$lib/constants/routes/adminOrderRoute";
	import type { Order } from "$lib/types/order";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { format } from "date-fns";
	import { trans } from "$lib/locales/translateCopy";

	export let order: Order;
</script>

<tr>
	<td>
		<a href={`${adminOrderRoute.path}/${order.id}`}>
			{order.id}
		</a>
	</td>
	<td class="text-center">{format(new Date(order.createdAt), "dd MMM, yyyy")}</td>
	<td class="text-center">{addCurrencySymbol(order?.total || "0.00")}</td>
	<td class="text-center uppercase font-bold">{order.status}</td>
	<td class="text-center">
		<a href={`${adminOrderRoute.path}/${order.id}`}>
			<p>{trans("page.order.action.view.label")}</p>
		</a>
	</td>
</tr>
