<template>
  <div class="p-5">
    <RouterLink to="/" class="py-2 rounded-md mb-3 inline-block">
      <v-icon name="bi-arrow-left" scale="2" />
    </RouterLink>
    <div v-if="isFetching">
      <LoadingGradient class="h-12 mb-3 rounded-md" />
      <LoadingGradient class="h-[300px] mb-10 rounded-md" />
      <LoadingGradient class="h-12 mb-3 rounded-md" />
      <LoadingGradient class="h-12 rounded-md" />
    </div>
    <div v-else>
      <div class="py-3 flex justify-between items-end">
        <a
          :href="computedGeneratePathLink"
          class="flex items-end w-4/5"
          :aria-label="courtData?.readable_address"
          :title="courtData?.readable_address"
          target="_blank"
        >
          <v-icon name="io-location-sharp" scale="1.5" />
          <span class="underline line-clamp-1 w-4/5">
            {{ courtData?.readable_address }}
          </span>
        </a>
        <p>
          {{ computedDistance }}
        </p>
      </div>
      <img src="https://placehold.co/600x400" class="rounded-t-md mb-10" />
      <h1 class="text-3xl text-center mb-3">{{ courtData?.name }}</h1>
      <div class="text-base" v-html="courtData?.description"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import fetchService from "@/services/fetch.service";
import { toRefs, ref, watch, onMounted, computed } from "vue";
import { CourtFromAPI, GeoPoint } from "@/types";
import LoadingGradient from "@/components/base/LoadingGradient.vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { storeToRefs } from "pinia";
import { generatePathLink } from "@/utils/generate-path-link";

const userLocationStore = useUserLocationStore();
const { readonlyUserLocation } = storeToRefs(userLocationStore);

type HomeCourtInfoProps = {
  courtId: string;
};

const props = defineProps<HomeCourtInfoProps>();
const { courtId } = toRefs(props);
const courtData = ref<CourtFromAPI | null>(null);
const isFetching = ref(true);

const router = useRouter();

const loadCourtData = async () => {
  if (!courtId.value) {
    router.push({ path: "/" });
  }

  isFetching.value = true;

  const receivedCourtData = await fetchService.getCourtById(courtId.value);
  if (!receivedCourtData) {
    router.push({ path: "/" });
  }
  courtData.value = receivedCourtData;
  isFetching.value = false;
};

watch(courtId, async () => {
  await loadCourtData();
});

const computedGeneratePathLink = computed(() => {
  if (!readonlyUserLocation.value.location || !courtData.value?.location) {
    return "Unknown";
  }
  return generatePathLink(
    readonlyUserLocation.value.location,
    courtData.value?.location as GeoPoint
  );
});

const computedDistance = computed(() => {
  if (!courtData.value?.location) return null;
  return userLocationStore.getRelativeDistance(
    courtData.value?.location as GeoPoint,
    true
  );
});

onMounted(async () => {
  await loadCourtData();
});
</script>
