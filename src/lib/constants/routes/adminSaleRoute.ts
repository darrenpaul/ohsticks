import { adminRoute } from "./adminRoute";

export const adminSaleRoute = {
	path: `${adminRoute.path}/sale`,
	name: "sale",
	label: "Sale"
};

export const adminSaleCreateRoute = {
	path: `${adminRoute.path}/sale/create`,
	name: "sale-create",
	label: "Sale Create"
};
