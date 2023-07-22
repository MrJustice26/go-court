<template>
  <div
    class="w-full flex items-start gap-x-2 border dark:border-zinc-500 dark:hover:bg-zinc-600 py-4 px-3 rounded-md hover:shadow-md transition-colors"
  >
    <a
      :href="computedGeneratePathLink"
      v-if="userLocationStore.readonlyUserLocation.location"
      target="_blank"
      @click.stop
      class="min-w-[75px] max-w-[75px] px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-color inline-flex flex-col gap-y-1 items-center"
    >
      <v-icon
        name="gi-path-distance"
        scale="1.8"
        class="dark:fill-white fill-zinc-600"
      />
      <span
        class="text-zinc-600 dark:text-white font-medium whitespace-nowrap"
        >{{ computedDistance }}</span
      >
    </a>
    <div class="w-full text-left">
      <div class="flex justify-between">
        <h4 class="text-lg font-medium dark:text-white text-zinc-800">
          {{ name }}
        </h4>
      </div>
      <span class="text-left dark:text-white text-zinc-600 font-medium">
        <v-icon name="io-location-sharp" />
        {{ address }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { storeToRefs } from "pinia";
import { generatePathLink } from "@/utils/generate-path-link";
import { GeoPoint } from "@/types";

type HomeCourtCardProps = {
  name: string;
  address: string;
  location: GeoPoint;
};
const props = defineProps<HomeCourtCardProps>();

const userLocationStore = useUserLocationStore();
const { readonlyUserLocation } = storeToRefs(userLocationStore);
const computedGeneratePathLink = computed(() => {
  if (!readonlyUserLocation.value.location) {
    return "Unknown";
  }
  return generatePathLink(readonlyUserLocation.value.location, props.location);
});

const computedLocation = computed(() => props.location);

const computedDistance = computed(() => {
  return userLocationStore.getRelativeDistance(computedLocation.value, true);
});
</script>
