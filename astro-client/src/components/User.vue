<template>
  <div class="flex">
    <p>
      {{ email }}
    </p>
    <button
      class="ml-4 rounded border border-white px-2"
      @click="handleSignOut"
    >
      Sign Out
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed, watch } from 'vue'

import { LOGOUT_USER } from '../graphql/mutations/userMutations'
import { GET_USER } from '../graphql/queries/userQueries'

const { result: queryUser } = useQuery(GET_USER)
const { mutate: logoutGQL } = useMutation(LOGOUT_USER)

const user = computed(() => queryUser.value?.getUser)
const email = computed(() => user.value?.email ?? '')

// Redirect to login page if user is not logged in
watch(user, (val) => {
	if (val?.status === '400') {
		window.location.href = '/login'
	}
})

const handleSignOut = async () => {
	const result = await logoutGQL()
	const data = result?.data.logout

	if (data.status === '200') {
		window.localStorage.removeItem('currentUser')
		window.location.href = '/login'
	}
}
</script>
