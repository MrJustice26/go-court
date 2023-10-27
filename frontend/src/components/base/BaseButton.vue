<template>
    <button
        type="button" :class="[baseCSSClassNames, buttonCSSClassNamesResolver[variant]]"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    variant?: "primary" | "default"
}>(), {
    variant: "default"
})

const baseCSSClassNames = "focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";
const defaultVariantCSSClassNames = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 dark:bg-graphite dark:text-white dark:border-gray-600 dark:hover:bg-zinc-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
const primaryVariantCSSClassNames = "text-white bg-emerald-500 border border-transparent focus:outline-none hover:bg-emerald-600 focus:ring-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400"

const buttonCSSClassNamesResolver = {
    default: defaultVariantCSSClassNames,
    primary: primaryVariantCSSClassNames
}

</script>
