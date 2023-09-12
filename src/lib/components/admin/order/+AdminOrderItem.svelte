<script lang="ts">
	import { productRoute } from "$lib/constants/routes/productRoute";
	import type { OrderItem } from "$lib/types/order";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";

	export let item: OrderItem;
</script>

<tr>
	<td class="text-left">
		<a href={`${productRoute.path}/${item.slug}`} target="_blank">
			{item.id}
		</a>
	</td>
	<td class="text-center">{item.name}</td>
	<td class="text-center">{addCurrencySymbol(item.price)}</td>
	<td class="text-center">{item.quantity}</td>
	<td class="text-right">
		{addCurrencySymbol((Number(item.price) * Number(item.quantity)).toFixed(2))}
	</td>
</tr>
