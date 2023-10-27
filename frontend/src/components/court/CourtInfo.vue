<template>
  <div>
    <h1 class="text-2xl line-clamp-2 mb-2" :title="court?.name">
      {{ court?.name }}
    </h1>

    <img src="https://placehold.co/500x250" class="mb-4" />
    <p class="font-medium mb-10">
      {{ court?.readable_address }}
    </p>
    <div class="text-base" v-html="court?.description"></div>
  </div>
</template>

<script setup lang="ts">
import { CourtFromAPI } from "@/types";

type CourtInformationProps = {
  court: CourtFromAPI;
};

defineProps<CourtInformationProps>();
</script>
