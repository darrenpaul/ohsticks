export const getRequestRegion = async () => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
