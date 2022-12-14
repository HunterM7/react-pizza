import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD2J1UwGVNXlQhfhHSAEhVpEawgw7hqe90',
	authDomain: 'pizzashophunterm7.firebaseapp.com',
	databaseURL:
		'https://pizzashophunterm7-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'pizzashophunterm7',
	storageBucket: 'pizzashophunterm7.appspot.com',
	messagingSenderId: '649588048276',
	appId: '1:649588048276:web:7b16211aeb0d9856680f81',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const database = getFirestore(firebaseApp)
