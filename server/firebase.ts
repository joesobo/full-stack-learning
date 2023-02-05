import { initializeApp } from 'firebase/app'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	updateDoc,
} from 'firebase/firestore'
import * as dotenv from 'dotenv'
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
		todos.push({ id: todos.length + 1, ...doc.data() })
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

export const updateTodo = async (todo: unknown) => {
	await updateDoc(doc(db, 'todos', ''), { todo })
}

export const deleteTodo = async (id: string) => {
	await deleteDoc(doc(db, 'todos', id))
}
