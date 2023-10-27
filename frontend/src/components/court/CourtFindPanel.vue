<template>
  <div class="px-[10px] md:px-5 pb-5 max-h-[calc(100vh-70px)] overflow-y-auto">
    <div class="sticky top-0 pt-5">
      <h1 class="text-3xl font-medium text-center mb-5 dark:text-white">
        Find your court
      </h1>
      <HomeUserLocationSearchBar class="mb-10" />
      <HomeCourtSearchBar placeholder="Orlik im. Jay-Z" class="mb-5" />
    </div>
    <CourtCreateButton @click="isCreateModalVisible = true" />
    <CourtList />
    <Teleport to="body">
      <!-- <CourtCreateCancel /> -->
      <CourtCreateModal v-model="isCreateModalVisible" />
      <CourtCreateBottomToastPosition />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import HomeCourtSearchBar from "@/components/court/CourtSearchBar.vue";
import HomeUserLocationSearchBar from "@/components/home/UserLocationSearchBar.vue";
import CourtList from "@/components/court/CourtList.vue";
import CourtCreateBottomToastPosition from "./CourtCreateBottomToastPosition.vue";
import CourtCreateModal from "@/components/court/CourtCreateModal.vue";
import CourtCreateButton from "@/components/court/CourtCreateButton.vue";

import { ref } from "vue";
// import CourtCreateCancel from "./CourtCreateCancel.vue";

const isCreateModalVisible = ref(false);

</script>
