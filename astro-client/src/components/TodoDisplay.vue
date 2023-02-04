<template>
  <div>
    <input
      v-model="newTodo"
      class="rounded-md border border-solid border-zinc-600 p-2"
      @keyup.enter="addTodo"
    >
    <button
      class="ml-4 rounded bg-zinc-300 px-4 py-2"
      @click="addTodo"
    >
      Add
    </button>
    <button
      class="ml-4 rounded bg-zinc-300 px-4 py-2"
      @click="getTodos"
    >
      Refresh
    </button>
  </div>
  <ul class="mt-8 flex flex-col">
    <li
      v-for="todo in todos"
      :key="todo.id"
      class="mr-2 mt-2 flex justify-between rounded border border-solid border-zinc-500 bg-zinc-700 p-4"
    >
      <div>
        <input
          v-model="todo.done"
          type="checkbox"
          @change="updateTodo(todo)"
        >
        <input
          v-model="todo.text"
          class="ml-2 bg-transparent text-white"
          @change="updateTodo(todo)"
        >
      </div>
      <button
        class="ml-2 text-white"
        @click="removeTodo(todo)"
      >
        X
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import { z } from 'zod'
import axios from 'axios'

// Vue var setup
const newTodo = ref('')
let todos: Ref<Todo[]> = ref([])

// Schema and Types
const todoSchema = z.object({
	id: z.number(),
	text: z.string(),
	done: z.boolean(),
})

type Todo = z.infer<typeof todoSchema>

// Fetching Data
onMounted(async () => {
	getTodos()
})

// Validating Data
const setValidTodos = (datum: unknown[]) => {
	const validTodos: Todo[] = []

	datum.forEach((data: unknown) => {
		const parse = todoSchema.safeParse(data)

		if (parse.success) {
			validTodos.push(parse.data)
		} else {
			parse.error.issues.forEach((issue) => {
				let message = issue.message

				if (
					issue.message === 'Required' &&
					issue.code === z.ZodIssueCode.invalid_type
				) {
					message += ` ${issue.expected}`
				}

				console.log(
					`Invalid Data Found: ${JSON.stringify(data)} - ${
						issue.code
					} - ${message}`
				)
			})
		}
	})
	return validTodos
}

// Read Data
const getTodos = async () => {
	const response = await axios.get('http://localhost:4000/todos')
	const result = await response.data
	todos.value = setValidTodos(result)
}

// Creating Data
const addTodo = async () => {
	const todo = {
		text: newTodo.value,
		done: false,
	}

	await axios.post('http://localhost:4000/todos', todo)
	await getTodos()

	newTodo.value = ''
}

// Updating Data
const updateTodo = async (todo: Todo) => {
	await axios.put(`http://localhost:4000/todos/${todo.id}`, todo)
	await getTodos()
}

// Deleting Data
const removeTodo = async (todo: Todo) => {
	await axios.delete(`http://localhost:4000/todos/${todo.id}`)
	await getTodos()
}
</script>
