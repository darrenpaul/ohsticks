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
