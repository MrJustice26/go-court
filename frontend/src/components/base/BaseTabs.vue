<template>
  <ul class="flex rounded-md">
    <li v-for="tabItem in items" :key="tabItem.value">
      <button
        @click="$emit('update:modelValue', tabItem.value)"
        :class="
          tabItem.value === modelValue
            ? 'text-emerald-400 border-b-emerald-400'
            : 'hover:text-gray-600 hover:border-b-gray-300 dark:hover:text-gray-300'
        "
        class="inline-block p-3 border-b-2 border-transparent mr-2"
      >
        {{ tabItem.text }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
type TabItem = {
  text: string;
  value: string;
};

type BaseTabsProps = {
  items: TabItem[];
  modelValue: string;
};

defineProps<BaseTabsProps>();
defineEmits(["update:modelValue"]);
</script>
