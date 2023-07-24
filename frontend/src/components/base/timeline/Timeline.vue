<template>
  <ol class="relative border-l border-emerald-400">
    <li
      v-for="(item, itemIdx) in items"
      :key="itemIdx"
      :class="itemIdx !== items.length - 1 && 'mb-10'"
    >
      <TimelineItem
        :time-text="item.timeText"
        :title="item.title"
        :text="item.text"
      />
    </li>
  </ol>
</template>

<script setup lang="ts">
import { TimelineItemProps } from "./timeline.interface";
import TimelineItem from "./TimelineItem.vue";

type Timeline = {
  items: TimelineItemProps[];
};

defineProps<Timeline>();
</script>
