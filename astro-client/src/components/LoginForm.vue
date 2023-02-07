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
        @click="login"
      >
        Login
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

import { LOGIN_USER } from '../graphql/mutations/userMutations'

const email = ref('')
const password = ref('')

const { mutate: loginGQL } = useMutation(LOGIN_USER, () => ({
	variables: {
		email: email.value,
		password: password.value,
	},
}))

const login = async () => {
	const result = await loginGQL()
	const data = result?.data.login

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
