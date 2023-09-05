export default (length: number, onlyLowerCase: boolean) => {
	let result = "";

	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	if (onlyLowerCase === true) {
		return result.toLowerCase();
	}

	return result;
};
