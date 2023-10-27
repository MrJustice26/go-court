
<template>
    <BaseFixedToast position="bottom" :is-toast-visible="createCourtStore.isUserOnCreationStateData" @close-click="resetCreateCourtStoreData">
        <div>
            <h2 class="text-lg font-medium">Wybierz punkt aby dodać nowy kort</h2>
            <div v-show="!isReadableAddressLoading && createCourtStore.createCourtData.readableAddress">
                <h4 class="font-light text-sm mb-3">Zaznaczyłeś: <span class="font-medium">{{ createCourtStore.createCourtData.readableAddress }}</span></h4>
                <BaseButton>Dodaj kort</BaseButton>
            </div>
            
        </div>
    </BaseFixedToast>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import BaseFixedToast from '@/components/base/BaseFixedToast.vue';
import BaseButton from "@/components/base/BaseButton.vue";
import { useCreateCourtStore } from '@/stores/createCourt';
import fetchService from '@/services/fetch.service';

const createCourtStore = useCreateCourtStore();

const computedCourtLocation = computed(() => {
    return createCourtStore.createCourtData.location
});

const isReadableAddressLoading = ref(false);

watch(computedCourtLocation, async (newLocation) => {
    if(!newLocation) return;

    isReadableAddressLoading.value = true;

    const result = await fetchService.getReadableAddressByLocation(newLocation).then(response => response?.address);
    if(!result) {
        console.log("Błąd pobrania danych dla", result);
        return;
    }

    createCourtStore.createCourtData.readableAddress = result;
    isReadableAddressLoading.value = false;
})

const resetCreateCourtStoreData = () => {
    createCourtStore.createCourtData = {
        location: null,
        readableAddress: '',
        description: '',
        name: ''
    },
    createCourtStore.isUserOnCreationStateData = false;
}


</script>