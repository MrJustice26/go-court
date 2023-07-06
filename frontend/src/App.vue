<template>
  <TheHeader class="mb-10"></TheHeader>
  <main>
    <BaseContainer>
      <RouterView></RouterView>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "@/components/layouts/TheHeader.vue";
import BaseContainer from "@/components/base/BaseContainer.vue";
</script>
