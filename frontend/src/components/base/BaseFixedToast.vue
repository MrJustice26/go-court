<template>
    <div v-show="computedIsToastVisible" :class="positionClassNamesResolver[position]" class="max-w-[500px] w-[80%] absolute left-[50%] -translate-x-[50%] z-[9999] flex items-center justify-between gap-x-4 min-h-[50px] text-zinc-900 bg-white border border-zinc-300  font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-zinc-900 dark:text-white dark:border-zinc-600 dark:focus:ring-zinc-700">
        <div class="flex items-center gap-x-3">
           <component :is="iconComponentResolver[type]" class="scale-125" />
           <div>
            <slot />
           </div>
       </div>
        <button v-show="isClosable" @click="closeFixedToast" class="p-1 inline-flex items-center justify-center hover:bg-zinc-700/10 dark:hover:bg-white/40 rounded-md">
            <v-icon name="io-close" class="scale-125" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { computed, h } from 'vue';

type BaseFixedToastProps = {
    type?: "info" | "success" | "error";
    position?: "top" | "bottom";
    isClosable?: boolean;
    isToastVisible: boolean;
}

const props = withDefaults(defineProps<BaseFixedToastProps>(), {
    isClosable: true,
    position: "top",
    type: "info"
});

const emit = defineEmits<{
    setToastVisibilityState: [visibilityState: boolean],
    closeClick: [],
}>();

const iconComponentResolver = {
    info: h(OhVueIcon, {name: 'md-info-round', class: 'fill-blue-400'}),
    success: h(OhVueIcon, {name: 'md-checkcircle-round', class: 'fill-green-400'}),
    error: h(OhVueIcon, {name: 'md-error-round', class: 'fill-red-400'}),
}

const computedIsToastVisible = computed({
    get: () => props.isToastVisible,
    set: (bool: boolean) => emit('setToastVisibilityState', bool)
});

const positionClassNamesResolver = {
    top: "top-[100px]",
    bottom: "bottom-[100px]"
}

const closeFixedToast = () => {
    computedIsToastVisible.value = false
    emit('closeClick');
}



</script>