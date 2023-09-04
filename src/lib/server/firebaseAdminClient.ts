import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import firebaseAdmin from "firebase-admin";
import { PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_STORAGE_BUCKET } from "$env/static/public";
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } from "$env/static/private";

try {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			projectId: PUBLIC_FIREBASE_PROJECT_ID,
			clientEmail: FIREBASE_CLIENT_EMAIL,
			privateKey: FIREBASE_PRIVATE_KEY
		}),
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET
	});
} catch (err) {
	if (!/already exists/u.test(err.message)) {
		console.error("Firebase Admin Error: ", err.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
