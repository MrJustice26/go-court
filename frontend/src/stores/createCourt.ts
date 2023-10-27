import { CreateCourt } from "@/types";
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
            Object.assign(createCourtState.value, newData);
        },
    });

    const isUserOnCreationStateData = computed({
        get: () => isUserOnCreationState.value,
        set: (newState: boolean) => {
            isUserOnCreationState.value = newState;
        },
    })

    return {
        createCourtData,
        isUserOnCreationStateData,
    }
})