<template>
  <BaseInput v-model="searchInput" />
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { ref } from "vue";
import BaseInput from "./base/BaseInput.vue";
import { useCourtsStore } from "@/stores/courts";

const courtsStore = useCourtsStore();

const searchInput = ref("");

watchDebounced(
  searchInput,
  (newSearchInput) => {
    courtsStore.fetchCourtsByName(newSearchInput);
  },
  { debounce: 300 }
);
</script>
