import { adminRoute } from "./adminRoute";

export const adminPageRoute = {
	path: `${adminRoute.path}/page`,
	name: "page",
	label: "Page"
};

export const adminPageCreateRoute = {
	path: `${adminPageRoute.path}/create`,
	name: "page-create",
	label: "Page Create"
};

export const adminPageEditRoute = {
	path: `${adminPageRoute.path}/edit`,
	name: "page-edit",
	label: "Page Edit"
};
