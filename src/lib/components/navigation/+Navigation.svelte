<script lang="ts">
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import NavigationCartButton from "$lib/components/navigation/+NavigationCartButton.svelte";
	import NavigationAccountButton from "$lib/components/navigation/+NavigationAccountButton.svelte";
	import { page } from "$app/stores";
	import MenuClosedIcon from "$lib/components/icons/+MenuClosedIcon.svelte";
	import MenuOpenIcon from "$lib/components/icons/+MenuOpenIcon.svelte";
	import DesktopOnly from "$lib/components/shared/+DesktopOnly.svelte";
	import MobileOnly from "$lib/components/shared/+MobileOnly.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import CaretRightIcon from "$lib/components/icons/+CaretRightIcon.svelte";
	import { contactRoute } from "$lib/constants/routes/contactRoute";
	import BrandIcon from "$lib/components/icons/+BrandIcon.svelte";

	let navigationFixed: boolean;

	let mobileMenuOpen: boolean;

	let links = [homeRoute, collectionAllRoute, contactRoute];
	let linksMobile = [homeRoute, collectionAllRoute, contactRoute];

	$: {
		$page.url && (mobileMenuOpen = false);
	}
</script>

<!-- MOBILE NAVIGATION -->
<MobileOnly>
	<header>
		<div class="inner">
			<div class="menu-button-wrapper">
				<button on:click={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Close mobile menu">
					<MenuClosedIcon />
				</button>
			</div>

			<div class="branding">
				<a href={homeRoute.path} aria-label={`Go to ${homeRoute.label} page`}>
					<BrandIcon />
				</a>
			</div>

			<div class="cart-account">
				<NavigationCartButton />

				<NavigationAccountButton />
			</div>
		</div>

		{#if mobileMenuOpen}
			<div class="mobile-menu">
				<div class="header">
					<button
						on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
						class="menu-button"
						aria-label="Open mobile menu"
					>
						<MenuOpenIcon fill="fill-white" />{trans("component.navigation.menu.label")}
					</button>

					<button class="account-button" aria-label="Open account page">
						{trans("component.navigation.account.label")}
					</button>
				</div>

				<div class="links-mobile">
					{#each linksMobile as link}
						<a class="link-mobile" href={link.path} aria-label={`Go to ${link.label} page`}>
							<div class="link-mobile-inner">
								{link.label}

								<span class="icon">
									<CaretRightIcon width={12} height={12} fill="fill-gray-300" />
								</span>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</header>
</MobileOnly>

<!-- DESKTOP NAVIGATION -->
<DesktopOnly>
	<header class={navigationFixed ? "fixed" : "block"}>
		<div class="inner">
			<div class="branding">
				<a href={homeRoute.path} aria-label={`Go to ${homeRoute.label} page`}>
					<BrandIcon />
				</a>
			</div>

			<div class="links">
				{#each links as link}
					<a
						class={$page.url.pathname === link.path ? "active" : ""}
						href={link.path}
						aria-label={`Go to ${link.label} page`}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="cart-account">
				<NavigationCartButton />

				<NavigationAccountButton />
			</div>
		</div>
	</header>
</DesktopOnly>

<style lang="postcss">
	@import "./+Navigation.scss";
</style>
