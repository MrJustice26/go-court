<template>
  <div class="h-[calc(100vh-52px)] flex">
    <HomeSidebar class="w-1/2" />
    <BaseLeafletMap
      v-if="markers"
      :markers="markers"
      :center="[52.4054632, 16.9217828]"
      class="w-1/2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseLeafletMap from "@/components/base/BaseLeafletMap.vue";
import HomeSidebar from "@/components/layouts/HomeSidebar.vue";

const markers = ref([]);
const fetchCourts = async () => {
  const response = await fetch("http://localhost:3000/courts");
  const data = await response.json();
  const mappedData = data.map((court) => ({
    title: court.name,
    text: court.description,
    location: court.location,
    address: court.readable_address,
  }));

  markers.value = mappedData;
  console.log(markers.value);
};
fetchCourts();
</script>
