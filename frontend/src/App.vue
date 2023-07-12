<template>
  <div class="dark:bg-zinc-700 bg-white">
    <TheHeader></TheHeader>
    <main>
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
