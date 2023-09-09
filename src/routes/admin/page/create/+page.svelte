<script lang="ts">
	import { user, productStorageBucket } from "$lib/firebase/firebaseClient";
	import { adminRole } from "$lib/constants/roles";
	import { deleteImage, uploadImage } from "$lib/firebase/firebaseImageUtils";
	import { slugString } from "$lib/utils/slugString";
	import firebaseAuthenticateRole from "$lib/firebase/firebaseAuthenticateRole";
	import { error } from "@sveltejs/kit";
	import { _ as trans } from "svelte-i18n";

	import PageCreateOpenGraph from "$lib/components/admin/product/+PageCreateOpenGraph.svelte";
	import PageCreateMeta from "$lib/components/admin/product/+PageCreateMeta.svelte";
	import PageCreateTwitter from "$lib/components/admin/product/+PageCreateTwitter.svelte";

	let name = "";
	let slug = "";
	let metaTitle = "";
	let metaDescription = "";
	let openGraphTitle = "";
	let openGraphDescription = "";
	let openGraphType = "";
	let openGraphImages = [];
	let twitterTitle = "";
	let twitterDescription = "";
	let twitterCard = "summary_large_image";
	let twitterImage = "";
	let twitterImageAlt = "";

	const handleFormSubmit = async () => {
		const accessToken = await $user?.getIdToken();
		if (!accessToken) {
			return error(401, "Unauthorized");
		}
		const { role } = await firebaseAuthenticateRole(accessToken);
		if (!role || role !== adminRole) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/admin/page", {
			method: "POST",
			headers: {
				"x-access-token": accessToken
			},
			body: JSON.stringify({
				name,
				slug,
				meta: {
					title: metaTitle,
					description: metaDescription,
					openGraph: {
						title: openGraphTitle,
						description: openGraphDescription,
						type: openGraphType,
						images: openGraphImages
					},
					twitter: {
						title: twitterTitle,
						description: twitterDescription,
						card: twitterCard,
						image: twitterImage,
						imageAlt: twitterImageAlt
					}
				}
			})
		});
		if (response.ok) {
			alert("Page created");
			return;
		}
	};
</script>

<p>Create Page</p>

<form class="page-form" on:submit|preventDefault={handleFormSubmit}>
	<!-- NAME -->
	<div class="input-group">
		<input
			class="peer"
			id="name"
			name="name"
			type="text"
			bind:value={name}
			placeholder=""
			required
		/>

		<label class="floating-label" for="name">{$trans("form.createPage.name.label")}</label>
	</div>

	<!-- SLUG -->
	<div class="input-group">
		<input
			class="peer"
			id="slug"
			name="slug"
			type="text"
			bind:value={slug}
			placeholder=""
			required
		/>

		<label class="floating-label" for="slug">{$trans("form.createPage.slug.label")}</label>
	</div>

	<PageCreateMeta bind:metaTitle bind:metaDescription />

	<PageCreateOpenGraph
		bind:openGraphTitle
		bind:openGraphDescription
		bind:openGraphType
		bind:openGraphImages
	/>

	<PageCreateTwitter
		bind:twitterTitle
		bind:twitterDescription
		bind:twitterCard
		bind:twitterImage
		bind:twitterImageAlt
	/>

	<button on:click|preventDefault={handleFormSubmit}>Create</button>
</form>

<style lang="scss">
	.page-form {
		/* SIZE */
		@apply w-96;
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		.input-group {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply relative flex flex-col;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		button {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			@apply p-2 mb-4;
			/* LAYOUT */
			/* BORDERS */
			@apply rounded;
			/* COLORS */
			@apply bg-black text-white;
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
