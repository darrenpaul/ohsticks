<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import StarIcon from "$lib/components/icons/+StarIcon.svelte";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";
	import type { Image, Product } from "$lib/types/product";

	export let product: Product;

	let rating: number = 5;
	let title: string;
	let content: string;

	const handleRatingChange = (value: number) => {
		rating = value;
	};

	const handleFormSubmit = async () => {
		console.log("apples");
		await fetch("/api/review", {
			method: "POST",
			body: JSON.stringify({
				productSlug: product.slug,
				review: {
					rating,
					title,
					content
				}
			})
		});
	};
</script>

<form class="product-review-form" on:submit|preventDefault={handleFormSubmit}>
	<div class="--header">
		<h1>{trans("form.review.title.label")}</h1>

		<p>{trans("form.review.description.label")}</p>
	</div>

	<div class="--stars">
		{#each Array.from({ length: 5 }) as _, index}
			<button on:click|preventDefault={() => handleRatingChange(index)}>
				<StarIcon width={48} height={48} isActive={index <= rating} />
			</button>
		{/each}
	</div>

	<!-- TITLE -->
	<div class="input-group">
		<input
			class={title ? "" : "peer"}
			type="text"
			id="title"
			name="title"
			bind:value={title}
			placeholder=""
			required
		/>
		<label class="floating-label" for="title">{trans("form.review.reviewTitle.label")}</label>
	</div>

	<!-- CONTENT -->
	<div class="input-group">
		<textarea
			class={content ? "" : "peer"}
			id="content"
			name="content"
			bind:value={content}
			required
		/>
		<label class="floating-label" for="content">{trans("form.review.reviewContent.label")}</label>
	</div>

	<div class="--button-wrapper">
		<button aria-label="Submit review button">
			<ButtonIcon>
				{trans("form.review.submit.label")}
			</ButtonIcon>
		</button>
	</div>
</form>

<style lang="postcss">
	.product-review-form {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-6;
			/* LAYOUT */
			@apply flex flex-col items-center gap-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-center;
		}

		.--stars {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-8;
			/* LAYOUT */
			@apply flex items-center justify-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--button-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex items-center justify-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
