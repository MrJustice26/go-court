<template>
  <div
    class="h-[calc(100vh-70px)] flex flex-col-reverse items-start md:flex-row justify-end md:justify-normal"
  >
    <div
      class="w-full md:w-1/2 xl:w-4/12 2xl:w-3/12 h-3/4 md:h-full overflow-y-auto"
    >
      <CourtDetails
        v-if="route.query?.court"
        :court-id="(route.query?.court as string)"
      />
      <CourtFindPanel v-else />
    </div>

    <HomeLeafletMap
      :markers="courtsStore.readonlyMapDataCourts"
      :center="mapStore.mapCenterLocation"
      :user-location="userLocationStore.readonlyUserLocation.location"
      class="w-full md:w-1/2 xl:w-8/12 2xl:w-9/12 h-1/4 md:h-full"
      @marker-click="handleMarkerClick"
      @show-user-marker="handleShowUserMarkerClick"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HomeLeafletMap from "@/components/home/LeafletMap.vue";
import CourtFindPanel from "@/components/home/CourtFindPanel.vue";
import CourtDetails from "@/components/home/CourtDetails.vue";
import { useCourtsStore } from "@/stores/courts";
import { useUserLocationStore } from "@/stores/userLocation";
import { useMapStore } from "@/stores/map";
import fetchService from "@/services/fetch.service";
import { MappedCourt, CourtFromAPI } from "@/types";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const courtsStore = useCourtsStore();
const mapStore = useMapStore();
const userLocationStore = useUserLocationStore();

const fetchCourts = async () => {
  const data = await fetchService.getCourts();
  if (!data) {
    return;
  }
  const mappedData: MappedCourt[] = data.map((court: CourtFromAPI) => ({
    id: court._id,
    name: court.name,
    description: court.description,
    location: court.location,
    readableAddress: court.readable_address,
    courtType: court.court_type,
  }));

  courtsStore.setCourts(mappedData);
};

onMounted(() => {
  if (!userLocationStore.readonlyUserLocation?.location) {
    return;
  }

  mapStore.mapCenterLocation = userLocationStore.readonlyUserLocation.location;
});

const handleMarkerClick = (courtId: string) => {
  router.push({ query: { court: courtId } });
};

const handleShowUserMarkerClick = () => {
  mapStore.mapCenterLocation = userLocationStore.readonlyUserLocation.location!;
};

fetchCourts();
</script>
