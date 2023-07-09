<template>
  <button
    class="w-full flex items-start gap-x-2 border py-4 px-3 rounded-md hover:shadow-md transition-shadow"
    @click="$emit('click', location)"
  >
    <a
      :href="`https://www.google.com/maps/dir//${location.lat},${location.lng}`"
      target="_blank"
      @click.stop
      class="px-2 py-1 hover:bg-zinc-100 transition-colors inline-flex flex-col gap-y-1 items-center"
    >
      <v-icon name="gi-path-distance" scale="1.8" />
      <span class="text-zinc-600 font-medium whitespace-nowrap">{{
        computedDistance
      }}</span>
    </a>
    <div class="w-full text-left">
      <div class="flex justify-between">
        <h4 class="text-lg font-medium">{{ name }}</h4>
      </div>
      <span class="text-left text-zinc-600 font-medium">
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

const computedDistance = computed(() => {
  return userLocationStore.getRelativeDistance(computedLocation.value, true);
});
</script>
