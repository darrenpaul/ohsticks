export default function slugString(str: string): string {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}
