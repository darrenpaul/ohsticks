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
