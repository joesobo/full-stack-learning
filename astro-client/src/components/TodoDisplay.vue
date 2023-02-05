<template>
  <!-- Form -->
  <data class="flex flex-col">
    <div class="flex">
      <!-- Name -->
      <input
        v-model="todoTitle"
        class="w-full rounded-md border border-solid border-zinc-600 p-2"
        aria-label="New Todo Title"
        placeholder="Todo Title"
      >
      <!-- Color -->
      <input
        v-model="todoColor"
        class="ml-2 h-10 w-10 rounded border-4 border-solid border-white"
        type="color"
        aria-label="New Todo Color"
      >
      <!-- Todo State -->
      <input
        v-model="todoChecked"
        class="ml-2 w-6"
        type="checkbox"
        aria-label="New Todo Checkbox"
      >
    </div>
    <!-- Description -->
    <textarea
      v-model="todoDescription"
      class="mt-2 rounded-md p-2"
      placeholder="Add a description"
      aria-label="New Todo Description"
    />
    <p
      v-if="error"
      class="mt-2 font-bold text-red-500"
    >{{ error }}</p>
    <div class="mt-2 flex">
      <button
        class="rounded bg-zinc-300 px-4 py-2"
        @click="addTodo"
      >
        Add
      </button>
      <button
        class="ml-2 rounded bg-zinc-300 px-4 py-2"
        @click="resetForm"
      >
        Clear
      </button>
    </div>

    <!-- Display -->
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
            aria-label="Todo Checkbox"
            @change="updateTodo(todo)"
          >
          <input
            v-model="todo.title"
            class="ml-2 bg-transparent text-white"
            aria-label="Todo Title"
            @change="updateTodo(todo)"
          >
        </div>
        <button
          class="ml-2 text-white"
          @click="removeTodo(todo)"
        >X</button>
      </li>
    </ul>
  </data>
</template>

<script setup lang="ts">
import axios from 'axios'
import { Ref, onMounted, ref, watch } from 'vue'

import { Todo, todoInputSchema, todoSchema } from './todoTypes'

// Vue var setup
const todoTitle = ref('')
const todoDescription = ref('')
const todoColor = ref('#fff')
const todoChecked = ref(false)
const error: Ref<string | undefined> = ref(undefined)
const todos: Ref<Todo[]> = ref([])

// Fetching Data
onMounted(async () => {
	await getTodos()
})

// Validate Input
watch([todoTitle, todoDescription, todoChecked, todoColor], () => {
	const todo = {
		title: todoTitle.value,
		description: todoDescription.value,
		done: todoChecked.value,
		color: todoColor.value,
	}

	// Validate Data
	const parse = todoSchema.safeParse(todo)

	if (parse.success) {
		error.value = undefined
	} else {
		const issue = parse.error.issues[0]
		console.log(issue)

		if (
			issue?.code === 'too_small' ||
			issue?.code === 'too_big' ||
			issue?.code === 'invalid_string'
		) {
			error.value = `${issue.path[0]}: ${issue.message}`
			return
		}

		error.value = JSON.stringify(parse.error.issues[0])
	}
})

// Validating Data (only return data that matches our zod schema)
const setValidTodos = (datum: unknown[]) => {
	const validTodos: Todo[] = []

	datum.forEach((data: unknown) => {
		const parse = todoInputSchema.safeParse(data)

		if (parse.success) {
			validTodos.push(parse.data)
		} else {
			parse.error.issues.forEach((issue) => {
				console.log(issue)
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
		title: todoTitle.value,
		description: todoDescription.value,
		done: todoChecked.value,
		color: todoColor.value,
	}

	if (!error.value) {
		const response = await axios.post('http://localhost:4000/todos', todo)
		const result = await response.data
		todos.value = setValidTodos(result)

		// Reset Form
		resetForm()
	}
}

// Updating Data
const updateTodo = async (todo: Todo) => {
	const response = await axios.put(`http://localhost:4000/todos/${todo.id}`, todo)
	const result = await response.data
	todos.value = setValidTodos(result)
}

// Deleting Data
const removeTodo = async (todo: Todo) => {
	const response = await axios.delete(`http://localhost:4000/todos/${todo.id}`)
	const result = await response.data
	todos.value = setValidTodos(result)
}

// Reset Form
const resetForm = () => {
	todoTitle.value = ''
	todoDescription.value = ''
	todoChecked.value = false
	todoColor.value = '#fff'

	error.value = undefined
}
</script>
