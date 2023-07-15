<template>
  <div class="relative" ref="userLocationSearchBar">
    <BaseInput
      v-model="searchInput"
      placeholder="e.g.: Orlik im. Jay-Z"
      @focus="setListVisibility(true)"
    />

    <div
      class="border rounded-sm absolute w-full bg-white top-[96%] z-10 dark:bg-zinc-700 dark:text-white"
      v-show="
        isListVisible &&
        isSearchInputEqualsToDelayedSearchInput &&
        !isSearchInputEqualsToSavedUserLocation &&
        searchInput &&
        !isFetching
      "
    >
      <ul v-show="receivedLocations.length > 0" class="overflow-hidden">
        <li
          v-for="(location, locationIdx) in receivedLocations"
          :key="locationIdx"
        >
          <button
            :title="location.display_name"
            @click="handleLocationCardClick(location)"
            class="hover:bg-zinc-200 dark:hover:bg-zinc-800 w-full inline-flex p-3 transition-colors whitespace-nowrap"
          >
            {{ location.display_name }}
          </button>
        </li>
      </ul>
      <div v-show="receivedLocations.length === 0" class="p-3">
        <h4 class="text-lg font-medium">
          Ooops... We couldn't find any location :(
        </h4>
        <span>Please try to provide other location</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { onClickOutside, useDebounce } from "@vueuse/core";
import { useUserLocationStore } from "@/stores/userLocation";
import fetchService from "@/services/fetch.service";
import { NominatimSearchResult } from "@/types";
import { storeToRefs } from "pinia";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();
const userLocationStore = useUserLocationStore();
const { readonlyUserLocation } = storeToRefs(userLocationStore);

type Location = {
  display_name: string;
  address: {
    lat: number;
    lng: number;
  };
};

const searchInput = ref("");
const delayedSearchInput = useDebounce(searchInput, 600);

const disableFetch = ref(false);

const receivedLocations = ref<Location[]>([]);
const userLocationSearchBar = ref<HTMLElement | null>(null);

const isListVisible = ref(false);
const isFetching = ref(false);

const isSearchInputEqualsToDelayedSearchInput = computed(
  () => searchInput.value === delayedSearchInput.value
);

const isSearchInputEqualsToSavedUserLocation = computed(
  () =>
    searchInput.value === userLocationStore.readonlyUserLocation.readableAddress
);
const setListVisibility = (bool: boolean) => (isListVisible.value = bool);
const setIsFetching = (bool: boolean) => (isFetching.value = bool);

watch(searchInput, () => {
  if (searchInput.value) return;

  setListVisibility(false);
});

watch(delayedSearchInput, () => {
  if (!delayedSearchInput.value) return;

  if (disableFetch.value) {
    disableFetch.value = false;
    return;
  }

  setIsFetching(true);
  fetchSuggestedLocationsByQuery(delayedSearchInput.value);
});

watch(readonlyUserLocation, (newLocation) => {
  searchInput.value = newLocation.readableAddress;
  mapStore.mapCenterLocation = newLocation.location;
  disableFetch.value = true;
});

const fetchSuggestedLocationsByQuery = async (query: string) => {
  const data = await fetchService.getLocationsByAddressQuery(query);
  if (!data) {
    console.error("Error on fetching");
    return;
  }
  receivedLocations.value = data;
  setIsFetching(false);

  setListVisibility(true);
};

const handleLocationCardClick = (location: NominatimSearchResult) => {
  const userLocation = {
    location: location.address,
    readableAddress: location.display_name,
  };
  userLocationStore.setUserLocation(userLocation);
  setListVisibility(false);
};

onMounted(() => {
  searchInput.value = readonlyUserLocation.value.readableAddress;

  onClickOutside(userLocationSearchBar, () => setListVisibility(false));
});
</script>
