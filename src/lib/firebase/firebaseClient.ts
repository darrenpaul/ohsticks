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
import { writable, derived, get } from "svelte/store";

export const productStorageBucket = "product";

const firebaseConfig = {
	apiKey: "AIzaSyCkLf1J0EyimgsXAeLtR2gvNkib8HawPoU",
	authDomain: "ecommerce-test-14b66.firebaseapp.com",
	projectId: "ecommerce-test-14b66",
	storageBucket: "ecommerce-test-14b66.appspot.com",
	messagingSenderId: "364179887226",
	appId: "1:364179887226:web:d20c114fcf4546b24917c3",
	measurementId: "G-Y6TXJ9VR31"
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
			if (!token) {
				set(null);
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
