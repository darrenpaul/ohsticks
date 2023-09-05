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
	import { _ as trans } from "svelte-i18n";
	import CaretRightIcon from "$lib/components/icons/+CaretRightIcon.svelte";
	import { contactRoute } from "$lib/constants/routes/contactRoute";

	let scrollYPosition: number;
	let navigationFixed: boolean = false;

	let mobileMenuOpen: boolean = false;

	let links = [homeRoute, collectionAllRoute, contactRoute];
	let linksMobile = [homeRoute, collectionAllRoute, contactRoute];

	$: {
		// if (scrollYPosition > 80) {
		// 	navigationFixed = true;
		// } else {
		// 	navigationFixed = false;
		// }
		$page.url && (mobileMenuOpen = false);
	}
</script>

<svelte:window bind:scrollY={scrollYPosition} />

<MobileOnly>
	<header>
		<div class="--inner">
			<button on:click={() => (mobileMenuOpen = !mobileMenuOpen)}>
				<MenuClosedIcon />
			</button>

			<a href={homeRoute.path}>{$trans("site.brandName")}</a>

			<div class="--links">
				<NavigationCartButton />

				<NavigationAccountButton />
			</div>
		</div>

		{#if mobileMenuOpen}
			<div class="--mobile-menu">
				<div class="--header">
					<button on:click={() => (mobileMenuOpen = !mobileMenuOpen)} class="--menu-button">
						<MenuOpenIcon fill="fill-white" />{$trans("component.navigation.menu.label")}</button
					>
					<button class="--account-button">{$trans("component.navigation.account.label")}</button>
				</div>

				<div class="--links-mobile">
					{#each linksMobile as link}
						<a class="--link-mobile" href={link.path}>
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

<DesktopOnly>
	<header class={navigationFixed ? "fixed" : "block"}>
		<div class="--inner">
			<a href={homeRoute.path}>
				<h2>{$trans("site.brandName")}</h2>
			</a>

			<div class="--links">
				{#each links as link}
					<a class={$page.url.pathname === link.path ? "--active" : ""} href={link.path}>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="--links">
				<NavigationCartButton />

				<NavigationAccountButton />
			</div>
		</div>
	</header>
</DesktopOnly>

<style lang="scss">
	header {
		/* SIZE */
		@apply w-full h-20;
		/* MARGINS AND PADDING */
		@apply px-4;
		/* LAYOUT */
		@apply fixed top-0 left-0 z-navigation;
		/* BORDERS */
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply drop-shadow;

		.--inner {
			/* SIZE */
			@apply max-w-[1170px] h-full;
			/* MARGINS AND PADDING */
			@apply mx-auto;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--links {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-6;
			/* BORDERS */
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

		.--mobile-menu {
			/* SIZE */
			@apply w-screen h-screen;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply fixed top-0 left-0 z-mobile-menu;
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
