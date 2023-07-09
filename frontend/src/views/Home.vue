<template>
  <div class="h-[calc(100vh-52px)] flex">
    <HomeSidebar class="w-1/2" />
    <BaseLeafletMap
      v-if="courtsStore.readonlyCourts.length > 0"
      :markers="courtsStore.readonlyMapDataCourts"
      :center="courtsStore.readonlyCourtsMapCenter"
      class="w-1/2"
      @click="handleMapClick"
    />
  </div>
</template>

<script setup lang="ts">
import BaseLeafletMap from "@/components/base/BaseLeafletMap.vue";
import HomeSidebar from "@/components/layouts/HomeSidebar.vue";
import { LeafletMouseEvent } from "leaflet";
import { useCourtsStore } from "@/stores/courts";
import { useUserLocationStore } from "@/stores/userLocation";

const courtsStore = useCourtsStore();
const userLocationStore = useUserLocationStore();

const fetchCourts = async () => {
  const response = await fetch("http://localhost:3000/courts");
  const data = await response.json();
  const mappedData = data.map((court) => ({
    name: court.name,
    description: court.description,
    location: court.location,
    readableAddress: court.readable_address,
    courtType: court.court_type,
  }));

  courtsStore.setCourts(mappedData);
};

const handleMapClick = (event: LeafletMouseEvent) => {
  userLocationStore.setUserLocation(event.latlng);
};
fetchCourts();
</script>
