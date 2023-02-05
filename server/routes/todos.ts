import { deleteTodo, updateTodo } from './../firebase'
import express from 'express'
import { addTodo, getTodos } from '../firebase'
export const router = express.Router()

let todos: unknown[] = [
	{
		id: 0,
		title: 'Todo 1',
		done: false,
	},
	{
		id: 1,
		title: 'Todo 2',
		done: true,
	},
	// Invalid Todo
	// {
	//   id: 2,
	//   title: 3,
	// },
]

router.get('/', async (req, res) => {
	todos = await getTodos()
	res.json(todos).status(200)
})

router.post('/', async (req, res) => {
	await addTodo(req.body)
	todos = await getTodos()
	res.json(todos).status(200)
})

router
	.route('/:id')
	.put(async (req, res) => {
		// todos[todos.findIndex((todo) => todo.id === Number(req.params.id))] =
		// 	req.body

		await updateTodo(req.body, req.params.id)
		todos = await getTodos()
		res.json(todos).status(200)
	})
	.delete(async (req, res) => {
		// todos = todos.filter((todo) => {
		// 	return todo.id !== Number(req.params.id)
		// })
		await deleteTodo(req.params.id)
		todos = await getTodos()
		res.json(todos).status(200)
	})
