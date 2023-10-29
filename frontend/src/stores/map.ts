import { defineStore } from "pinia";
import { DEFAULT_MAP_CENTER_COORDINATES } from "@/constants/mapCenter";
import { ref } from "vue";

export const useMapStore = defineStore("map", () => {
  const mapCenterLocation = ref(DEFAULT_MAP_CENTER_COORDINATES);


  return {
    mapCenterLocation,
  };
});
