<script lang="ts">
	import {
		adminPageCreateRoute,
		adminPageEditRoute
	} from "$lib/constants/routes/admin/adminPageRoute";
	import { user } from "$lib/firebase/firebaseClient";
	import type { Product } from "$lib/types/product";
	import { error } from "@sveltejs/kit";
	import { onMount } from "svelte";

	onMount(async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/admin/page", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": accessToken
			}
		});

		pages = await response.json();
	});

	export let pages = [];
</script>

<a href={adminPageCreateRoute.path}>{adminPageCreateRoute.label}</a>

<div>
	{#each pages as page}
		<a href={`${adminPageEditRoute.path}/${page.id}`}>{page.id} {page.name}</a>
	{/each}
</div>
