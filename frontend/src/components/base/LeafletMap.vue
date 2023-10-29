<template>
    <div style="height:100%; width:100%">
      <l-map :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom" :center="[editableCenter.lat, editableCenter.lng]" :maxBounds="[{
        lat: -90,
        lng: -180
      }, {
        lat: 90,
        lng: 180
      }]"

      @ready="initMapEventListeners"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />
        <l-marker v-for="marker in markers" :key="marker.id" :lat-lng="[marker.location.lat, marker.location.lng]" @click="$emit('marker-click', marker)">
            <l-icon :iconUrl="markerIconsResolver[defaultIconName]" width="32" height="32" />
        </l-marker>
      </l-map>
    </div>
</template>
  
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon} from "@vue-leaflet/vue-leaflet";
import { ref, toRef, watch } from "vue";
import {DEFAULT_MAP_CENTER_COORDINATES} from "@/constants/mapCenter";
import { GeoPoint } from "@/types";
import { markerIconsResolver } from "@/utils/leafletIconsLoader";

interface Marker {
  id: string;
  location: GeoPoint;
  iconName?: string;
};

const props = withDefaults(defineProps<{
    center?: GeoPoint;
    markers: Marker[];
    currentView?: GeoPoint;
}>(), {
    center() {
        return DEFAULT_MAP_CENTER_COORDINATES;
    },
})

const emit = defineEmits<{
    "marker-click": [court: Marker],
    "map-move": [event: L.LeafletEvent],
    "map-click": [event: L.LeafletMouseEvent],
}>();

const mapInstance = ref<L.Map | null>(null);
const zoom = ref(13);
const defaultIconName = 'basketball'
const currentViewRef = toRef(props, 'currentView');
const editableCenter = ref(props.center);

watch(currentViewRef, () => {
    if (!mapInstance.value) return;
    if (!currentViewRef.value || !currentViewRef.value?.lat || !currentViewRef.value?.lng) return;

    const {lat, lng} = currentViewRef.value;
    editableCenter.value = {lat, lng};
})

const initMapEventListeners = (mapInst: L.Map) => {
    mapInstance.value = mapInst;
    mapInstance.value.on('moveend', (event: L.LeafletEvent) => {
        emit('map-move', event);
    })
    mapInstance.value.on('click', (event: L.LeafletMouseEvent) => {
        emit('map-click', event);
    })
}

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
</style>@/utils/leafletIconsLoader@/constants/mapCenter