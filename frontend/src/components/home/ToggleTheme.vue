<template>
  <button
    @click="toggleThemeMode"
    class="hover:bg-zinc-200 dark:hover:bg-zinc-700 py-2 px-2 rounded-md transition-colors"
  >
    <KeepAlive>
      <Transition mode="out-in" name="theme-transition">
        <v-icon name="bi-moon-stars-fill" v-if="isDarkMode" scale="1.5" />
        <v-icon name="bi-sun-fill" scale="1.5" class="fill-amber-400" v-else />
      </Transition>
    </KeepAlive>
  </button>
</template>

<script setup lang="ts">
import useTheme from "@/composables/useTheme";
import { ref, watch } from "vue";

const themeValue = useTheme();

const isDarkMode = ref(themeValue.value === "dark");
const toggleThemeMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
watch(isDarkMode, () => {
  themeValue.value = isDarkMode.value ? "dark" : "light";
});
</script>

<style scoped>
.theme-transition-enter-active,
.theme-transition-leave-active {
  transition: transform 0.15s var(--tailwind-animation-duration),
    opacity 0.15s var(--tailwind-animation-duration);
}

.theme-transition-leave-to,
.theme-transition-enter-from {
  opacity: 0;
}
.theme-transition-enter-from {
  transform: translateY(20px);
}
.theme-transition-leave-to {
  transform: translateY(-20px);
}

.theme-transition-enter-to,
.theme-transition-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
