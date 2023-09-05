export const loginRoute = {
	path: `/login`,
	name: "login",
	label: "Login"
};

export const registerRoute = {
	path: `/register`,
	name: "register",
	label: "Register"
};

export const forgotPasswordRoute = {
	path: `/forgot-password`,
	name: "forgot-password",
	label: "Forgot Password"
};

export const accountRoute = {
	path: `/account`,
	name: "account",
	label: "Account"
};

export const accountOrderRoute = {
	path: `${accountRoute.path}/order`,
	name: "account-order",
	label: "Account Order"
};
