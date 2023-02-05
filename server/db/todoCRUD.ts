import {
	FieldValue,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore'

import { db } from './firebase'

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