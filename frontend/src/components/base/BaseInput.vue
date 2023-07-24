<template>
  <input
    class="bg-inherit w-full p-2.5 border dark:border-zinc-200/30 rounded-md transition-colors outline-none dark:text-white dark:disabled:bg-zinc-500 dark:disabled:text-zinc-100 disabled:cursor-not-allowed"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script setup lang="ts">
type BaseInputProps = {
  modelValue?: string;
};

defineProps<BaseInputProps>();
defineEmits(["update:modelValue"]);
</script>
