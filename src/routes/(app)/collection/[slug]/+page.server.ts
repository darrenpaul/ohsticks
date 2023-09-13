import { findCountryCurrency } from "$lib/constants/shippingCountries";
import type { Product } from "$lib/types/product";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, cookies, getClientAddress }) {
	const slug = params.slug;

	const clientAddress = getClientAddress();
	console.log("load ~ clientAddress:", clientAddress);
	// const clientAddress = "185.108.105.72";

	let currency = cookies.get("currency");

	if (!currency) {
		const countryResponse = await fetch(`https://api.country.is/${clientAddress}`);
		const countryData = await countryResponse.json();
		const isoCode: string = countryData?.country || "AT";
		const currencyCode = findCountryCurrency(isoCode);
		currency = currencyCode;
		cookies.set("currency", currencyCode);
		currency = currencyCode;
	}

	const queries = [{ key: "currency", value: currency }];
	const queryString = queries.map((query) => `${query.key}=${query.value}`).join("&");
	const url = `/api/product?${queryString}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const products = await response.json();
	const filteredProducts = products.filter(
		(product: Product) => slug === "all" || product.categories.includes(slug)
	);

	const pageResponse = await fetch("/api/page", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const pageData = await pageResponse.json();

	if (products.length === 0) {
		return {
			status: 404,
			body: {
				message: "Product not found"
			}
		};
	}

	return {
		status: 200,
		body: { products: filteredProducts, pageData }
	};
}
