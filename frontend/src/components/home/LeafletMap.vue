<template>
  <div :class="themeClassNames">
    <div id="map" class="w-full h-full"></div>
  </div>
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
import { markerIconsResolver } from "@/utils/leaflet-icons-loader";
import { GeoPoint } from "@/types";
import { DEFAULT_MAP_CENTER_COORDINATES } from "@/constants/map-center";
import useTheme from "@/composables/useTheme";

const theme = useTheme();
const themeClassNames = computed(() => {
  return theme.value === "dark" ? "dark" : "";
});

type Marker = {
  id: string;
  location: GeoPoint;
};

type HomeLeafletMapProps = {
  markers: Marker[];
  center: GeoPoint | null;
  userLocation: GeoPoint | null;
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

const setIcon = (iconName: keyof typeof markerIconsResolver) => {
  return icon({
    iconUrl: markerIconsResolver[iconName],
    iconSize: [40, 40],
  });
};

const setupLeafletMap = () => {
  mapInstance.value = map("map", {
    center: props.center || DEFAULT_MAP_CENTER_COORDINATES,
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
  const basketballIcon = setIcon("basketball");

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
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  transition: filter 0.15s var(--tailwind-animation-duration);
}

.leaflet-control-attribution {
  transition: background-color 0.15s var(--tailwind-animation-duration),
    color 0.15s var(--tailwind-animation-duration);
}

.dark .leaflet-layer,
.dark .leaflet-control-zoom-in,
.dark .leaflet-control-zoom-out {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}

.dark .leaflet-control-attribution {
  background-color: rgb(24 24 27) !important;
  color: white !important;
}
</style>
