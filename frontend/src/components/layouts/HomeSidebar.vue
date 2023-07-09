<template>
  <aside class="p-5">
    <h1 class="text-3xl font-medium text-center mb-5">Find your court</h1>
    <label
      for="location-input"
      class="font-medium text-zinc-600 inline-block mb-1"
    >
      Your location
    </label>
    <BaseInput
      disabled
      id="location-input"
      class="mb-10"
      :value="userLocationStore.readonlyUserLocation.readableAddress"
    />
    <BaseInput v-model="courtInput" class="mb-10" />
    <ul>
      <li v-for="court in courtsStore.readonlyCourts" class="mb-2">
        <HomeCourtCard
          :name="court.name"
          :address="court.readableAddress"
          :location="court.location"
        />
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
import { ref } from "vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { useCourtsStore } from "@/stores/courts";
import HomeCourtCard from "../HomeCourtCard.vue";

const courtsStore = useCourtsStore();
const userLocationStore = useUserLocationStore();
const courtInput = ref("");
userLocationStore.setUserLocation({
  lat: 52.40739993786911,
  lng: 16.917417094545577,
});
</script>
