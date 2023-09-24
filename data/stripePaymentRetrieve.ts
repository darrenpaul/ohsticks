// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = {
	id: "cs_test_b10gmMnf6wOogwDokgjhAVxMUV75xoEHs2CvrZGAgDjCgTmTPK8lrTcRlB",
	object: "checkout.session",
	after_expiration: null,
	allow_promotion_codes: null,
	amount_subtotal: 300,
	amount_total: 660,
	automatic_tax: { enabled: true, status: "complete" },
	billing_address_collection: null,
	cancel_url:
		"http://127.0.0.1:5173/checkout/processing?session_id={CHECKOUT_SESSION_ID}&order_id=f061fd1f-477f-46dc-9e33-d7e575356bfc&status=failed",
	client_reference_id: "f061fd1f-477f-46dc-9e33-d7e575356bfc",
	consent: null,
	consent_collection: null,
	created: 1695199084,
	currency: "eur",
	currency_conversion: null,
	custom_fields: [],
	custom_text: {
		shipping_address: null,
		submit: null,
		terms_of_service_acceptance: null
	},
	customer: "cus_OfhKp64dBWAZot",
	customer_creation: "always",
	customer_details: {
		address: {
			city: null,
			country: "AT",
			line1: null,
			line2: null,
			postal_code: null,
			state: null
		},
		email: "darrenpaul@duck.com",
		name: "Darren",
		phone: null,
		tax_exempt: "none",
		tax_ids: []
	},
	customer_email: "darrenpaul@duck.com",
	expires_at: 1695285483,
	invoice: null,
	invoice_creation: {
		enabled: false,
		invoice_data: {
			account_tax_ids: null,
			custom_fields: null,
			description: null,
			footer: null,
			metadata: {},
			rendering_options: null
		}
	},
	livemode: false,
	locale: null,
	metadata: {},
	mode: "payment",
	payment_intent: "pi_3NsLv6GQocPdnFnI1JyBP2JQ",
	payment_link: null,
	payment_method_collection: "always",
	payment_method_options: {},
	payment_method_types: ["card", "bancontact", "eps", "giropay", "ideal", "link"],
	payment_status: "paid",
	phone_number_collection: { enabled: false },
	recovered_from: null,
	setup_intent: null,
	shipping: null,
	shipping_address_collection: null,
	shipping_options: [
		{
			shipping_amount: 300,
			shipping_rate: "shr_1NnKHpGQocPdnFnIiXyE680L"
		}
	],
	shipping_rate: "shr_1NnKHpGQocPdnFnIiXyE680L",
	status: "complete",
	submit_type: null,
	subscription: null,
	success_url:
		"http://127.0.0.1:5173/checkout/processing?session_id={CHECKOUT_SESSION_ID}&order_id=f061fd1f-477f-46dc-9e33-d7e575356bfc&status=success",
	tax_id_collection: { enabled: true },
	total_details: { amount_discount: 0, amount_shipping: 300, amount_tax: 110 },
	url: null
};
