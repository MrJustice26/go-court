<template>
  <div
    class="w-full max-h-[100px] flex items-start gap-x-2 border dark:border-zinc-500 dark:hover:bg-zinc-600 py-4 px-3 rounded-md hover:shadow-md transition-colors"
  >
    <div class="w-full text-left">
      <div class="flex justify-between mb-2">
        <h4
          class="text-lg font-medium dark:text-white text-zinc-800 line-clamp-1 w-4/5"
        >
          {{ name }}
        </h4>
        <span
          class="text-zinc-600 dark:text-white font-medium whitespace-nowrap"
        >
          {{ computedDistance }}
        </span>
      </div>
      <p class="text-left dark:text-white text-zinc-600 font-medium">
        <v-icon name="io-location-sharp" />
        {{ address }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { GeoPoint } from "@/types";

type HomeCourtCardProps = {
  name: string;
  address: string;
  location: GeoPoint;
};
const props = defineProps<HomeCourtCardProps>();

const userLocationStore = useUserLocationStore();

const computedLocation = computed(() => props.location);

const computedDistance = computed(() => {
  return userLocationStore.getRelativeDistance(computedLocation.value, true);
});
</script>
