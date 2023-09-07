import { productStorageBucket } from "$lib/firebase/firebaseClient";
import randomString from "$lib/utils/randomString";
import { uploadImage } from "$lib/firebase/firebaseImageUtils";
import { slugString } from "$lib/utils/slugString";

export const handleImageUpload = async (name: string, imageFile: File) => {
	const slug = slugString(name);
	const imageType = imageFile.type.split("/")[1];
	const imageName = `${slug}-${randomString(5, true)}.${imageType}`;

	return await uploadImage({
		bucketName: productStorageBucket,
		collectionName: slug,
		imageName,
		imageFile: imageFile
	});
};

export const getImageMeta = async (url: string) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve({ src: img.src, width: img.width, height: img.height });
		img.onerror = () => reject();
		img.src = url;
	});
	const img = new Image();
	img.src = url;
	// Wait for the image to load
	img.onload = () => {
		// Get the width and height of the image
		const width = img.width;
		const height = img.height;

		return { width, height };
	};
};
