export const sumArrayNumbers = (numberArray: Array<number>, decimals = 2) => {
	return Number(numberArray.reduce((a, b) => a + b, 0)).toFixed(decimals);
};

export const calculateDiscountPrice = (
	price: number | string,
	discount: number | string,
	quantity: number | string
) => {
	const numberPrice = Number(price);
	const numberDiscount = Number(discount);
	const numberQuantity = Number(quantity);

	const priceWithDiscount = numberPrice - (numberPrice * numberDiscount) / 100;
	return Number(priceWithDiscount * numberQuantity).toFixed(2);
};
