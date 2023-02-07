<template>
  <p>
    {{ email }}
  </p>
</template>

<script setup lang="ts">
const currentUser = JSON.parse(
	window.localStorage.getItem('currentUser') || '{}'
)
console.log(currentUser)
const email = currentUser.email
</script>
