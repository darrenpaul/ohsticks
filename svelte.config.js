import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: vitePreprocess({
		postcss: true,
		preserve: ["ld+json"]
	})
};

export default config;
