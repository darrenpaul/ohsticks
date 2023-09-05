import { Country, State } from "country-state-city";

export const getStatesOfCountry = (countryCode: string) => {
	return State.getStatesOfCountry(countryCode);
};

export const southAfrica = {
	...Country.getCountryByCode("ZA")
};

export const austria = {
	...Country.getCountryByCode("AT")
};

export const shippingCountries = [austria, southAfrica];

export const shippingRate = 3.0;
