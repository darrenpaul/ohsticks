export const sumArrayNumbers = (numberArray: Array<number>) => {
	return numberArray.reduce((a, b) => a + b, 0);
};

export const calculateDiscountPrice = (price: number, discount: number) => {
	return price - (price * discount || 0) / 100;
};
