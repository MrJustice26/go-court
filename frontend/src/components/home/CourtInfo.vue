<template>
  <div class="p-5 relative">
    <RouterLink
      to="/"
      :class="isFetching && 'bg-zinc-900'"
      class="absolute top-6 left-6 p-2 rounded-md bg-zinc-500 hover:bg-zinc-700 transition-colors z-[1]"
    >
      <v-icon name="bi-arrow-left-short" scale="2" />
    </RouterLink>
    <button
      :class="isFetching && 'bg-zinc-900'"
      class="absolute top-6 right-6 p-2 rounded-md bg-zinc-500 hover:bg-zinc-700 transition-colors z-[1]"
    >
      <v-icon name="bi-star" scale="2" class="fill-white" />
    </button>
    <div v-if="isFetching">
      <LoadingGradient class="h-[300px] mb-10 rounded-md" />
      <LoadingGradient class="h-12 mb-3 rounded-md" />
      <LoadingGradient class="h-12 rounded-md" />
    </div>
    <div v-else>
      <div class="relative mb-10">
        <img src="https://placehold.co/600x400" class="rounded-t-md" />
        <p
          class="absolute bottom-0 left-0 p-3 bg-zinc-800 w-full text-lg max-w-[600px]"
        >
          {{ courtData?.readable_address }}
        </p>
      </div>
      <h1 class="text-3xl text-center mb-3">{{ courtData?.name }}</h1>
      <div class="text-base" v-html="courtData?.description"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import fetchService from "@/services/fetch.service";
import { toRefs, ref, watch, onMounted } from "vue";
import { CourtFromAPI } from "@/types";
import LoadingGradient from "@/components/base/LoadingGradient.vue";

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

onMounted(async () => {
  await loadCourtData();
});
</script>
