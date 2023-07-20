import { defineStore } from "pinia";
import { ref, computed } from "vue";
import fetchService from "@/services/fetch.service";

type Court = {
  name: string;
  description: string;
  courtType: string;
  location: {
    lat: number;
    lng: number;
  };
  readableAddress: string;
  id: string;
};

export const useCourtsStore = defineStore("courts", () => {
  const courts = ref<Court[]>([]);

  const readonlyCourts = computed(() => courts.value);
  const readonlyMapDataCourts = computed(() =>
    courts.value.map((court) => ({
      id: court.id,
      location: court.location,
    }))
  );

  const courtsMapCenter = ref({
    lat: 0,
    lng: 0,
  });
  const readonlyCourtsMapCenter = computed(() => courtsMapCenter.value);

  const setCourtsMapCenter = (location: { lat: number; lng: number }) => {
    if (!location?.lat || !location?.lng) {
      console.log(`location ${location} doesn't contain lat or lng attributes`);
      return;
    }

    courtsMapCenter.value = {
      lat: location.lat,
      lng: location.lng,
    };
  };

  const setCourts = (desiredCourts: Court[]) => {
    courts.value = desiredCourts;
  };

  const fetchCourtsByName = async (name: string) => {
    const data = await fetchService.getCourtsByName(name);
    if (!data) {
      console.error("Error on fetching...");
      return;
    }

    const mappedData = data.map((court) => ({
      name: court.name,
      description: court.description,
      location: court.location,
      readableAddress: court.readable_address,
      courtType: court.court_type,
      id: court._id,
    }));

    setCourts(mappedData);
  };

  return {
    readonlyCourts,
    readonlyMapDataCourts,
    readonlyCourtsMapCenter,
    setCourtsMapCenter,
    setCourts,
    fetchCourtsByName,
  };
});
