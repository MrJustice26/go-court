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
import BaseLeafletMap from "@/components/base/BaseLeafletMap.vue";
import HomeSidebar from "@/components/home/TheSidebar.vue";
import { useCourtsStore } from "@/stores/courts";
import { type Court } from "@/types";

const courtsStore = useCourtsStore();

const fetchCourts = async () => {
  const response = await fetch("http://localhost:3000/courts");
  const data = await response.json();
  const mappedData = data.map((court: Court) => ({
    name: court.name,
    description: court.description,
    location: court.location,
    readableAddress: court.readable_address,
    courtType: court.court_type,
  }));

  courtsStore.setCourts(mappedData);
};

fetchCourts();
</script>
