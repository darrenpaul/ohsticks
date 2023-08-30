/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				mukta: ["Mukta", "sans-serif"]
			},
			zIndex: {
				"cart-menu": "100"
			}
		}
	},
	plugins: []
};
