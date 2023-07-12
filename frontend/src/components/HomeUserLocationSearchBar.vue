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
import { ref, onMounted, watch, toRefs, computed } from "vue";
import BaseInput from "./base/BaseInput.vue";
import { useFetch, onClickOutside, useDebounce } from "@vueuse/core";
import { useUserLocationStore } from "@/stores/userLocation";

const userLocationStore = useUserLocationStore();
const { readableAddress } = toRefs(userLocationStore.readonlyUserLocation);

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

watch(readableAddress, (newReadableAddress) => {
  searchInput.value = newReadableAddress;
  disableFetch.value = true;
});

const fetchSuggestedLocationsByQuery = async (value: string) => {
  const userLocationSearchURL = `http://localhost:3000/nominatim/search?q=${value}`;

  const { data: plainData, error } = await useFetch(userLocationSearchURL);
  const data = JSON.parse(plainData.value as string) as Location[];
  if (error.value) {
    console.error(error.value);
    return;
  }
  receivedLocations.value = data;
  console.log(data);
  setIsFetching(false);

  setListVisibility(true);
};

const handleLocationCardClick = (location: Location) => {
  userLocationStore.setUserLocation(location.address);
  setListVisibility(false);
};

onMounted(() => {
  onClickOutside(userLocationSearchBar, () => setListVisibility(false));
});
</script>
