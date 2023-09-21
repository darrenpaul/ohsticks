import { adminRoute } from "./adminRoute";

export const adminProductRoute = {
	path: `${adminRoute.path}/product`,
	name: "product",
	label: "Product"
};

export const adminProductCreateRoute = {
	path: `${adminProductRoute.path}/create`,
	name: "product-create",
	label: "Product Create"
};

export const adminProductEditRoute = {
	path: `${adminProductRoute.path}/edit`,
	name: "product-edit",
	label: "Product Edit"
};
