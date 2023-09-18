// import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "$lib/firebase/firebaseClient";

type UploadImageProps = {
	bucketName: string;
	collectionName: string;
	imageName: string;
	imageFile: File;
};

export const uploadImage = async ({
	bucketName,
	collectionName,
	imageName,
	imageFile
}: UploadImageProps) => {
	// const storagePath = `${bucketName}/${collectionName}/${imageName}`;
	// const reference = ref(storage, storagePath);
	// const snapshot = await uploadBytes(reference, imageFile);
	// return await getDownloadURL(snapshot.ref);
	return "";
};

export const deleteImage = async (imagePath: string) => {
	// const imageRef = ref(storage, imagePath);
	// await deleteObject(imageRef);
};
