<script lang="ts">
	import { adminProductCreateRoute } from "$lib/constants/routes/admin/adminProductRoute";

	export let data;
</script>

<a href={adminProductCreateRoute.path}>Create Product</a>

<h2>Product List</h2>
<table class="table-fixed">
	<thead>
		<tr>
			<th>Name</th>
			<th>Price</th>
			<th>Quantity</th>
			<th>Feature</th>
		</tr>
	</thead>
	<tbody>
		{#each data.body.products as product}
			<tr>
				<td>{product.name}</td>
				<td>{product.price}</td>
				<td>{product.quantity}</td>
				<td><img class="w-24 h-24 object-cover" src={product.featureImage} alt={product.name} /></td
				>
			</tr>
		{/each}
	</tbody>
</table>
