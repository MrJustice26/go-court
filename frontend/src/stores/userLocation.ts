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

  const isUserLocationNotChosen = computed(() => {
    return (
      userLocation.value.location.lat === 0 &&
      userLocation.value.location.lng === 0
    );
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
    saveUserLocationDataToLocalStorage();
  };

  const readonlyUserLocation = computed(() => userLocation.value);

  const getRelativeDistance = (
    objectLocation: Location,
    shouldFormat?: boolean
  ) => {
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

    const userLocationData = JSON.parse(rawUserLocationData) as UserLocation;

    setUserLocation(userLocationData.location);
  };

  return {
    setUserLocation,
    readonlyUserLocation,
    getRelativeDistance,
    loadUserLocationData,
    isUserLocationNotChosen,
  };
});
