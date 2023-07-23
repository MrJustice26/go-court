<template>
  <BaseToggle v-model="isDarkMode" />
</template>

<script setup lang="ts">
import BaseToggle from "@/components/base/BaseToggle.vue";
import useTheme from "@/composables/useTheme";
import { ref, watch } from "vue";

const themeValue = useTheme();
const isDarkMode = ref(themeValue.value === "dark");
watch(isDarkMode, () => {
  themeValue.value = isDarkMode.value ? "dark" : "light";
});
</script>
