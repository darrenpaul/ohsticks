import { writable } from "svelte/store";

export const currency = writable("zar");

export const setCurrency = async () => {
	currency.set("eur");
};
