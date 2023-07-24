<template>
  <div class="px-[10px] md:px-5 pb-5 max-h-[calc(100vh-70px)] overflow-y-auto">
    <div class="sticky top-0 pt-5">
      <h1 class="text-3xl font-medium text-center mb-5 dark:text-white">
        Find your court
      </h1>
      <HomeUserLocationSearchBar class="mb-10" />
      <HomeCourtSearchBar placeholder="Orlik im. Jay-Z" class="mb-5" />
    </div>
    <CourtsList />
  </div>
</template>

<script setup lang="ts">
import HomeCourtSearchBar from "./CourtSearchBar.vue";
import HomeUserLocationSearchBar from "./UserLocationSearchBar.vue";
import CourtsList from "./CourtsList.vue";
</script>
