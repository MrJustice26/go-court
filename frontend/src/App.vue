<template>
  <TheHeader></TheHeader>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "@/components/layouts/TheHeader.vue";
</script>
