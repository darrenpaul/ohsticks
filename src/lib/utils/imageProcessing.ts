import randomString from "$lib/utils/randomString";
import { slugString } from "$lib/utils/slugString";

const productStorageBucket = "product";

export const handleImageUpload = async (name: string, imageFile: File, supabase) => {
	const slug = slugString(name);
	const imageType = imageFile.type.split("/")[1];
	const imageName = `${slug}-${randomString(5, true)}.${imageType}`;

	const { data: uploadData } = await supabase.storage
		.from(productStorageBucket)
		.upload(`${name}/${imageName}`, imageFile, {
			cacheControl: "3600",
			upsert: false
		});
	const { data } = await supabase.storage.from(productStorageBucket).getPublicUrl(uploadData.path);

	return data.publicUrl;
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

export const deleteImages = async (name: string, supabase) => {
	const { data } = await supabase.storage.from(productStorageBucket).list(name, {
		limit: 100,
		offset: 0,
		sortBy: { column: "name", order: "asc" }
	});

	const images = data.map((image) => `${name}/${image.name}`);

	return await supabase.storage.from(productStorageBucket).remove(images);
};

export const deleteImagesByPath = async (imageBucket: string, imagePaths: string[], supabase) => {
	return await supabase.storage.from(imageBucket).remove(imagePaths);
};

const getIndexOfUrl = (url: string, index: number) => {
	// Split the URL by '/'
	const urlParts = url.split("/");

	// Filter out any empty strings from the split
	const filteredUrlParts = urlParts.filter((part) => part.length > 0);

	// Return the last item from the filtered URL parts
	return filteredUrlParts[filteredUrlParts.length - index];
};

export const getImageBucketFromUrl = (url: string) => {
	return getIndexOfUrl(url, 3);
};

export const getImageFolderFromUrl = (url: string) => {
	return getIndexOfUrl(url, 2);
};

export const getImageNameFromUrl = (url: string) => {
	return getIndexOfUrl(url, 1);
};
