<template>
  <BaseToggle v-model="isChecked" />
</template>

<script setup lang="ts">
import BaseToggle from "@/components/base/BaseToggle.vue";
import useTheme from "@/composables/useTheme";
import { ref, watch } from "vue";

const isChecked = ref(false);
const themeValue = useTheme();
watch(isChecked, () => {
  console.log(isChecked.value);
  themeValue.value = isChecked.value ? "light" : "dark";
});
</script>
