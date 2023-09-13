import { findCountryCurrency } from "$lib/constants/shippingCountries.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, getClientAddress, cookies }) {
	const clientAddress = getClientAddress();
	console.log("load ~ clientAddress:", clientAddress);
	// const clientAddress = "185.108.105.72";

	let currency = cookies.get("currency");

	// TODO: move to method and add expire date to cookie
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

	const productResponse = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const products = await productResponse.json();

	const pageResponse = await fetch("/api/page", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const pageData = await pageResponse.json();

	return {
		products,
		pageData
	};
}

export const prerender = true;
