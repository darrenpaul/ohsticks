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
	<div class="top-section">
		<!-- BRAND -->
		<div class="row">
			<a href={homeRoute.path} aria-label={`Go to ${homeRoute.label} page`}>
				<BrandPortraitIcon />
			</a>

			<p class="company-description">
				{trans("component.footer.companyDescription.label")}
			</p>

			<Socials />
		</div>

		<!-- SHOP -->
		<div class="row">
			<h3>{trans("component.footer.shop.label")}</h3>

			{#each shopLinks as link}
				<a href={link.path} aria-label={`Go to ${link.label} page`}>{link.label}</a>
			{/each}
		</div>

		<!-- HELP -->
		<div class="row">
			<h3>Help</h3>

			{#each helpLinks as link}
				<a href={link.path} aria-label={`Go to ${link.label} page`}>{link.label}</a>
			{/each}
		</div>

		<!-- NEWSLETTER -->
		<div class="row">
			<FooterNewsletter />
		</div>
	</div>

	<div class="copyright-wrapper">
		<p>{trans("site.copyright")}</p>

		<div>
			<a href="/" aria-label={`Go to Privacy page`}>Privacy Policy</a>
			<a href="/" aria-label={`Go to Terms page`}>Terms Of Service</a>
		</div>
	</div>
</footer>

<style lang="postcss">
	@import "./+Footer.scss";
</style>
