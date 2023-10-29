<template>
  <div class="px-[10px] md:px-5 pb-5 max-h-[calc(100vh-70px)] overflow-y-auto">
    <div class="sticky top-0 pt-5 flex items-center justify-between mb-5">
      <button
        class="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-500 inline-block"
        @click="createCourtStore.isUserOnCreationStateData = false"
      >
        <v-icon name="bi-arrow-left" scale="2" />
      </button>
      <h1 class="text-3xl font-medium text-center dark:text-white">
        Utwórz kort
      </h1>
      <div class="w-[50px]"></div>
    </div>
    <BaseAlert v-model="isAlertVisible" class="mb-5">
        Zaznacz lokację kortu na mapie
    </BaseAlert>
    <form @submit.prevent="submitForm">
        <div class="mb-5">
          <label
            for="create-court-name"
            class="block text-sm font-medium text-emerald-600 dark:text-emerald-300 mb-1"
            >Nazwa kortu</label
          >
          <BaseInput
            class="w-full"
            id="create-court-name"
            v-model="computedCreateCourtName"
          />
        </div>
        <div class="mb-5">
          <label
            for="create-court-location"
            class="block text-sm font-medium text-emerald-600 dark:text-emerald-300 mb-1"
            >Lokacja kortu</label
          >
          <BaseInput
            class="w-full"
            id="create-court-location"
            :value="computedCreateCourtReadableAddress"
            disabled
          />
        </div>
        <div class="mb-10">
          <label
            for="create-court-description"
            class="block text-sm font-medium text-emerald-600 dark:text-emerald-300 mb-1"
            >Opis kortu</label
          >
          <BaseTextArea
            class="w-full"
            id="create-court-description"
            v-model="computedCreateCourtDescription"
          />
        </div>

        <BaseButton class="w-full" type="submit" variant="primary"
          >Utwórz</BaseButton
        >
      </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCreateCourtStore } from "@/stores";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import { useToast } from "vue-toastification";
import {textEllipsis} from "@/utils/textEllipsis"

const toast = useToast();

const createCourtStore = useCreateCourtStore();

const computedCreateCourtName = computed({
    get(){
        return createCourtStore.createCourtData.name
    },
    set(newValue){
        createCourtStore.createCourtData.name = newValue;
        
    }
})

const computedCreateCourtDescription = computed({
    get(){
        return createCourtStore.createCourtData.description
    },
    set(newValue){
        createCourtStore.createCourtData.description = newValue;
    }
})

const computedCreateCourtReadableAddress = computed(() => {
  if(!createCourtStore.createCourtData.readableAddress){
    return "Wybierz lokację kortu na mapie"
  }

  return createCourtStore.createCourtData.readableAddress;
})

const isAlertVisible = ref(true);

const submitForm = async () => {
  if(!createCourtStore.createCourtData.location || !createCourtStore.createCourtData.readableAddress){
    toast.error("Wybierz lokację kortu na mapie");
    return;
  }

  const data = await createCourtStore.createNewCourt();
  toast.success(`Kort ${textEllipsis(data.name, 20)} został utworzony`);

  clearCreateCourtData();
};

const clearCreateCourtData = () => {
  createCourtStore.clearCreateCourtData();
}

</script>
@/utils/textEllipsis