import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "$env/static/private";
import { adminAuth } from "$lib/server/firebaseAdminClient";
import { adminRole } from "$lib/constants/roles";
import { error, type HttpError } from "@sveltejs/kit";

const titleAndDescription = (searchPrompt: string) => {
	return [
		"Please ignore all previous instructions.",
		"Please respond only in the english language.",
		"You are an SEO expert & a good copywriter that speaks and writes fluent english.",
		"You have a Cheerful tone of voice.",
		"You have a Creative writing style.",
		"Do not self reference.",
		"Do not explain what you are doing.",
		"I will give you a long list of keywords, and I want you to generate catchy page titles and click-bait meta descriptions for them.",
		"The page titles should be between 70 and 80 characters.",
		"The meta descriptions should be between 140 and 160 characters.",
		"Both the page titles and the meta descriptions should contain the keyword.",
		'Please print this out in a markdown table with "keyword" as the first column with each item separated by a comma, "title" as the second and "description" as the third column.',
		'Please return the data as a json object with the key "data".',
		`Here are the keywords - "${searchPrompt}"`
	];
};

const eCommerceProduct = (searchPrompt: string) => {
	return [
		"Please ignore all previous instructions",
		"Please respond only in the english language",
		"You are an E-commerce SEO expert copywriter who writes product descriptions that compel users to purchase the products",
		"You have a Cheerful tone of voice",
		"You have a Creative writing style",
		"Do not self reference",
		"Do not explain what you are doing",
		"In this task, you will craft a compelling product description for an e-commerce item that I will provide",
		"Your goal is to create three unique content sections for the product description, each focusing on a different set of relevant keywords",
		"Be sure to label each section with an eye-catching subheading that accurately summarizes its content",
		"Your product description should be keyword-rich, informative, and engaging, with a word count of under 1000 words",
		"Your objective is to use emotional language and creative reasoning to persuade potential buyers to purchase the product",
		"Once you have written the product description, please create a bulleted list of 5 possible H1 headings for the product page",
		"Provide a bulleted list of 10 broad match keywords that you used to create the product description",
		"To further enhance the product page marketing appeal, create a persuasive and professional sounding meta title and description that incorporates similar language",
		"to that of the new product summary",
		"The meta title should be between 50 and 60 characters long",
		"The meta description should be between 140 to 150 characters long",
		`This is the e-commerce item - "${searchPrompt}"`,
		"Please format the data as a json format with camel case keys."
	];
};

