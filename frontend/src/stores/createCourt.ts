import fetchService from "@/services/fetch.service";
import { CourtFromAPI, CreateCourt } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useCreateCourtStore = defineStore("create-court", () => {
    const isUserOnCreationState = ref(false);
    const createCourtState = ref<CreateCourt>({
        name: "",
        description: "",
        location: null,
        readableAddress: "",
    });

    
    const createCourtData = computed({
        get: () => createCourtState.value,
        set: (newData: Partial<CreateCourt>) => {
            console.log("CHANGED");
            Object.assign(createCourtState.value, newData);
        },
    });

    const isUserOnCreationStateData = computed({
        get: () => isUserOnCreationState.value,
        set: (newState: boolean) => {
            isUserOnCreationState.value = newState;
        },
    })

    const createNewCourt = async () => {
        return await fetchService.createCourt(createCourtState.value);
    }

    const clearCreateCourtData = () => {
        createCourtState.value = {
            name: "",
            description: "",
            location: null,
            readableAddress: "",
        };
    }

    return {
        createCourtData,
        isUserOnCreationStateData,
        createNewCourt,
        clearCreateCourtData
    }
})