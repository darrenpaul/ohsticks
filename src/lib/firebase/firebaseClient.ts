// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_MEASUREMENT_ID,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from "$env/static/public";
import { fetchGuestCart, fetchUserCart } from "$lib/stores/cartStore";
export const productStorageBucket = "product";

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID,
	measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const firebaseSignInWithEmailAndPassword = signInWithEmailAndPassword;

interface UserWithRole extends User {
	role: string;
}

/**
 * @returns a store with the current firebase user
 */
const userStore = () => {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn("Auth is not initialized or not in browser");

		const { subscribe } = writable<UserWithRole | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, async (user) => {
			const token = await user?.getIdToken();

			// If there is not user logged in set the store to null
			if (!token) {
				set(null);
				fetchGuestCart();
				return;
			}

			const roleResponse = await fetch("/api/user-role", {
				method: "POST",
				body: JSON.stringify({ accessToken: token })
			});
			const { role } = await roleResponse.json();

			const userWithRole = user as UserWithRole;
			userWithRole.role = role;

			set(userWithRole);

			fetchUserCart(token);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
};
export const user = userStore();

export const logoutUser = () => {
	signOut(auth);
};
