interface Base {
	name: string;
	slug: string;
	categories: string[];
	description: string;
	contentSections: ContentSection[];
	discount: number;
	quantity: number;
	visible: boolean;
	featureImage: Image;
	images: Image[];
	meta: Meta;
	brand: string;
}

export interface Product extends Base {
	id: string;
	price: string;
	currency: string;
}

export interface NewProduct extends Base {
	currencyPrice: CurrencyPrice;
}

export interface UpdateProduct extends NewProduct {
	id: string;
}

interface SbBase {
	name: string;
	slug: string;
	categories: string[];
	description: string;
	content_sections: ContentSection[];
	discount: number;
	quantity: number;
	visible: boolean;
	feature_image: Image;
	images: Image[];
	print_image: Image;
	meta: Meta;
	brand: string;
}

export interface SbNewProduct extends SbBase {
	currency_price: CurrencyPrice;
}

export interface SbUpdateProduct extends SbNewProduct {
	updated_at: Date;
}

export interface SbProduct extends SbNewProduct {
	id: string;
	updated_at: Date;
	created_at: Date;
}

export type Image = {
	alt: string;
	src: string;
	width: number;
	height: number;
};

export type Meta = {
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
	image: Image;
	site: string;
	description: string;
	title: string;
	card: string;
};

export type ContentSection = {
	subheading: string;
	content: string;
};

export type CurrencyPrice = {
	[key: string]: Price;
};

export type Price = {
	currency: string;
	costOfGoods: number;
	markupPercentage: number;
	price: number;
};
