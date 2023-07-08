<template>
  <button
    class="w-full flex gap-x-2 items-center border py-4 px-3 rounded-md hover:bg-zinc-100 transition-colors"
  >
    <v-icon name="io-location-sharp" class="fill-zinc-800" scale="1.8" />
    <div class="w-full text-left">
      <div class="flex justify-between">
        <h4 class="text-lg font-medium">{{ name }}</h4>
        <span class="text-zinc-600 font-medium">1.5km</span>
      </div>
      <span class="text-left text-zinc-600 font-medium">{{ address }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
type HomeCourtCard = {
  name: string;
  address: string;
  location: [number, number];
};

defineProps<HomeCourtCard>();
</script>
