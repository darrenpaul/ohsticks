import { findCountryCurrency } from "$lib/constants/shippingCountries.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, getClientAddress, cookies }) {
	const clientAddress = getClientAddress();
	// const clientAddress = "185.108.105.72";
	let currency = cookies.get("currency");

	if (!currency) {
		console.log("load ~ currency:", currency);
		const countryResponse = await fetch(`https://api.country.is/${clientAddress}`);
		const { countryData } = await countryResponse.json();
		const isoCode: string = countryData?.isoCode || "AT";

		const currencyCode = findCountryCurrency(isoCode);
		console.log("load ~ countryData:", isoCode);
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
