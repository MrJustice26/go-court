<template>
  <header
    class="dark:bg-zinc-800 py-3 px-[10px] md:px-5 dark:text-white text-zinc-900 bg-zinc-100 h-[70px]"
  >
    <nav class="flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">Go Court</RouterLink>
      <div class="flex items-center gap-x-3">
        <ToggleTheme />
        <button
          class="hover:bg-zinc-200 dark:hover:bg-zinc-700 py-2 px-2 rounded-md transition-colors"
        >
          <v-icon name="fa-user-alt" scale="1.5" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import ToggleTheme from "../home/ToggleTheme.vue";
</script>
