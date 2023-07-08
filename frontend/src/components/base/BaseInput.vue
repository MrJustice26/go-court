<template>
  <input
    placeholder="Orlik im. Jay-Z"
    class="border w-full py-3 px-4 rounded-md focus:border-zinc-800 transition-colors outline-none"
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
