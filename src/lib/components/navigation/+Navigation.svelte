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
		<div class="--inner">
			<div class="--menu-button-wrapper">
				<button on:click={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Close mobile menu">
					<MenuClosedIcon />
				</button>
			</div>

			<div class="--branding">
				<a href={homeRoute.path} aria-label={`Go to ${homeRoute.label} page`}>
					<BrandIcon />
				</a>
			</div>

			<div class="--cart-account">
				<NavigationCartButton />

				<NavigationAccountButton />
			</div>
		</div>

		{#if mobileMenuOpen}
			<div class="--mobile-menu">
				<div class="--header">
					<button
						on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
						class="--menu-button"
						aria-label="Open mobile menu"
					>
						<MenuOpenIcon fill="fill-white" />{trans("component.navigation.menu.label")}
					</button>

					<button class="--account-button" aria-label="Open account page">
						{trans("component.navigation.account.label")}
					</button>
				</div>

				<div class="--links-mobile">
					{#each linksMobile as link}
						<a class="--link-mobile" href={link.path} aria-label={`Go to ${link.label} page`}>
							<div class="--link-mobile-inner">
								{link.label}

								<span class="--icon">
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
		<div class="--inner">
			<div class="--branding">
				<a href={homeRoute.path} aria-label={`Go to ${homeRoute.label} page`}>
					<BrandIcon />
				</a>
			</div>

			<div class="--links">
				{#each links as link}
					<a
						class={$page.url.pathname === link.path ? "--active" : ""}
						href={link.path}
						aria-label={`Go to ${link.label} page`}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="--cart-account">
				<NavigationCartButton />

				<NavigationAccountButton />
			</div>
		</div>
	</header>
</DesktopOnly>

<style lang="postcss">
	header {
		/* SIZE */
		@apply w-full h-20;
		/* MARGINS AND PADDING */
		@apply px-4;
		/* LAYOUT */
		@apply fixed top-4 left-0 z-navigation;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply drop-shadow;

		.--inner {
			/* SIZE */
			@apply max-w-[1170px] h-full;
			/* MARGINS AND PADDING */
			@apply mx-auto px-4 lg:px-0;
			/* LAYOUT */
			@apply flex justify-between items-center lg:grid grid-cols-3 place-items-center;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			@apply bg-white;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--branding {
			/* SIZE */
			@apply h-full;
			/* MARGINS AND PADDING */
			@apply px-0 lg:px-8;
			/* LAYOUT */
			@apply flex gap-6 self-center place-self-start items-center;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--links {
			/* SIZE */
			@apply h-full;
			/* MARGINS AND PADDING */
			@apply px-0 lg:px-8;
			/* LAYOUT */
			@apply flex gap-6 self-center place-self-center items-center;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--active {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply font-bold;
				/* ANIMATION AND EFFECTS */
			}
		}

		.--menu-button-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-6 self-center place-self-start;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--cart-account {
			/* SIZE */
			@apply h-full;
			/* MARGINS AND PADDING */
			@apply px-0 lg:px-8;
			/* LAYOUT */
			@apply flex gap-6 self-center place-self-end items-center;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--mobile-menu {
			/* SIZE */
			@apply w-screen h-screen;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply fixed -top-4 left-0 z-mobile-menu;
			/* BORDERS */
			/* COLORS */
			@apply bg-white;
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--header {
				/* SIZE */
				@apply w-full h-[58px];
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				.--menu-button {
					/* SIZE */
					@apply w-full;
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply flex items-center justify-center gap-4;
					/* BORDERS */
					@apply border-b border-black;
					/* COLORS */
					@apply bg-black text-white;
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}

				.--account-button {
					/* SIZE */
					@apply w-full;
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					@apply border-b border-gray-200;
					/* COLORS */
					@apply bg-white text-black;
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}

			.--links-mobile {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex flex-col gap-0;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				.--link-mobile {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					@apply border-b border-gray-200;
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */

					.--link-mobile-inner {
						/* SIZE */
						@apply h-[58px];
						/* MARGINS AND PADDING */
						@apply pl-4;
						/* LAYOUT */
						@apply flex flex-row items-center justify-between;
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						/* ANIMATION AND EFFECTS */

						.--icon {
							/* SIZE */
							@apply w-12 h-full;
							/* MARGINS AND PADDING */
							@apply py-4;
							/* LAYOUT */
							@apply grid place-items-center;
							/* BORDERS */
							@apply border-l border-gray-300;
							/* COLORS */
							/* TEXT */
							/* ANIMATION AND EFFECTS */
						}
					}
				}
			}
		}
	}
</style>
