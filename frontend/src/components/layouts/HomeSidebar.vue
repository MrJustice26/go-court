<template>
  <aside class="p-5">
    <h1 class="text-3xl font-medium text-center mb-5">Find your court</h1>
    <label
      for="location-input"
      class="font-medium text-zinc-600 inline-block mb-1"
    >
      Your location
    </label>
    <HomeUserLocationSearchInput
      class="mb-10"
      @input="handleUserLocationSearch"
    />
    <HomeCourtSearchInput placeholder="Orlik im. Jay-Z" class="mb-5" />
    <ul>
      <li v-for="court in courtsStore.readonlyCourts" class="mb-2">
        <HomeCourtCard
          :name="court.name"
          :address="court.readableAddress"
          :location="court.location"
          @click="handleCourtCardClick"
        />
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { useCourtsStore } from "@/stores/courts";
import HomeCourtCard from "../HomeCourtCard.vue";
import HomeCourtSearchInput from "../HomeCourtSearchInput.vue";
import HomeUserLocationSearchInput from "../HomeUserLocationSearchInput.vue";
import { useFetch } from "@vueuse/core";

const courtsStore = useCourtsStore();
const userLocationStore = useUserLocationStore();

const userLocation = {
  lat: 52.40739993786911,
  lng: 16.917417094545577,
};

const handleCourtCardClick = (location: { lat: number; lng: number }) => {
  courtsStore.setCourtsMapCenter(location);
};

const handleUserLocationSearch = async (value: string) => {
  const userLocationSearchURL = `http://localhost:3000/nominatim/search?q=${value}`;

  const { data, error } = await useFetch(userLocationSearchURL);
  if (error.value) {
    console.error(error.value);
    return;
  }
  console.log(JSON.parse(data.value as string));
};

onMounted(() => {
  userLocationStore.setUserLocation(userLocation);
  courtsStore.setCourtsMapCenter(userLocation);
});
</script>
