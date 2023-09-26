export const dashboardRoute = {
	path: `/dashboard`,
	name: "dashboard",
	label: "Dashboard"
};

export const dashboardAccountRoute = {
	path: `${dashboardRoute.path}/account`,
	name: "dashboard-account",
	label: "Account"
};

export const dashboardAccountOrdersRoute = {
	path: `${dashboardRoute.path}/orders`,
	name: "dashboard-orders",
	label: "Orders"
};

export const dashboardAccountOrderRoute = {
	path: `${dashboardRoute.path}/order`,
	name: "dashboard-order",
	label: "Account Order"
};
