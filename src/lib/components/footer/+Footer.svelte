<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import FooterNewsletter from "$lib/components/footer/+FooterNewsletter.svelte";

	let newsletterEmail: string = "";

	const handleNewsletterSubmit = async () => {
		await fetch("/api/newsletter", {
			method: "POST",
			body: JSON.stringify({
				email: "drobertpaul@gmail.com"
			})
		});
	};
</script>

<footer>
	<div class="--top-section">
		<div class="--row">
			<h3>WIEN</h3>
			<p>
				WE ARE EAGER TO HELP YOU TO MAKE YOUR HOUSE MORE BEAUTIFUL, MORE LIVABLE WITH AN AFFORDABLE
				PRICE & GOOD QUALITY OF FURNITURES.
			</p>
			<p>Socials</p>
		</div>

		<div class="--row">
			<h3>Shop</h3>

			<a href="/">Our Stores</a>
			<a href="/">Cart</a>
			<a href="/">My Account</a>
			<a href="/">Wishlist</a>
		</div>

		<div class="--row">
			<h3>Help</h3>

			<a href="/">Contact</a>
			<a href="/">FAQ's</a>
			<a href="/">Returns</a>
			<a href="/">Shipping</a>
			<a href="/">Guides</a>
		</div>

		<div class="--row">
			<FooterNewsletter />

			<small>
				I want emails from Minim with products information, promotions, advertisements. I can
				unsubscribe any time using the unsubscribe at the end of all emails. Contact Minim here.
				Read our Privacy Policy.
			</small>
		</div>
	</div>

	<div class="--copyright-wrapper">
		<p>{$trans("site.copyright")}</p>

		<div>
			<a href="/">Privacy Policy</a>
			<a href="/">Terms Of Service</a>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply pt-24;
		/* LAYOUT */
		@apply grid;
		/* BORDERS */
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply drop-shadow;

		.--top-section {
			/* SIZE */
			@apply max-w-[1170px];
			/* MARGINS AND PADDING */
			@apply mx-auto pb-10;
			/* LAYOUT */
			@apply grid grid-cols-4 gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--row {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--copyright-wrapper {
			/* SIZE */
			@apply max-w-[1170px] w-full h-20;
			/* MARGINS AND PADDING */
			@apply mx-auto;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			@apply border-t border-gray-200;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
