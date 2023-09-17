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
	currency: string;
};

export type ProductResponse = {
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
	currencyPrice: CurrencyPrice;
	updatedAt: number;
	createdAt: number;
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
	currencyPrice: CurrencyPrice;
};

export type CurrencyPrice = {
	[key: string]: Price;
};

export type Price = {
	currency: string;
	purchasePrice: number;
	markupPercentage: number;
	price: number;
};

export const createProducts = (products: ProductResponse[], currency = "eur") => {
	const cleanProducts = products.map((product) => {
		const {
			id,
			name,
			slug,
			categories,
			description,
			content_sections: contentSections,
			quantity,
			visible,
			feature_image: featureImage,
			images,
			meta,
			brand,
			currency_price: currencyPrice
		} = product;

		const currencyPriceData = JSON.parse(currencyPrice);
		const productPrice = currencyPriceData[currency].price;

		const newProduct: Product = {
			id,
			name,
			slug,
			categories,
			description,
			contentSections: JSON.parse(contentSections),
			quantity,
			visible,
			featureImage: JSON.parse(featureImage),
			images: JSON.parse(images),
			meta: JSON.parse(meta),
			brand,
			price: productPrice,
			currency: currencyPriceData[currency].currency
		};
		return newProduct;
	});

	return cleanProducts;
};
