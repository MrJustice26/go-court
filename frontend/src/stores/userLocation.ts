import { distance } from "@/utils/distance";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type Location = {
  lat: number;
  lng: number;
};

type UserLocation = {
  location: Location;
  readableAddress: string;
};

export const useUserLocationStore = defineStore("user-location", () => {
  const userLocation = ref<UserLocation>({
    location: {
      lat: 0,
      lng: 0,
    },
    readableAddress: "",
  });

  const setUserLocation = (location: Location) => {
    userLocation.value.location = location;
    setReadableAddress(location);
  };

  const setReadableAddress = async (location: Location) => {
    const response = await fetch(
      `http://localhost:3000/nominatim/readable-address?lat=${location.lat}&lng=${location.lng}`
    );
    const data = await response.json();
    userLocation.value.readableAddress = data.address;
  };

  const readonlyUserLocation = computed(() => userLocation.value);

  const getRelativeDistance = (
    objectLocation: Location,
    shouldFormat?: boolean
  ) => {
    return distance(userLocation.value.location, objectLocation, shouldFormat);
  };

  return {
    setUserLocation,
    readonlyUserLocation,
    getRelativeDistance,
  };
});
