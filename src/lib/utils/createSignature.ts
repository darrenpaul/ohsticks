import CryptoJS from "crypto-js";

export default (payloadString: string, signingKey: string) => {
	const hash = CryptoJS.SHA256(payloadString, "Key");
	return hash.toString(CryptoJS.enc.Base64);
};
