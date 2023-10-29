<template>
    <div v-show="computedIsAlertVisible" :class="alertCSSClassNamesResolver[type]" class="w-full flex items-center justify-between gap-x-4 min-h-[50px] font-medium rounded-lg px-5 py-2.5 mr-2 mb-2">
        <div class="flex items-center gap-x-3">
           <component :is="iconComponentResolver[type]" class="scale-125" />
           <div>
            <slot />
           </div>
       </div>
        <button v-show="isClosable" @click="closeAlert" class="p-1 inline-flex items-center justify-center hover:bg-zinc-700/10 dark:hover:bg-white/40 rounded-md">
            <v-icon name="io-close" class="scale-125" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { computed, h } from 'vue';

type BaseFixedToastProps = {
    type?: "info" | "success" | "error";
    modelValue: boolean;
    isClosable?: boolean
}

const props = withDefaults(defineProps<BaseFixedToastProps>(), {
    isClosable: false,
    type: "info"
});

const emit = defineEmits<{
    "update:modelValue": [visibilityState: boolean],
    closeClick: [],
}>();

const iconComponentResolver = {
    info: h(OhVueIcon, {name: 'md-info-round', class: 'fill-blue-400'}),
    success: h(OhVueIcon, {name: 'md-checkcircle-round', class: 'fill-green-400'}),
    error: h(OhVueIcon, {name: 'md-error-round', class: 'fill-red-400'}),
}

const alertCSSClassNamesResolver = {
    info: "text-blue-400 bg-blue-50 border-blue-200 focus:ring-blue-200 dark:bg-blue-900 dark:text-white dark:border-blue-600 dark:focus:ring-blue-700",
    success: "text-green-400 bg-green-50 border-green-200 focus:ring-green-200 dark:bg-green-900 dark:text-white dark:border-green-600 dark:focus:ring-green-700",
    error: "text-red-400 bg-red-50 border-red-200 focus:ring-red-200 dark:bg-red-900 dark:text-white dark:border-red-600 dark:focus:ring-red-700",
}

const computedIsAlertVisible = computed({
    get: () => props.modelValue,
    set: (bool: boolean) => emit('update:modelValue', bool)
});


const closeAlert = () => {
    computedIsAlertVisible.value = false
    emit('closeClick');
}



</script>