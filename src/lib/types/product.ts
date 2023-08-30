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
};

export type Image = {
	alt: string;
	src: string;
};

export type meta = {
	title: string;
	description: string;
	keywords: string;
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
};
