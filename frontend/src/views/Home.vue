<template>
  <div
    class="h-[calc(100vh-70px)] flex flex-col-reverse items-start md:flex-row justify-end md:justify-normal"
  >
    <div
      class="w-full md:w-1/2 xl:w-4/12 2xl:w-3/12 h-3/4 md:h-full overflow-y-auto md:min-w-[400px]"
    >
      <CourtDetails
        v-if="route.query?.court"
        :court-id="(route.query?.court as string)"
      />
      <CourtFindPanel v-else-if="!route.query?.court && !createCourtStore.isUserOnCreationStateData" />
      <CourtCreatePanel v-else-if="createCourtStore.isUserOnCreationStateData" />
    </div>

    <LeafletMap 
    :markers="courtsStore.readonlyMapDataCourts" 
    @marker-click="handleMarkerClick"
    @map-click="handleMapClick" 
    :current-view="courtsStore.readonlyCourtsMapCenter" 
    :center="userLocationStore.readonlyUserLocation.location" 
    class="w-full md:w-1/2 xl:w-8/12 2xl:w-9/12 h-1/4 md:h-full"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import LeafletMap from "@/components/base/LeafletMap.vue";
import CourtFindPanel from "@/components/court/CourtFindPanel.vue";
import CourtDetails from "@/components/court/CourtDetails.vue";
import CourtCreatePanel from "@/components/court/CourtCreatePanel.vue";
import { useCourtsStore, useMapStore, useUserLocationStore, useCreateCourtStore} from "@/stores";
import fetchService from "@/services/fetch.service";
import { MappedCourt, CourtFromAPI, LeafletMarker } from "@/types";
import { useRoute, useRouter } from "vue-router";
import {useToast} from "vue-toastification";
import { LeafletMouseEvent } from "leaflet";

const toast = useToast();

const router = useRouter();
const route = useRoute();

const courtsStore = useCourtsStore();
const mapStore = useMapStore();
const userLocationStore = useUserLocationStore();
const createCourtStore = useCreateCourtStore();

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

const handleMarkerClick = (marker: LeafletMarker) => {
  if(createCourtStore.isUserOnCreationStateData) {
    toast.error("Nie mozesz wybrać kortu podczas tworzenia nowego kortu")
    return;
  }
  router.push({ query: { court: marker.id } });
};

const handleMapClick = async (e: LeafletMouseEvent) => {
  if(!createCourtStore.isUserOnCreationStateData) return;
  const data = await fetchService.getReadableAddressByLocation(e.latlng)
  createCourtStore.createCourtData.location = e.latlng;
  createCourtStore.createCourtData.readableAddress = data?.address || "";
}
fetchCourts();
</script>
