import { defineStore } from "pinia";
import { ref, computed } from "vue";

type Court = {
  name: string;
  description: string;
  courtType: string;
  location: {
    lat: number;
    lng: number;
  };
  readableAddress: string;
};

export const useCourtsStore = defineStore("courts", () => {
  const courts = ref<Court[]>([]);

  const readonlyCourts = computed(() => courts.value);
  const readonlyMapDataCourts = computed(() =>
    courts.value.map((court) => ({
      title: court.name,
      text: court.description,
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
    const url = `http://localhost:3000/courts?name=${name}`;
    const response = await fetch(url);
    const data = await response.json();
    const mappedData = data.map((court) => ({
      name: court.name,
      description: court.description,
      location: court.location,
      readableAddress: court.readable_address,
      courtType: court.court_type,
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
