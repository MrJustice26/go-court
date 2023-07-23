<template>
  <div
    class="h-[calc(100vh-60px)] flex flex-col-reverse items-start md:flex-row justify-end md:justify-normal"
  >
    <CourtInfo
      v-if="route.query?.court"
      class="w-full md:w-3/6 lg:w-2/6"
      :court-id="(route.query?.court as string)"
    />
    <CourtFindPanel class="w-full md:w-3/6 lg:w-2/6" v-else />

    <HomeLeafletMap
      :markers="courtsStore.readonlyMapDataCourts"
      :center="mapStore.mapCenterLocation"
      :user-location="userLocationStore.readonlyUserLocation.location"
      class="w-full h-[300px] md:h-full md:w-3/6 lg:w-4/6"
      @marker-click="handleMarkerClick"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HomeLeafletMap from "@/components/home/LeafletMap.vue";
import CourtFindPanel from "@/components/home/CourtFindPanel.vue";
import CourtInfo from "@/components/home/CourtInfo.vue";
import { useCourtsStore } from "@/stores/courts";
import { useUserLocationStore } from "@/stores/userLocation";
import { useMapStore } from "@/stores/map";
import fetchService from "@/services/fetch.service";
import { MappedCourt, CourtFromAPI, GeoPoint } from "@/types";
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
    mapStore.mapCenterLocation = userLocationStore.readonlyUserLocation
      .location as GeoPoint;
  }
});

const handleMarkerClick = (courtId: string) => {
  router.push({ query: { court: courtId } });
};

fetchCourts();
</script>
