<template>
    <Dialog v-model:visible="computedVisible" modal header="Utwórz kort">
        <form @submit.prevent="submitForm">
            <div class="mb-5">
                <label for="create-court-name" class="block text-sm font-medium text-emerald-600 dark:text-emerald-300 mb-1">Nazwa kortu</label>
                <InputText class="w-full" id="create-court-name" v-model="createCourtData.name" />
            </div>
            <div class="mb-5">
                <label for="create-court-location" class="block text-sm font-medium text-emerald-600 dark:text-emerald-300 mb-1">Lokacja kortu</label>
                <InputText class="w-full" id="create-court-location" v-model="createCourtData.location" disabled />
            </div>
            <div class="mb-10">
                <label for="create-court-description" class="block text-sm font-medium text-emerald-600 dark:text-emerald-300 mb-1">Opis kortu</label>
                <Textarea autoResize rows="5" class="w-full" id="create-court-description" v-model="createCourtData.description" />
                
            </div>

            <BaseButton class="w-full" type="submit" variant="primary">Utwórz</BaseButton>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
import {computed, reactive} from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';

const props = defineProps<{
    modelValue: boolean;
}>()
const emit = defineEmits<{
    'update:modelValue': [newValue: boolean]
}>()

const computedVisible = computed({
    get(){
        return props.modelValue;
    }, set(newValue){
        emit('update:modelValue', newValue);
    }
})

const createCourtData = reactive({
    name: '',
    description: '',
    location: null,
    readableAddress: ''
})

const submitForm = () => {
    console.log(createCourtData);
}
</script>