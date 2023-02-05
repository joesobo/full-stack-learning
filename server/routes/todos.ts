import express from 'express'

import { addTodo, deleteTodo, getTodos, updateTodo } from '../db/todoCRUD'

export const router = express.Router()

router.get('/', async (req, res) => {
	const todos = await getTodos()
	res.json(todos).status(200)
})

router.post('/', async (req, res) => {
	await addTodo(req.body)
	const todos = await getTodos()
	res.json(todos).status(200)
})

router
	.route('/:id')
	.put(async (req, res) => {
		await updateTodo(req.body, req.params.id)
		const todos = await getTodos()
		res.json(todos).status(200)
	})
	.delete(async (req, res) => {
		await deleteTodo(req.params.id)
		const todos = await getTodos()
		res.json(todos).status(200)
	})
