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
      :value="computedUserLocationReadableAddress"
    />
    <BaseInput v-model="courtInput" class="mb-10" />
    <button
      class="w-full flex gap-x-2 items-center border py-4 px-3 rounded-md hover:bg-zinc-100 transition-colors"
    >
      <v-icon name="io-location-sharp" class="fill-zinc-800" scale="1.8" />
      <div class="w-full text-left">
        <div class="flex justify-between">
          <h4 class="text-lg font-medium">Orlik im Jay-Z</h4>
          <span class="text-zinc-600 font-medium">1.5km</span>
        </div>
        <span class="text-left text-zinc-600 font-medium"
          >ul. Dolna wilda 81/9, Poznań</span
        >
      </div>
    </button>
  </aside>
</template>

<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
import { ref, computed, onMounted } from "vue";
import { distance } from "@/utils/distance";

const courtInput = ref("");
const userLocation = ref([52.3933719, 16.9338775]);

const userLocationAddress = ref({
  road: "",
  house_number: "",
  city: "",
});

const fetchUserLocationAddress = async () => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${userLocation.value[0]}&lon=${userLocation.value[1]}&format=json&accept-language=pl`;
  const response = await fetch(url);
  if (!response.ok) {
    return "Błąd pobierania danych...";
  }
  const data = await response.json();
  userLocationAddress.value.city = data?.address?.city;
  userLocationAddress.value.road = data?.address?.road;
  userLocationAddress.value.house_number = data?.address?.house_number;
};

onMounted(() => fetchUserLocationAddress());
const computedUserLocationReadableAddress = computed(() => {
  if (
    !userLocationAddress.value.road ||
    !userLocationAddress.value.house_number ||
    !userLocationAddress.value.city
  ) {
    return "Ładowanie...";
  }
  return `${userLocationAddress.value.road} ${userLocationAddress.value.house_number}, ${userLocationAddress.value.city}`;
});
</script>
