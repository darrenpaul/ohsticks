import enLocale from "$lib/locales/en.json";

interface Data {
	[key: string]: string | Data;
}

type Values = {
	[key: string]: string | number;
};

export const trans = (key: string, values: Values | null = null) => {
	const translation = findTranslation(key);
	if (!translation) return key;
	return fillInValues(translation, values);
};

const findTranslation = (keyString: string) => {
	const localeData = enLocale as Data;
	const keyPieces = keyString.split(".");

	return digForTranslation(keyPieces, localeData);
};

const digForTranslation = (keyPieces: string[], localeData: Data): string | undefined => {
	const key: string | undefined = keyPieces.shift();

	if (key === undefined) {
		// If there are no more keys to dig, return undefined.
		return undefined;
	}

	const nextLocaleData = localeData[key];

	if (typeof nextLocaleData === "string") {
		// If the nextLocaleData is a string, it's the final translation.
		return nextLocaleData;
	} else if (typeof nextLocaleData === "object" && nextLocaleData !== null) {
		// If nextLocaleData is an object, recursively dig deeper.
		return digForTranslation(keyPieces, nextLocaleData as Data);
	} else {
		// If nextLocaleData is neither a string nor an object, return undefined.
		return undefined;
	}
};

const fillInValues = (translation: string, values: Values | null) => {
	let filledInTranslation: string = translation;
	if (values) {
		Object.entries(values).forEach(([key, value]) => {
			const matchedValue: string | number = value;
			filledInTranslation = filledInTranslation.replace(`{${key}}`, matchedValue as string);
		});
	}
	return filledInTranslation;
};
