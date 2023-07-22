import { GeoPoint } from "@/types";
import { distance } from "@/utils/distance";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type UserLocation = {
  location: GeoPoint | null;
  readableAddress: string;
};

export const useUserLocationStore = defineStore("user-location", () => {
  const userLocation = ref<UserLocation>({
    location: null,
    readableAddress: "",
  });

  const isUserLocationNotChosen = computed(() => {
    if (!userLocation.value.location?.lat || !userLocation.value.location?.lng)
      return false;
    return true;
  });

  const setUserLocation = async (location: UserLocation) => {
    userLocation.value = location;
    saveUserLocationDataToLocalStorage();
  };

  const readonlyUserLocation = computed(() => userLocation.value);

  const getRelativeDistance = (
    objectLocation: GeoPoint,
    shouldFormat?: boolean
  ) => {
    if (!userLocation.value.location) {
      return "unknown"
    }
    return distance(userLocation.value.location, objectLocation, shouldFormat);
  };

  const saveUserLocationDataToLocalStorage = () => {
    localStorage.setItem("user-location", JSON.stringify(userLocation.value));
  };

  const getUserLocationFromLocalStorage = () => {
    return localStorage.getItem("user-location");
  };

  const loadUserLocationData = () => {
    const rawUserLocationData = getUserLocationFromLocalStorage();
    if (!rawUserLocationData) {
      return;
    }

    const userLocationData = JSON.parse(
      rawUserLocationData
    ) as Partial<UserLocation>;
    if (
      !userLocationData?.location ||
      !userLocationData?.readableAddress ||
      !userLocationData?.location?.lat ||
      !userLocationData?.location?.lng
    ) {
      localStorage.removeItem("user-location");
      return;
    }

    setUserLocation(userLocationData as UserLocation);
  };

  return {
    setUserLocation,
    readonlyUserLocation,
    getRelativeDistance,
    loadUserLocationData,
    isUserLocationNotChosen,
  };
});
