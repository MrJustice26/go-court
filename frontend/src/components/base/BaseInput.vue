<template>
  <input
    class="w-full py-3 px-4 border rounded-md transition-colors outline-none dark:bg-zinc-700 bg-white dark:text-white dark:disabled:bg-zinc-500 dark:disabled:text-zinc-100 disabled:cursor-not-allowed"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script setup lang="ts">
type BaseInput = {
  modelValue?: string;
};

defineProps<BaseInput>();
defineEmits(["update:modelValue"]);
</script>
