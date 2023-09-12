export type Product = {
	id: string;
	name: string;
	slug: string;
	categories: string[];
	description: string;
	contentSections: ContentSection[];
	price: number;
	quantity: number;
	visible: boolean;
	featureImage: Image;
	images: Image[];
	meta: meta;
	brand: string;
};

export type Image = {
	alt: string;
	src: string;
	width: number;
	height: number;
};

export type meta = {
	twitter: Twitter;
	keywords: string;
	description: string;
	title: string;
	openGraph: OpenGraph;
};

export type OpenGraph = {
	description: string;
	title: string;
	type: string;
	images: Image[];
};

export type Twitter = {
	image: string;
	site: string;
	description: string;
	title: string;
	card: string;
};

export type ContentSection = {
	subheading: string;
	content: string;
};

export type ProductCreate = {
	name: string;
	slug: string;
	categories: string[];
	description: string;
	contentSections: ContentSection[];
	purchasePrice: number;
	markupPercentage: number;
	price: number;
	quantity: number;
	visible: boolean;
	featureImage: string;
	images: Image[];
	meta: meta;
	brand: string;
};
