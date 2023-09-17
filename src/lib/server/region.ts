import { findCountryCurrency } from "$lib/constants/shippingCountries";
import type { Cookies } from "@sveltejs/kit";

const countryUrl = "https://api.country.is";

export const getRegionCurrency = async (clientAddress: string, cookies: Cookies) => {
	if (clientAddress === "127.0.0.1") {
		return "eur";
	}

	let currency = cookies.get("currency");

	if (currency) {
		return currency;
	}

	// TODO: move to method and add expire date to cookie
	const countryResponse = await fetch(`${countryUrl}/${clientAddress}`);
	const countryData = await countryResponse.json();
	const isoCode: string = countryData?.country || "AT";
	const currencyCode = findCountryCurrency(isoCode);
	currency = currencyCode;
	cookies.set("currency", currencyCode);
	return currencyCode;
};
