<template>
  <div class="p-5">
    <div class="flex justify-between items-center mb-5">
      <RouterLink
        to="/"
        class="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-500 inline-block"
      >
        <v-icon name="bi-arrow-left" scale="2" />
      </RouterLink>
      <p class="text-2xl" v-if="courtData">
        {{ computedDistance }}
      </p>
      <a
        :href="computedGeneratePathLink"
        :aria-label="courtData?.readable_address"
        :title="courtData?.readable_address"
        target="_blank"
        class="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-500 rounded-md"
        v-if="courtData"
      >
        <v-icon name="gi-path-distance" scale="2" />
      </a>
    </div>
    <div v-if="isFetching">
      <LoadingGradient class="h-12 mb-3 rounded-md" />
      <LoadingGradient class="h-[300px] mb-10 rounded-md" />
      <LoadingGradient class="h-12 mb-3 rounded-md" />
      <LoadingGradient class="h-12 rounded-md" />
    </div>
    <div v-else>
      <BaseTabs :items="courtInfoTabs" v-model="selectedTab" class="mb-10" />

      <h1 class="text-2xl line-clamp-2 mb-2" :title="courtData?.name">
        {{ courtData?.name }}
      </h1>

      <img src="https://placehold.co/500x250" class="mb-4" />
      <p class="font-medium mb-10">
        {{ courtData?.readable_address }}
      </p>
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
import BaseTabs from "@/components/base/BaseTabs.vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { storeToRefs } from "pinia";
import { generatePathLink } from "@/utils/generate-path-link";
import { courtInfoTabs } from "@/constants/court-info-tabs";

// TODO convert to smaller pieces and even make it as view, not component
// TODO Create timeline (https://flowbite.com/docs/components/timeline/), which will show what is happened
// For example:
// 12:50 24.07
// Game 3x3
// Looking for a players, who wanna come in?
// Attend

const userLocationStore = useUserLocationStore();
const { readonlyUserLocation } = storeToRefs(userLocationStore);

type HomeCourtInfoProps = {
  courtId: string;
};

const selectedTab = ref(courtInfoTabs[0].value);

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
