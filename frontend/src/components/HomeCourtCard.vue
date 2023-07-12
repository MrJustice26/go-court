<template>
  <button
    class="w-full flex items-start gap-x-2 border dark:border-zinc-500 dark:hover:bg-zinc-600 py-4 px-3 rounded-md hover:shadow-md transition-shadow transition-colors"
    @click="$emit('click', location)"
  >
    <!-- TODO Implement later using Leaflet routing machine -->
    <a
      :href="`https://www.google.com/maps/dir/${computedUserLocation.location.lat},${computedUserLocation.location.lng}/${location.lat},${location.lng}`"
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
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserLocationStore } from "@/stores/userLocation";
type HomeCourtCard = {
  name: string;
  address: string;
  location: { lat: number; lng: number };
};

const userLocationStore = useUserLocationStore();

const props = defineProps<HomeCourtCard>();
defineEmits(["click"]);

const computedLocation = computed(() => props.location);
const computedUserLocation = userLocationStore.readonlyUserLocation;

const computedDistance = computed(() => {
  return userLocationStore.getRelativeDistance(computedLocation.value, true);
});
</script>
