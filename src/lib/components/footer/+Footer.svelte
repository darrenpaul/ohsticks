<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import FooterNewsletter from "$lib/components/footer/+FooterNewsletter.svelte";
	import Socials from "$lib/components/shared/+Socials.svelte";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import {
		dashboardAccountOrdersRoute,
		dashboardAccountRoute
	} from "$lib/constants/routes/dashboardRoute";
	import { contactRoute } from "$lib/constants/routes/contactRoute";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import BrandPortraitIcon from "$lib/components/icons/+BrandPortraitIcon.svelte";

	const shopLinks = [collectionAllRoute, dashboardAccountOrdersRoute, dashboardAccountRoute];

	const helpLinks = [contactRoute];
</script>

<footer>
	<div class="--top-section">
		<!-- BRAND -->
		<div class="--row">
			<a href={homeRoute.path} aria-label={`Go to ${homeRoute.label} page`}>
				<BrandPortraitIcon />
			</a>

			<p class="--company-description">
				{trans("component.footer.companyDescription.label")}
			</p>

			<Socials />
		</div>

		<!-- SHOP -->
		<div class="--row">
			<h3>{trans("component.footer.shop.label")}</h3>

			{#each shopLinks as link}
				<a href={link.path} aria-label={`Go to ${link.label} page`}>{link.label}</a>
			{/each}
		</div>

		<!-- HELP -->
		<div class="--row">
			<h3>Help</h3>

			{#each helpLinks as link}
				<a href={link.path} aria-label={`Go to ${link.label} page`}>{link.label}</a>
			{/each}
		</div>

		<!-- NEWSLETTER -->
		<div class="--row">
			<FooterNewsletter />
		</div>
	</div>

	<div class="--copyright-wrapper">
		<p>{trans("site.copyright")}</p>

		<div>
			<a href="/" aria-label={`Go to Privacy page`}>Privacy Policy</a>
			<a href="/" aria-label={`Go to Terms page`}>Terms Of Service</a>
		</div>
	</div>
</footer>

<style lang="postcss">
	footer {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply pt-8 md:pt-24 px-4;
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
			@apply flex flex-col-reverse md:grid grid-cols-4 gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--row {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--company-description {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			@apply text-gray-500;
			/* TEXT */
			@apply text-sm;
			/* ANIMATION AND EFFECTS */
		}

		.--copyright-wrapper {
			/* SIZE */
			@apply max-w-[1170px] w-full h-fit;
			/* MARGINS AND PADDING */
			@apply mx-auto py-4;
			/* LAYOUT */
			@apply flex flex-col-reverse md:flex-row items-center justify-between;
			/* BORDERS */
			@apply border-t border-gray-200;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
