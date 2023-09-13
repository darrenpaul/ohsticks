export default (value: number | string, currencyISO = "eur") => {
	const valueNumber = Number(value);

	let currencyFormatter = Intl.NumberFormat("en-DE", {
		style: "currency",
		currency: "EUR"
	});

	if (currencyISO === "eur") {
		currencyFormatter = Intl.NumberFormat("en-DE", {
			style: "currency",
			currency: "EUR"
		});
	}

	if (currencyISO === "gbp") {
		currencyFormatter = Intl.NumberFormat("en-GB", {
			style: "currency",
			currency: "GBP"
		});
	}

	if (currencyISO === "usd") {
		currencyFormatter = Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD"
		});
	}

	if (currencyISO === "zar") {
		currencyFormatter = Intl.NumberFormat("en-ZA", {
			style: "currency",
			currency: "ZAR"
		});
	}

	return currencyFormatter.format(valueNumber);
};
