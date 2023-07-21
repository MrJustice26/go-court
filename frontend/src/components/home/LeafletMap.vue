<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import {
  LatLngTuple,
  Map,
  LatLng,
  icon,
  map,
  latLngBounds,
  latLng,
  marker,
  tileLayer,
  PopupEvent,
} from "leaflet";
import applyLeafletZoomFix from "@/utils/apply-leaflet-zoom-fix";

// TODO Move all common types to shared types folder
type Marker = {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
};

type HomeLeafletMapProps = {
  markers: Marker[];
  center: { lat: number; lng: number };
};

type CustomMarker = L.Marker & { courtId: string };

const props = defineProps<HomeLeafletMapProps>();
const mapInstance = ref<null | L.Map>(null);
const markers = computed(() => props.markers);
const leafletMarkers = ref<L.Marker<any>[]>([]);

const emit = defineEmits(["marker-click"]);

const computedCenter = computed(() => props.center);
watch(computedCenter, () => {
  if (!mapInstance.value) return;
  if (!props.center || !props.center?.lat || !props.center?.lng) return;
  mapInstance.value.setView(new LatLng(props.center.lat, props.center.lng), 17);
});

const setupBasketballIcon = () => {
  return icon({
    iconUrl: "../../src/assets/basketball.png",
    iconSize: [40, 40],
  });
};

const setupLeafletMap = () => {
  mapInstance.value = map("map", {
    center: props.center,
    zoom: 17,
    maxBounds: latLngBounds(latLng(-90, -180), latLng(90, 180)),
  });

  tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance.value as Map);

  applyLeafletZoomFix();

  loadMarkers();
};

const loadMarkers = () => {
  const basketballIcon = setupBasketballIcon();

  if (!mapInstance.value) return;

  leafletMarkers.value = markers.value.map((iteratedMarker) => {
    const markerLocation = [
      iteratedMarker.location.lat,
      iteratedMarker.location.lng,
    ] as LatLngTuple;
    const markerInstance = marker(markerLocation, {
      icon: basketballIcon,
    }) as CustomMarker;

    markerInstance.on("click", (event) => handlePinClick(event));

    markerInstance.addTo(mapInstance.value as Map);

    markerInstance.courtId = iteratedMarker.id;

    return markerInstance;
  });
};

const handlePinClick = (e: PopupEvent) => {
  const courtId = e.sourceTarget?.courtId;
  emit("marker-click", courtId);
  return;
};

const deleteMarkers = () => {
  leafletMarkers.value.forEach((marker) =>
    mapInstance.value?.removeLayer(marker as any)
  );
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

<style>
@media (prefers-color-scheme: dark) {
  .leaflet-layer,
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
  }

  .leaflet-control-attribution {
    background-color: rgb(24 24 27) !important;
    color: white !important;
  }
}
</style>
@/utils/apply-leaflet-zoom-fix
