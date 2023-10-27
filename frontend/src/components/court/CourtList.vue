<template>
  <ul>
    <li v-for="court in courtsStore.readonlyCourts" class="mb-2">
      <RouterLink :to="`?court=${court.id}`" @click.stop="handleCourtCardClick">
        <CourtsListItem
          :name="court.name"
          :address="court.readableAddress"
          :location="court.location"
          @click="handleCourtCardClick(court)"
        />
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useCourtsStore } from "@/stores/courts";
import { useMapStore } from "@/stores/map";
import { useRouter } from "vue-router";
import CourtsListItem from "./CourtListItem.vue";


const router = useRouter();
const mapStore = useMapStore();

const courtsStore = useCourtsStore();
const handleCourtCardClick = (court: any) => {
  if (!court?.location) return;
  mapStore.mapCenterLocation = court?.location;
  router.push({ query: { court: court?.id } });
};
</script>
