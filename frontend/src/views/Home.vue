<template>
  <div class="h-[calc(100vh-52px)] flex">
    <HomeSidebar class="w-1/2" />
    <BaseLeafletMap
      :markers="courtsStore.readonlyMapDataCourts"
      :center="courtsStore.readonlyCourtsMapCenter"
      class="w-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import BaseLeafletMap from "@/components/base/BaseLeafletMap.vue";
import HomeSidebar from "@/components/home/TheSidebar.vue";
import { useCourtsStore } from "@/stores/courts";
import { useUserLocationStore } from "@/stores/userLocation";
import { DEFAULT_MAP_CENTER_COORDINATES } from "@/constants/map-center";
import fetchService from "@/services/fetch.service";
import { type Court } from "@/types";

const courtsStore = useCourtsStore();

const userLocationStore = useUserLocationStore();

const fetchCourts = async () => {
  const data = await fetchService.getCourts();
  if (!data) {
    return;
  }
  const mappedData = data.map((court: Court) => ({
    name: court.name,
    description: court.description,
    location: court.location,
    readableAddress: court.readable_address,
    courtType: court.court_type,
  }));

  courtsStore.setCourts(mappedData);
};

onMounted(() => {
  if (userLocationStore.isUserLocationNotChosen) {
    courtsStore.setCourtsMapCenter(DEFAULT_MAP_CENTER_COORDINATES);
  } else {
    courtsStore.setCourtsMapCenter(
      userLocationStore.readonlyUserLocation.location
    );
  }
});

fetchCourts();
</script>
