export type Product = {
	id: string;
	name: string;
	slug: string;
	categories: string[];
	description: string;
	price: number;
	quantity: number;
	visible: boolean;
	featureImage: string;
	images: Image[];
};

export type Image = {
	alt: string;
	src: string;
};

export type ProductCreate = {
	name: string;
	slug: string;
	categories: string[];
	description: string;
	purchasePrice: number;
	markupPercentage: number;
	price: number;
	quantity: number;
	visible: boolean;
	featureImage: string;
	images: Image[];
};
