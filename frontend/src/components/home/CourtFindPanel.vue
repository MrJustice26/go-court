<template>
  <div
    class="px-5 pb-5 dark:bg-zinc-700 max-h-[calc(100vh-60px)] overflow-y-auto"
  >
    <div class="sticky top-0 dark:bg-zinc-700 bg-zinc-50 pt-5">
      <h1 class="text-3xl font-medium text-center mb-5 dark:text-white">
        Find your court
      </h1>
      <label
        for="location-input"
        class="font-medium inline-block mb-1 dark:text-white"
      >
        Your location
      </label>
      <HomeUserLocationSearchBar class="mb-10" />
      <HomeCourtSearchBar placeholder="Orlik im. Jay-Z" class="mb-5" />
    </div>
    <ul>
      <li v-for="court in courtsStore.readonlyCourts" class="mb-2">
        <RouterLink
          :to="`?court=${court.id}`"
          @click.stop="handleCourtCardClick(court)"
        >
          <HomeCourtCard
            :name="court.name"
            :address="court.readableAddress"
            :location="court.location"
            @click="handleCourtCardClick"
          />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from "@/stores/map";
import { useCourtsStore } from "@/stores/courts";
import HomeCourtCard from "./CourtCard.vue";
import HomeCourtSearchBar from "./CourtSearchBar.vue";
import HomeUserLocationSearchBar from "./UserLocationSearchBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courtsStore = useCourtsStore();
const mapStore = useMapStore();

const handleCourtCardClick = (court: any) => {
  if (!court?.location) return;
  mapStore.mapCenterLocation = court?.location;
  router.push({ query: { court: court?.id } });
};
</script>
