<template>
  <button
    class="w-full flex gap-x-2 items-center border py-4 px-3 rounded-md hover:bg-zinc-100 transition-colors"
  >
    <v-icon name="io-location-sharp" class="fill-zinc-800" scale="1.8" />
    <div class="w-full text-left">
      <div class="flex justify-between">
        <h4 class="text-lg font-medium">{{ name }}</h4>
        <span class="text-zinc-600 font-medium">{{ computedDistance }}</span>
      </div>
      <span class="text-left text-zinc-600 font-medium">{{ address }}</span>
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
const computedLocation = computed(() => props.location);

// TODO Create custom function which will formats dependning on the distance,
// example: 1.2121231 from distance -> 1.2 km, 0,21312 from distance -> 200 m, 400.21 from distance -> 400 km
const computedDistance = computed(() => {
  const distanceAmount = userLocationStore.getRelativeDistance(
    computedLocation.value
  );
  const shouldConvertToMeters = distanceAmount < 1;
  const distanceSuffix = shouldConvertToMeters ? "m" : "km";
  const displayedDistance = shouldConvertToMeters
    ? (distanceAmount * 1000).toFixed(0)
    : distanceAmount.toFixed(2);
  return `${displayedDistance} ${distanceSuffix}`;
});
</script>
