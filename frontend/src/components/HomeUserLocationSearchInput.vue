<template>
  <BaseInput v-model="searchInput" placeholder="Półwiejska, Poznań" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "./base/BaseInput.vue";
import { watchDebounced } from "@vueuse/core";

const searchInput = ref("");

const emit = defineEmits(["input"]);

watchDebounced(
  searchInput,
  () => {
    emit("input", searchInput.value);
  },
  { debounce: 1000 }
);
</script>
