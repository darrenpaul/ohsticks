/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			zIndex: {
				"cart-menu": "100"
			}
		}
	},
	plugins: []
};
