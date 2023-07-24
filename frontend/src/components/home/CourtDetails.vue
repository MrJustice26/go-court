<template>
  <div class="max-h-[calc(100vh-70px)]">
    <div
      class="px-5 pt-5 pb-2 sticky top-0 mb-10 dark:bg-zinc-900 bg-zinc-50 z-10"
    >
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
      <BaseTabs
        :items="courtInfoTabs"
        v-model="selectedTab"
        class="font-medium"
      />
    </div>
    <div class="px-5 pb-5">
      <div v-if="isFetching || !courtData">
        <LoadingGradient class="h-12 mb-3 rounded-md" />
        <LoadingGradient class="h-[300px] mb-10 rounded-md" />
        <LoadingGradient class="h-12 mb-3 rounded-md" />
        <LoadingGradient class="h-12 rounded-md" />
      </div>
      <div v-else>
        <div v-show="isInformationTabSelected">
          <CourtInfo :court="courtData!" />
        </div>
        <div v-show="isTimelineTabSelected">
          <BaseTimeline :items="courtTimeline" />
        </div>
      </div>
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
import BaseTimeline from "@/components/base/timeline/Timeline.vue";
import CourtInfo from "./CourtInfo.vue";
import { TimelineItemProps } from "@/components/base/timeline/timeline.interface";

const userLocationStore = useUserLocationStore();
const { readonlyUserLocation } = storeToRefs(userLocationStore);

type HomeCourtInfoProps = {
  courtId: string;
};

const selectedTab = ref(courtInfoTabs[0].value);
const isInformationTabSelected = computed(
  () => selectedTab.value === "information"
);
const isTimelineTabSelected = computed(() => selectedTab.value === "timeline");

const props = defineProps<HomeCourtInfoProps>();
const { courtId } = toRefs(props);

const courtData = ref<CourtFromAPI | null>(null);
const courtTimeline = ref<TimelineItemProps[]>([]);
const isFetching = ref(true);

const router = useRouter();

const loadCourtData = async () => {
  if (!courtId.value) {
    router.push({ path: "/" });
    return;
  }

  isFetching.value = true;

  const receivedCourtData = await fetchService.getCourtById(courtId.value);
  if (!receivedCourtData) {
    router.push({ path: "/" });
  }
  courtData.value = receivedCourtData;
  setTimelineDataLikeReceivedFromBackend();
  isFetching.value = false;
};

watch(courtId, async () => {
  await loadCourtData();
});

const computedGeneratePathLink = computed(() => {
  if (!readonlyUserLocation.value.location || !courtData.value?.location) {
    return undefined;
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

const setTimelineDataLikeReceivedFromBackend = () => {
  courtTimeline.value = [
    {
      text: "Lorem ipsum dolor sit amte",
      timeText: new Date().toLocaleString(),
      title: "Match 3x3 has been started!",
    },
    {
      text: "Hahaha looool",
      timeText: new Date("10-10-2020").toLocaleString(),
      title: "Match 1x1",
    },
    {
      text: "Lorem ipsum dolor sit amte",
      timeText: new Date().toLocaleString(),
      title: "Match 3x3 has been started!",
    },
    {
      text: "Hahaha looool",
      timeText: new Date("10-10-2020").toLocaleString(),
      title: "Match 1x1",
    },
    {
      text: "Lorem ipsum dolor sit amte",
      timeText: new Date().toLocaleString(),
      title: "Match 3x3 has been started!",
    },
    {
      text: "Hahaha looool",
      timeText: new Date("10-10-2020").toLocaleString(),
      title: "Match 1x1",
    },
  ];
};

onMounted(async () => {
  await loadCourtData();
});
</script>
