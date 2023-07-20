<template>
  <div class="p-5 relative">
    <div class="relative">
      <img src="https://placehold.co/600x300" class="rounded-t-md mb-10" />
      <div class="absolute bottom-0 py-3 px-4 bg-zinc-900/80 text-white w-full">
        {{ courtData?.readable_address }}
      </div>
    </div>
    <h1 class="text-3xl text-center mb-3">{{ courtData?.name }}</h1>
    <div class="text-base" v-html="courtData?.description"></div>
    <RouterLink
      to="/"
      class="absolute top-6 left-6 p-2 rounded-md bg-zinc-500 hover:bg-zinc-700 transition-colors"
    >
      <v-icon name="bi-arrow-left-short" scale="2" />
    </RouterLink>
    <button
      class="absolute top-6 right-6 p-2 rounded-md bg-zinc-500 hover:bg-zinc-700 transition-colors"
    >
      <v-icon name="bi-star" scale="2" class="fill-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import fetchService from "@/services/fetch.service";
import { toRefs, ref, onMounted, watch } from "vue";
import { Court } from "@/types";

type CourtInfo = {
  courtId: string;
};

const props = defineProps<CourtInfo>();
const { courtId } = toRefs(props);
const courtData = ref<Court | null>(null);

const router = useRouter();

const loadCourtData = async () => {
  if (!courtId.value) {
    router.push({ path: "/" });
  }

  const receivedCourtData = await fetchService.getCourtById(courtId.value);
  if (!receivedCourtData) {
    router.push({ path: "/" });
  }
  courtData.value = receivedCourtData;
};

onMounted(async () => await loadCourtData());

watch(courtId, () => {
  console.log("Court id changed");
  loadCourtData();
});
</script>
