<template>
  <textarea
    ref="$textarea"
    class="bg-inherit w-full p-2.5 border dark:border-zinc-200/30 rounded-md transition-colors outline-none dark:text-white dark:disabled:bg-zinc-500 dark:disabled:text-zinc-100 disabled:cursor-not-allowed resize-none min-h-[3em]"
    :value="modelValue"
    @input="handleTextAreaInput"
  />
</template>

<script setup lang="ts">

type BaseTextAreaProps = {
  modelValue?: string;
};

defineProps<BaseTextAreaProps>();
const emit = defineEmits(["update:modelValue"]);

const handleTextAreaInput = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;

  emit("update:modelValue", textarea.value);
};
</script>
