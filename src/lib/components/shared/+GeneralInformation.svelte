<script lang="ts">
	import QualityIcon from "$lib/components/icons/+QualityIcon.svelte";
	import ColorsIcon from "$lib/components/icons/+ColorsIcon.svelte";
	import EasyApplicationIcon from "$lib/components/icons/+EasyApplicationIcon.svelte";
	import CustomerSatisfactionIcon from "$lib/components/icons/+CustomerSatisfactionIcon.svelte";
	import { trans } from "$lib/locales/translateCopy";
</script>

<div class="general-information">
	<h2 class="--heading">{trans("component.generalInformation.whyChooseUs.label")}</h2>

	<div class="--list">
		<div class="--content">
			<div class="--icon">
				<QualityIcon />
			</div>

			<p class="--title">
				{trans("component.generalInformation.qualityAssurance.label")}
			</p>
			<p class="--description">
				{trans("component.generalInformation.qualityAssurance.description")}
			</p>
		</div>

		<div class="--content">
			<div class="--icon">
				<ColorsIcon />
			</div>

			<p class="--title">
				{trans("component.generalInformation.vibrantColors.label")}
			</p>
			<p class="--description">
				{trans("component.generalInformation.vibrantColors.description")}
			</p>
		</div>

		<div class="--content">
			<div class="--icon">
				<EasyApplicationIcon />
			</div>

			<p class="--title">
				{trans("component.generalInformation.easyApplication.label")}
			</p>
			<p class="--description">
				{trans("component.generalInformation.easyApplication.description")}
			</p>
		</div>

		<div class="--content">
			<div class="--icon">
				<CustomerSatisfactionIcon />
			</div>

			<p class="--title">
				{trans("component.generalInformation.customerSatisfaction.label")}
			</p>
			<p class="--description">
				{trans("component.generalInformation.customerSatisfaction.description")}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.general-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply px-4 sm:px-16;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		@apply text-center;
		/* ANIMATION AND EFFECTS */

		.--heading {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply my-16;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-3xl text-center font-bold;
			/* ANIMATION AND EFFECTS */
		}

		.--list {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid md:grid-cols-4 gap-8 md:gap-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-center;
			/* ANIMATION AND EFFECTS */

			.--content {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex-shrink-0 flex flex-col items-center;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-center;
				/* ANIMATION AND EFFECTS */

				.--icon {
					/* SIZE */
					/* MARGINS AND PADDING */
					@apply mb-8;
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}

				.--title {
					/* SIZE */
					/* MARGINS AND PADDING */
					@apply mb-2;
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					@apply font-bold text-xl;
					/* ANIMATION AND EFFECTS */
				}

				.--description {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					@apply text-sm;
					/* ANIMATION AND EFFECTS */
				}
			}
		}
	}
</style>
