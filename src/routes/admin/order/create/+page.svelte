<script lang="ts">
	let customer = "asdasdas";
	let shippingAddress = "asdasdas";
	let billingAddress = "asdasdas";
	let items = "asdasdas";
	let paymentMethod = "asdasdas";
	let shippingMethod = "asdasdas";
	let shippingCost = "asdasdas";
	let tax = "asdasdas";
	let total = "asdasdas";
	let status = "asdasdas";
	let createdAt = "asdasdas";
	let updatedAt = "asdasdas";

	const handleFormSubmit = async () => {
		fetch("/api/order", {
			method: "POST",
			body: JSON.stringify({
				customer,
				shippingAddress,
				billingAddress,
				items,
				paymentMethod,
				shippingMethod,
				shippingCost,
				tax,
				total,
				status,
				createdAt,
				updatedAt
			})
		});
	};
</script>

<p>Create Order</p>

<form on:submit|preventDefault={handleFormSubmit}>
	<!-- <div class="bg-red-500">
		<label for="name">Name</label>
		<input id="name" name="name" type="text" bind:value={name} />
	</div>

	<div>
		<label for="description">Description</label>
		<input id="description" name="description" type="text" bind:value={description} />
	</div>

	<div>
		<label for="price">Price</label>
		<input id="price" name="price" type="number" bind:value={price} />
	</div>

	<div>
		<label for="quantity">Quantity</label>
		<input id="quantity" name="quantity" type="number" bind:value={quantity} />
	</div>

	<div>
		{featureImage}
		<label for="featureImage">Feature Image</label>
		<input
			type="file"
			id="featureImage"
			name="featureImage"
			accept="image/*"
			on:change={(e) => onFileSelected(e)}
		/>
	</div> -->

	<button>Create</button>
</form>

<style lang="scss">
</style>
