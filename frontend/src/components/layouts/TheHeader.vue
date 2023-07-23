<template>
  <header
    class="dark:bg-zinc-900 py-4 px-5 dark:text-white text-zinc-900 bg-zinc-100"
  >
    <nav class="flex justify-between">
      <RouterLink to="/" class="text-xl font-bold">Go Court</RouterLink>
      <ToggleTheme />
    </nav>
  </header>
</template>

<script setup lang="ts">
import ToggleTheme from "../home/ToggleTheme.vue";
</script>
