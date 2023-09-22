export default (length: number, onlyLowerCase = false, includeSymbols = false) => {
	let result = "";

	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

	const characterPool = includeSymbols ? characters + symbols : characters;
	const charactersLength = characterPool.length;
	for (let i = 0; i < length; i++) {
		result += characterPool.charAt(Math.floor(Math.random() * charactersLength));
	}

	if (onlyLowerCase === true) {
		return result.toLowerCase();
	}

	return result;
};
