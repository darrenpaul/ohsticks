export const slugString = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "");
};

export const normalizeSlugString = (str: string): string => {
	return str.toLowerCase().replaceAll("-", " ");
};
