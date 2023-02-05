import * as dotenv from 'dotenv'
import { initializeApp } from 'firebase/app'
import {
	FieldValue,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	updateDoc,
} from 'firebase/firestore'
dotenv.config()

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: 'fullstack-learning-17322',
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getTodos = async () => {
	const todos: unknown[] = []
	const todosSnapshot = await getDocs(collection(db, 'todos'))
	todosSnapshot.forEach((doc) => {
		todos.push({ id: doc.id, ...doc.data() })
	})
	return todos
}

export const addTodo = async (todo: unknown) => {
	try {
		const docRef = await addDoc(collection(db, 'todos'), todo)
		console.log('Document written with ID: ', docRef.id)
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

export const updateTodo = async (
	todo: {
		[x: string]: FieldValue | Partial<unknown> | undefined
	},
	id: string
) => {
	await updateDoc(doc(db, 'todos', id), todo)
}

export const deleteTodo = async (id: string) => {
	await deleteDoc(doc(db, 'todos', id))
}
