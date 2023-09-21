import { adminRoute } from "./adminRoute";

export const adminOrderRoute = {
	path: `${adminRoute.path}/order`,
	name: "order",
	label: "Order"
};

export const adminOrderCreateRoute = {
	path: `${adminOrderRoute.path}/create`,
	name: "order-create",
	label: "order Create"
};
