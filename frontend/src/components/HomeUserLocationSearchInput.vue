<template>
  <BaseInput v-model="searchInput" placeholder="Półwiejska, Poznań" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseInput from "./base/BaseInput.vue";

const searchInput = ref("");

watch(searchInput, () => {
  console.log(searchInput.value);
});
</script>
