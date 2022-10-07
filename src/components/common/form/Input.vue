<script setup lang="ts">
const text = "test";
</script>

<template>
  <input :value="text" @input="(event) => (text = event.target.value)" />
</template>

<style scoped></style>
