/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				mukta: ["Mukta", "sans-serif"]
			},
			zIndex: {
				navigation: "100",
				"mobile-menu": "200",
				"cart-menu": "300"
			}
		}
	},
	plugins: []
};
