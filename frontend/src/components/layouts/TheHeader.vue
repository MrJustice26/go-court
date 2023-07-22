<template>
  <header class="bg-zinc-900 py-4 px-5 text-white">
    <nav class="flex justify-between">
      <RouterLink to="/" class="text-xl font-bold">Go Court</RouterLink>
      <ToggleTheme />
    </nav>
  </header>
</template>

<script setup lang="ts">
import ToggleTheme from "../home/ToggleTheme.vue";
</script>
