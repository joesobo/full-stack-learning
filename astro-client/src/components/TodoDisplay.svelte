<script lang="ts">
	import { mutation, query, setClient } from 'svelte-apollo'

	import {
		ADD_TODO,
		DELETE_TODO,
		UPDATE_TODO,
	} from '../graphql/mutations/todoMutations'
	import { GET_TODOS } from '../graphql/queries/todoQueries'
	import { apolloClient } from '../utils/apolloClient'
	import { pickTextColorBasedOnBgColorAdvanced } from '../utils/colorPicker'
	import type { Todo } from '../utils/todoTypes'
	import { todoInputSchema, todoSchema } from '../utils/todoTypes'

	setClient(apolloClient)

	let todos: Todo[] = []

	let todoTitle = ''
	let todoDescription = ''
	let todoColor = '#000'
	let todoChecked = false
	let error = ''

	$: {
		const todo = {
			title: todoTitle,
			description: todoDescription,
			completed: todoChecked,
			color: todoColor,
		}

		// Validate Data
		const parse = todoSchema.safeParse(todo)

		if (parse.success) {
			error = ''
		} else {
			const issue = parse.error.issues[0]

			if (
				issue?.code === 'too_small' ||
				issue?.code === 'too_big' ||
				issue?.code === 'invalid_string'
			) {
				error = `${issue.path[0]}: ${issue.message}`
			} else {
				error = JSON.stringify(parse.error.issues[0])
			}
		}
	}

	const queryTodos = query(GET_TODOS)
	queryTodos.subscribe((result) => {
		if (result.data) {
			const data = result.data as { todosGQL: unknown[] }
			todos = setValidTodos(data.todosGQL)
		}
	})

	const addTodoGQL = mutation(ADD_TODO)
	const deleteTodoGQL = mutation(DELETE_TODO)
	const updateTodoGQL = mutation(UPDATE_TODO)

	const addTodo = async () => {
		if (error === '') {
			await addTodoGQL({
				variables: {
					title: todoTitle,
					description: todoDescription,
					color: todoColor,
					completed: todoChecked,
				},
				refetchQueries: [{ query: GET_TODOS }, 'getTodosGQL'],
			})
		}
	}

	const updateTodo = async (todo: Todo) => {
		await updateTodoGQL({
			variables: {
				id: todo.id,
				title: todo.title,
				description: todo.description,
				color: todo.color,
				completed: todo.completed,
			},
		})
	}

	const removeTodo = async (todo: Todo) => {
		await deleteTodoGQL({
			variables: {
				id: todo.id,
			},
			update: (cache) => {
				const data = cache.readQuery({ query: GET_TODOS }) as {
					todosGQL: Todo[]
				}
				const updatedData = data.todosGQL.filter((w) => w.id !== todo.id)
				cache.writeQuery({ query: GET_TODOS, data: { todosGQL: updatedData } })
			},
		})
	}

	const resetForm = () => {
		todoTitle = ''
		todoDescription = ''
		todoChecked = false
		todoColor = '#000'

		error = ''
	}

	// Validating Data (only return data that matches our zod schema)
	const setValidTodos = (datum: unknown[]) => {
		if (!datum) return []

		const validTodos: Todo[] = []

		datum.forEach((data: unknown) => {
			const parse = todoInputSchema.safeParse(data)

			if (parse.success) {
				validTodos.push({ ...parse.data, color: parse.data.color || '#000' })
			} else {
				parse.error.issues.forEach((issue) => {
					console.log(issue)
				})
			}
		})
		return validTodos
	}
</script>

<div class="flex flex-col">
	<div class="flex">
		<!-- Name -->
		<input
			bind:value={todoTitle}
			class="w-full rounded-md border border-solid border-zinc-600 p-2"
			aria-label="New Todo Title"
			placeholder="Todo Title"
		/>
		<!-- Color -->
		<input
			bind:value={todoColor}
			class="ml-2 h-10 w-10 rounded border-4 border-solid border-white"
			type="color"
			aria-label="New Todo Color"
		/>
		<!-- Todo State -->
		<input
			bind:value={todoChecked}
			class="ml-2 w-6"
			type="checkbox"
			aria-label="New Todo Checkbox"
		/>
	</div>
	<!-- Description -->
	<textarea
		bind:value={todoDescription}
		class="mt-2 rounded-md p-2"
		placeholder="Add a description"
		aria-label="New Todo Description"
	/>
	{#if error !== ''}
		<p class="mt-2 font-bold text-red-500">{error}</p>
	{/if}
	<div class="mt-2 flex">
		<button class="rounded bg-zinc-300 px-4 py-2" on:click={addTodo}>
			Add
		</button>
		<button class="ml-2 rounded bg-zinc-300 px-4 py-2" on:click={resetForm}>
			Clear
		</button>
	</div>

	<!-- Display -->
	<ul class="mt-8 flex flex-col">
		{#each todos as todo}
			<li
				class={'mr-2 mt-2 flex flex-col rounded border border-solid border-zinc-500 p-4 ' +
					pickTextColorBasedOnBgColorAdvanced(
						todo.color,
						'text-white',
						'text-black'
					)}
				style:background-color={todo.color}
			>
				<div class="flex justify-between">
					<div class="flex">
						<input
							bind:value={todo.completed}
							type="checkbox"
							aria-label="Todo Checkbox"
							on:change={() => updateTodo(todo)}
						/>
						<input
							bind:value={todo.title}
							class="ml-2 bg-transparent"
							aria-label="Todo Title"
							on:change={() => updateTodo(todo)}
						/>
					</div>
					<button class="ml-2" on:click={() => removeTodo(todo)}>X</button>
				</div>

				<div>
					<input
						bind:value={todo.description}
						class={'mt-2 bg-transparent text-sm ' +
							pickTextColorBasedOnBgColorAdvanced(
								todo.color,
								'text-gray-300',
								'text-gray-700'
							)}
						aria-label="Todo Description"
						on:change={() => updateTodo(todo)}
					/>
				</div>
			</li>
		{/each}
	</ul>
</div>
