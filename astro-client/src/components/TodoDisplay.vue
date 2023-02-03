<template>
  <div>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      class="border border-solid rounded-md border-gray-600 p-2"
    />
    <button @click="addTodo" class="px-4 py-2 bg-gray-300 ml-4 rounded">
      Add
    </button>
    <button @click="getTodos" class="px-4 py-2 bg-gray-300 ml-4 rounded">
      Refresh
    </button>
  </div>
  <ul class="flex mt-4">
    <li
      v-for="todo in todos"
      :key="todo.id"
      class="p-4 bg-blue-300 mr-2 block rounded"
    >
      <input type="checkbox" v-model="todo.done" />
      <span class="ml-2">{{ todo.text }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { z } from "zod";
import axios from "axios";

// Vue var setup
const newTodo = ref("");
let todos: Ref<Todo[]> = ref([]);

// Schema and Types
const todoSchema = z.object({
  id: z.number(),
  text: z.string(),
  done: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

// Fetching Data
onMounted(async () => {
  getTodos();
});

// Validating Data
const setValidTodos = (datum: unknown[]) => {
  const validTodos: Todo[] = [];

  datum.forEach((data: unknown) => {
    const parse = todoSchema.safeParse(data);

    if (parse.success) {
      validTodos.push(parse.data);
    } else {
      parse.error.issues.forEach((issue) => {
        let message = issue.message;

        if (
          issue.message === "Required" &&
          issue.code === z.ZodIssueCode.invalid_type
        ) {
          message += ` ${issue.expected}`;
        }

        console.log(
          `Invalid Data Found: ${JSON.stringify(data)} - ${
            issue.code
          } - ${message}`
        );
      });
    }
  });
  return validTodos;
};

const getTodos = async () => {
  const response = await axios.get("http://localhost:4000/todos");
  const result = await response.data;
  todos.value = setValidTodos(result);
};

// Adding Data
const addTodo = async () => {
  const todo = {
    text: newTodo.value,
    done: false,
  };

  axios.post("http://localhost:4000/todos", todo);

  // TODO: Find a better way to refresh the data
  setTimeout(async () => {
    await getTodos();
  }, 10);

  newTodo.value = "";
};
</script>
