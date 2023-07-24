<template>
  <div class="ml-4">
    <div
      class="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-emerald bg-emerald-300 dark:border-emerald-900 dark:bg-emerald-500"
    ></div>
    <time
      class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
      >{{ timeText }}</time
    >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <p class="text-base font-normal text-gray-500 dark:text-gray-400">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { TimelineItemProps } from "./timeline.interface";

defineProps<TimelineItemProps>();
</script>
