import { findCountryCurrency } from "$lib/constants/shippingCountries.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, getClientAddress, cookies }) {
	const clientAddress = getClientAddress();
	console.log("load ~ clientAddress:", clientAddress);
	// const clientAddress = "185.108.105.72";

	const countryResponse = await fetch(`https://api.country.is/${clientAddress}`);
	const countryData = await countryResponse.json();
	const isoCode: string = countryData?.country || "AT";

	const currencyCode = findCountryCurrency(isoCode);

	const currency = currencyCode;

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
