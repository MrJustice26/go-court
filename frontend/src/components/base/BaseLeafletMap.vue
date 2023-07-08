<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import L, { LatLngTuple, Map } from "leaflet";

type Marker = {
  title: string;
  text: string;
  location: {
    lat: number;
    lon: number;
  };
};

type BaseLeafletMap = {
  markers: Marker[];
  center?: [number, number];
};

const props = defineProps<BaseLeafletMap>();
const map = ref<null | L.Map>(null);
const markers = computed(() => props.markers);
const leafletMarkers = ref<L.Marker<any>[]>([]);

const setupLeafletMap = () => {
  map.value = L.map("map", {
    center: props.center || [51.505, 20],
    zoom: 13,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  map.value.addEventListener("click", (e) => console.log("Clicked", e));

  loadMarkers();
};

const loadMarkers = () => {
  if (!map.value) return;
  leafletMarkers.value = markers.value.map((marker) => {
    const markerLocation = [
      marker.location.lat,
      marker.location.lon,
    ] as LatLngTuple;
    const markerInstance = L.marker(markerLocation);
    markerInstance.addTo(map.value as Map).bindPopup(marker.title);
    return markerInstance;
  });
};

const deleteMarkers = () => {
  leafletMarkers.value.forEach((marker) => map.value?.removeLayer(marker));
  leafletMarkers.value = [];
};

const reRenderMarkers = () => {
  deleteMarkers();
  loadMarkers();
};

watch(markers, () => reRenderMarkers());

onMounted(() => {
  setupLeafletMap();
});
</script>
