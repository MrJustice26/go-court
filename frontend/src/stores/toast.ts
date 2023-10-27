import { ToastData } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
    const toastData = ref<ToastData>({
        text: "",
        type: "success",
    });

    const isToastVisible = ref(false);
    const isClosable = ref(true);

    return {
        toastData,
        isToastVisible,
        isClosable
    }
})