import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import firebaseAdmin from 'firebase-admin';

try {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			projectId: 'ecommerce-test-14b66',
			clientEmail: 'firebase-adminsdk-78wzt@ecommerce-test-14b66.iam.gserviceaccount.com',
			privateKey:
				'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfTtcO+c80oVSU\nwqTA8LrX1ITZgWZ5blihesgpK9+YU3Fy1mOWwwxbaTCGUqZ2cmILahyEyThZAsC/\neFW5zmv+WhzvmkncW1nQ2FWadwYLUdMtcnFwQP+UDLQ6YUWutcze89S9pC0/TPsT\nAeYW7hCQVuNsctmiS4Ll9NgZhJdreFpiSGGW/iHK8J1VNU0swFrFfM2sY3qn/307\nUYPOdxkWTK9dbKT+lapFxMJlavTDRzay7Svfaw5uIr2aIGiV7HIaEd1NXGIn6jKi\nQ7zybRXoL6e7zPAsy7N3HL53GSORmEBgV06FuhS9xOaH5XkEEb0ns3/2U2YmJWV3\nO4fmv2LNAgMBAAECggEAEw/9Xstna0Q8XqiQ/OFv6b28C3822rXXPg2nqZATucKh\nxB5WCQgkdWcw276RdDoGcZgA0DsHIt4PyyiAFOjwohlaL//5PyTTMXdOM23mp6+3\n+cCzu1PpHV/KQNON6cCeOQgSiI/LxwQQyMoYNKvk4RVxu4/AUVDl3zB8BA2kCWnn\nX6hdlPh22vzlMif70JpFCK5CBlzB4/kjF494aKXc7URKgaaCDZEV4cwZ9QL0uNJw\nPiZnnw3dGxcQ7AKeYFwGDFV0AsT39eEHpz/3MohumrjGVc5uNs6fgWxzQdZRmlFP\nuvzSjui+XpPWAUxPbd+EK5M23C/kYDMe42nOJdkJ4QKBgQD4T6U8XFQS6UcW68x6\ngDiF2HG19yD2Kj19XMd/OkZU0WG6BJBmRGcEEFNvOYJHmMuISp5ILNMzozwU06rX\n1Ji4WxlXj4SY0n07fJkQRwwosuLd5HOdaaldu+zJ7kvy9AtQSeZjyapj3mhUeLiV\n3NhkNuTPlUEaT2OjrSOAbHCQPQKBgQDmOP7WASprtM6DUhZAckZ1XC3cNy4ko1Mq\n63C8wR0WN9IZP3aavuObQTn3q7foxwp+LFV9Pp36pKNwPHhuOxjQlhuUw2dSmHDD\nD3H1Vc2NfujBk/TP7P0G3O/QvM2sUbs+daQHI/d4thPPQZCQOqa7ncJ5Z2ujZR0u\nDeCWz8E10QKBgDS0Aug62IVjCfmtdqsRh+2wsQHkQBS/hmmTRayVW9Qo1Ms8qMFs\nB0lvhaX32NUFcz2sSMgc637sSJZLDtncf8WxYEGbbpNZKcd0fLBdxBDnVwutr3Rb\nttz0RB/f+jLI5ZXW+ZV4ejfUPuSe8t6sDynGFO6SSU0iSI228/AQFBwpAoGBAOKO\nIhGdMg6t7jAC3szq5/VkEelNEAaUBysMaHQHokUUB5g7AM+FnFxTUuUswh27idLi\nc/p9XV+jFwdDKsxnMaNKpLe/l3ULeKQsFdv1ZQOiaRDeNiNLtzBCyWjj845pG9d6\nU0GHnmfW3iWuAsI8RYoJ1LA+Gwm/XnjMxUAEEMGRAoGAHM2GpIh0zvymzYZJIAnX\nrQtBtjebjkGNzi+LGjAksQ2x4ggU6k1eV9pzy1xKcgGNvbgW64eGPzX58hgqDlhI\naCuKflyYp/DKdZEygk8V1xeUWB88ysBbxMdBWEadpWcXgTzds+W0ZhT1V8ox4KY/\nnAi/QD2Ru+HKdxv2gnpi3Pw=\n-----END PRIVATE KEY-----\n'
		}),
		storageBucket: 'ecommerce-test-14b66.appspot.com'
	});
} catch (err) {
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
