export type CartItem = {
	id: string;
	name: string;
	price: string;
	quantity: number;
	image: string;
};

export type Cart = {
	id: string;
	cartItems: CartItem[];
};

export type CartResponse = {
	id: string;
	cartItems: Cart[];
	expiration: { seconds: number };
};
