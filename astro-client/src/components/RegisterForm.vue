<template>
  <div class="flex flex-col">
    <input
      v-model="email"
      type="text"
      placeholder="email"
      class="mt-4"
      aria-label="Email"
    >
    <input
      v-model="password"
      type="text"
      placeholder="password"
      class="mt-4"
      aria-label="Password"
    >
    <div>
      <button
        class="mt-4 rounded border border-white p-2 text-white"
        @click="register"
      >
        Register
      </button>
      <button
        class="mt-4 ml-4 rounded border border-white p-2 text-white"
        @click="signInWithGoogle"
      >
        Sign In With Google
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

import { ADD_USER } from '../graphql/mutations/userMutations'

const email = ref('')
const password = ref('')

const { mutate: registerGQL } = useMutation(ADD_USER, () => ({
	variables: {
		email: email.value,
		password: password.value,
	},
}))

const register = async () => {
	const result = await registerGQL()
	const data = result?.data.register

	if (data.status === '200') {
		console.log('SUCCESS: ', data.message)
		window.localStorage.setItem('currentUser', data.currentUser)
		window.location.href = '/'
	} else {
		console.log('ERROR: ', data.message)
	}
}

const signInWithGoogle = () => {
	console.log(1)
}
</script>
