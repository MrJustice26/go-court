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

  const setCourts = (desiredCourts: Court[]) => {
    courts.value = desiredCourts;
  };

  return {
    setCourts,
    readonlyCourts,
    readonlyMapDataCourts,
  };
});
