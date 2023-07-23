<template>
  <label
    class="relative inline-flex items-center cursor-pointer select-none max-h-[27px]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      class="sr-only peer"
      @change="
        $emit(
          'update:modelValue',
          Boolean(($event.target as HTMLInputElement).checked)
        )
      "
    />
    <div
      class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <div class="inline-block ml-2">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
type BaseToggleProps = {
  modelValue: boolean;
  beforeToggle?: boolean;
};

const props = defineProps<BaseToggleProps>();
const { modelValue } = toRefs(props);
defineEmits(["update:modelValue"]);
</script>