const prompts = (searchPrompt: string) => {
	return [
		"Please ignore all previous instructions",
		"Please respond only in the english language.",
		"You are an E-commerce SEO expert copywriter who writes product descriptions that compel users to purchase the products.",
		"You have a Cheerful tone of voice. You have a Creative writing style. Do not self reference.",
		"Do not explain what you are doing.",
		" In this task, you will craft a compelling product description for an e-commerce item that I will provide.",
		"Your goal is to create three unique content sections for the product description, each focusing on a different set of relevant keywords.",
		"Be sure to label each section with an eye-catching subheading that accurately summarizes its content.",
		"Your product description should be keyword-rich, informative, and engaging, with a word count of under 1000 words.",
		"Your objective is to use emotional language and creative reasoning to persuade potential buyers to purchase the product.",
		"Once you have written the product description, please create a bulleted list of 5 possible H1 headings for the product page.",
		"Provide a bulleted list of 10 broad match keywords that you used to create the product description.",
		"To further enhance the product page marketing appeal, create a persuasive and professional sounding meta title and description that incorporates similar language to that of the new product summary.",
		"The meta title should be between 50 and 60 characters long.",
		"The meta description should be between 140 to 150 characters long.",
		`This is the e-commerce item - "${searchPrompt}"`
	];
};

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.role !== adminRole) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	} catch (errorResponse) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}

	const { searchPrompt } = await request.json();

	const content = eCommerceProduct(searchPrompt).join(" ");

	const openai = new OpenAI({
		apiKey: OPEN_AI_API_KEY
	});

	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: content }],
		model: "gpt-3.5-turbo"
	});

	// const placeholder = [
	// 	{
	// 		index: 0,
	// 		message: {
	// 			role: "assistant",
	// 			content:
	// 				'Eye-Catching Subheading: Sip Your Way to Purrfection with Our Cat Sipping Coffee Sticker\n\nSection 1: Add a Splash of Caffeine to Your Cat\'s Style\n\nAre you a coffee lover who can\'t resist cute feline charms? Look no further! Our Cat Sipping Coffee Sticker allows you to infuse your love for cats and coffee into your everyday life. This adorable vinyl sticker features a charming cat savoring its favorite brew, making it the purrfect addition to your laptop, water bottle, notebook, or any smooth surface that needs a touch of feline flair.\n\nCrafted with utmost attention to detail, our Cat Sipping Coffee Sticker boasts vibrant colors and intricate artwork. From the mischievous glint in the cat\'s eyes to the delicate steam rising from the cup, every element is designed to capture the essence of both cats and coffee. The high-quality vinyl material ensures its longevity, making this sticker a reliable companion for your daily adventures.\n\nSection 2: Express Your Love for Furry Mornings\n\nImagine starting your day with a cup of freshly brewed coffee, accompanied by this utterly adorable Cat Sipping Coffee Sticker. As you take your first sip, the beauty of this sticker shines through, reminding you of the joy your feline friend brings to your life. Its playful design adds a unique touch to your morning routine, infusing it with warmth, charm, and a dash of whiskered wonders.\n\nBeyond its aesthetic appeal, our Cat Sipping Coffee Sticker serves as a conversation starter, allowing you to connect with fellow cat and coffee enthusiasts. Whether you\'re working in a bustling coffee shop or attending a virtual meeting, this sticker will catch everyone\'s attention, leading to delightful conversations about the playful bond between cats and their hooman coffee companions.\n\nSection 3: A Purrfect Gift for Cat Lovers Everywhere\n\nLooking for a gift that will make someone\'s heart melt? Our Cat Sipping Coffee Sticker is the ultimate choice for cat lovers of all ages. It\'s a small yet meaningful gesture that combines two beloved elements in a minimalist and charming way. Surprise your friends, family, or colleagues with this sticker, and watch as their faces light up with joy.\n\nThanks to its versatile design, this sticker can be applied to various surfaces, making it a delightful accessory for laptops, water bottles, phone cases, and more. Each time the recipient catches a glimpse of their furry friend enjoying a cup of coffee, they\'ll be reminded of your thoughtfulness and the beauty of the unique bond between humans and cats.\n\nFive Possible H1 Headings for the Product Page:\n\n- "Savor the Magic: Cat Sipping Coffee Sticker"\n- "Add a Whisker of Charm: Cat Lover\'s Coffee Sticker"\n- "Express Your Feline Flair: Cat Sipping Coffee Sticker"\n- "Brew Some Cuteness: Cat Lover\'s Vinyl Sticker"\n- "Unleash the Pawsitivity: Cat Sipping Coffee Sticker"\n\nTen Broad Match Keywords:\n\n1. Cat sipping coffee sticker\n2. Feline-themed vinyl sticker\n3. Coffee lover\'s accessory\n4. Cute cat and coffee sticker\n5. Laptop decoration with cats\n6. Whimsical water bottle sticker\n7. Playful cat sticker design\n8. Gift for cat lovers\n9. Quirky and charming vinyl sticker\n10. Adhesive decal for cat enthusiasts\n\nPersuasive and Professional Meta Title (50-60 characters): "Cat Sipping Coffee Sticker: Whiskered Charm for Coffee Lovers"\n\nPersuasive and Professional Meta Description (140-150 characters): "Add purrfect charm to your belongings with our adorable Cat Sipping Coffee Sticker. Express your love for cats and coffee in style. Great gift for cat enthusiasts!"'
	// 		},
	// 		finish_reason: "stop"
	// 	}
	// ];
	// const placeholder = {
	// 	id: "chatcmpl-7tChQW6hOQSpj5pyxmAR2Iaw238Z7",
	// 	object: "chat.completion",
	// 	created: 1693391212,
	// 	model: "gpt-3.5-turbo-0613",
	// 	choices: [
	// 		{
	// 			index: 0,
	// 			message: {
	// 				role: "assistant",
	// 				content:
	// 					'| Keyword                | Title                            | Description                                    |\n|------------------------|----------------------------------|------------------------------------------------|\n| Vanilla Cupcake Sticker | "Sprinkle Joy with a Vanilla Cupcake Sticker" | "Add sweetness to your day with our delightful Vanilla Cupcake Sticker. Get yours now and spread some cheer!" |'
	// 			},
	// 			finish_reason: "stop"
	// 		}
	// 	],
	// 	usage: {
	// 		prompt_tokens: 179,
	// 		completion_tokens: 63,
	// 		total_tokens: 242
	// 	}
	// };

	// const placeholder = {
	// 	id: "chatcmpl-7tDn23i4U7SuCntRgiDw5wcjOuw1B",
	// 	object: "chat.completion",
	// 	created: 1693395404,
	// 	model: "gpt-3.5-turbo-0613",
	// 	choices: [
	// 		{
	// 			index: 0,
	// 			message: {
	// 				role: "assistant",
	// 				content:
	// 					'{\n  "data": [\n    {\n      "keyword": "Vanilla Cupcake Sticker",\n      "title": "Deliciously Sweet Vanilla Cupcake Stickers | Get Yours Now!",\n      "description": "Add a touch of sweetness to your belongings with our adorable Vanilla Cupcake Stickers. Perfect for cupcake lovers of all ages. Shop now!"\n    }\n  ]\n}'
	// 			},
	// 			finish_reason: "stop"
	// 		}
	// 	],
	// 	usage: {
	// 		prompt_tokens: 200,
	// 		completion_tokens: 78,
	// 		total_tokens: 278
	// 	}
	// };

	const placeholder = {
		id: "chatcmpl-7tELdASzyLtwcuSNGwr7nu6B5ybzm",
		object: "chat.completion",
		created: 1693397549,
		model: "gpt-3.5-turbo-0613",
		choices: [
			{
				index: 0,
				message: {
					role: "assistant",
					content:
						'{\n  "productDescription": "Cheer up your space with our Cartoon Vanilla Cupcake Sticker! This adorable sticker features a cute cartoon vanilla cupcake design that will make any room feel more vibrant and fun. With its high-quality adhesive, this sticker is easy to apply and remove without leaving any residue. Whether you want to decorate your laptop, phone case, or any other smooth surface, this sticker is perfect for adding a touch of sweetness to your everyday life.",\n  "contentSections": [\n    {\n      "subheading": "Sprinkle Some Fun Into Your Life",\n      "content": "Our Cartoon Vanilla Cupcake Sticker is the perfect way to add a pop of color and joy to your surroundings. The cute and whimsical design will instantly make you smile every time you see it. Whether you\'re a cupcake lover or want to add some sweetness to your day, this sticker is sure to bring a dash of fun to any space."\n    },\n    {\n      "subheading": "Easy Application and Removal",\n      "content": "Applying our Cartoon Vanilla Cupcake Sticker is a breeze! The high-quality adhesive ensures that the sticker stays securely in place, whether you\'re sticking it on your laptop, water bottle, or notebook. Want to change up your decor? No problem! This sticker is easily removable without leaving any sticky residue behind, so you can switch it out whenever you\'re ready for a new design."\n    },\n    {\n      "subheading": "High-Quality and Durable",\n      "content": "We take pride in the quality of our products, and the Cartoon Vanilla Cupcake Sticker is no exception. Made with durable materials, this sticker can withstand daily wear and tear, ensuring that your cupcake design stays vibrant and intact for a long time. Whether you\'re using it indoors or outdoors, you can trust that this sticker will hold up beautifully."\n    }\n  ],\n  "h1Headings": [\n    "Sprinkle Happiness with Our Cartoon Vanilla Cupcake Sticker",\n    "Express Your Sweet Side with Our Cartoon Vanilla Cupcake Sticker",\n    "Transform Any Space with Our Whimsical Cartoon Vanilla Cupcake Sticker",\n    "Add a Pop of Fun with Our Cute Cartoon Vanilla Cupcake Sticker",\n    "Decorate with Delight using Our Cartoon Vanilla Cupcake Sticker"\n  ],\n  "broadMatchKeywords": [\n    "cartoon vanilla cupcake sticker",\n    "cute cupcake design",\n    "high-quality adhesive sticker",\n    "easy to apply and remove",\n    "durable cupcake sticker",\n    "whimsical sticker design",\n    "sprinkle joy with sticker",\n    "vibrant cupcake decoration",\n    "fun and sweet sticker",\n    "decorate with happiness"\n  ],\n  "metaTitle": "Add Joy to Your Space with our Cartoon Vanilla Cupcake Sticker",\n  "metaDescription": "Sprinkle sweetness into your life with our high-quality adhesive Cartoon Vanilla Cupcake Sticker. Easy to apply and remove, this durable sticker will add a pop of fun to any surface.",\n  "jsonData": {\n    "productDescription": "Cheer up your space with our Cartoon Vanilla Cupcake Sticker! This adorable sticker features a cute cartoon vanilla cupcake design that will make any room feel more vibrant and fun. With its high-quality adhesive, this sticker is easy to apply and remove without leaving any residue. Whether you want to decorate your laptop, phone case, or any other smooth surface, this sticker is perfect for adding a touch of sweetness to your everyday life.",\n    "contentSections": [\n      {\n        "subheading": "Sprinkle Some Fun Into Your Life",\n        "content": "Our Cartoon Vanilla Cupcake Sticker is the perfect way to add a pop of color and joy to your surroundings. The cute and whimsical design will instantly make you smile every time you see it. Whether you\'re a cupcake lover or want to add some sweetness to your day, this sticker is sure to bring a dash of fun to any space."\n      },\n      {\n        "subheading": "Easy Application and Removal",\n        "content": "Applying our Cartoon Vanilla Cupcake Sticker is a breeze! The high-quality adhesive ensures that the sticker stays securely in place, whether you\'re sticking it on your laptop, water bottle, or notebook. Want to change up your decor? No problem! This sticker is easily removable without leaving any sticky residue behind, so you can switch it out whenever you\'re ready for a new design."\n      },\n      {\n        "subheading": "High-Quality and Durable",\n        "content": "We take pride in the quality of our products, and the Cartoon Vanilla Cupcake Sticker is no exception. Made with durable materials, this sticker can withstand daily wear and tear, ensuring that your cupcake design stays vibrant and intact for a long time. Whether you\'re using it indoors or outdoors, you can trust that this sticker will hold up beautifully."\n      }\n    ],\n    "h1Headings": [\n      "Sprinkle Happiness with Our Cartoon Vanilla Cupcake Sticker",\n      "Express Your Sweet Side with Our Cartoon Vanilla Cupcake Sticker",\n      "Transform Any Space with Our Whimsical Cartoon Vanilla Cupcake Sticker",\n      "Add a Pop of Fun with Our Cute Cartoon Vanilla Cupcake Sticker",\n      "Decorate with Delight using Our Cartoon Vanilla Cupcake Sticker"\n    ],\n    "broadMatchKeywords": [\n      "cartoon vanilla cupcake sticker",\n      "cute cupcake design",\n      "high-quality adhesive sticker",\n      "easy to apply and remove",\n      "durable cupcake sticker",\n      "whimsical sticker design",\n      "sprinkle joy with sticker",\n      "vibrant cupcake decoration",\n      "fun and sweet sticker",\n      "decorate with happiness"\n    ],\n    "metaTitle": "Add Joy to Your Space with our Cartoon Vanilla Cupcake Sticker",\n    "metaDescription": "Sprinkle sweetness into your life with our high-quality adhesive Cartoon Vanilla Cupcake Sticker. Easy to apply and remove, this durable sticker will add a pop of fun to any surface."\n  }\n}'
				},
				finish_reason: "stop"
			}
		],
		usage: {
			prompt_tokens: 294,
			completion_tokens: 1261,
			total_tokens: 1555
		}
	};

	return new Response(JSON.stringify(chatCompletion), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
