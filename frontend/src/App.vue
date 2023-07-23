<template>
  <div class="dark:bg-zinc-700 bg-zinc-50 text-zinc-700 dark:text-white">
    <TheHeader />
    <main class="min-h-[calc(100vh-70px)]">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/layouts/TheHeader.vue";
import { useUserLocationStore } from "@/stores/userLocation";
import { onMounted } from "vue";

onMounted(() => {
  const useLocationStore = useUserLocationStore();
  useLocationStore.loadUserLocationData();
});
</script>
