<script lang="ts">
	const onClick = async () => {
		const response = await fetch("/api/prodigi/quote", {
			method: "POST",
			body: JSON.stringify({
				order: {
					id: "81632630-c336-4342-a616-636e8b6a8afc",
					customer: {
						firstName: "Darren",
						lastName: "Paul",
						email: "drobertpaul@gmail.com"
					},
					shippingAddress: {
						address1: "Dornbacher Straße 91a, Building 2, Apartment 5",
						address2: "",
						city: "Vienna",
						province: "9",
						postalCode: "1170",
						country: "AT"
					},
					paymentMethod: "stripe",
					items: [
						{
							id: "ccfd745b-3811-4f2f-93fd-3c488a126bcc",
							name: "Cute Cat in Hoodie",
							description:
								"Charmingly cute and fashionable, our Cute Cat wearing a Hoodie Sticker is the perfect accessory for cat lovers. Made from premium materials, it offers durability and easy application. Decorate your belongings with this versatile sticker that adds a playful touch of color and personality to any item.",
							brand: "OhSticks",
							slug: "cute-cat-in-hoodie",
							quantity: 1,
							price: "2.00",
							currency: "eur",
							image: {
								src: "https://pziocbmxbpurobqznrjs.supabase.co/storage/v1/object/public/product/cute-cat-in-hoodie/cute-cat-in-hoodie-lzt8s.webp",
								width: 512,
								height: 512
							},
							categories: ["sticker", "cat", "cute", "pride"]
						}
					],
					subtotal: "2",
					shippingMethod: {
						id: "shr_1NnKHpGQocPdnFnIiXyE680L",
						label: "Standard Shipping",
						description: "Delivered within 8 weeks",
						price: 3
					},
					total: "6",
					status: "paid",
					createdAt: "2023-09-21T10:39:01.683792+00:00",
					updatedAt: "2023-09-21T10:44:44.172+00:00"
				}
			})
		});
	};
</script>

<div>
	<button on:click={onClick} class="submit-button">Run Trash</button>
</div>
