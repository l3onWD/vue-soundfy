<script setup>

/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';


/*** PROPS ***/
defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    isPlaying: {
        type: Boolean,
        default: false
    },
    big: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: Boolean,
        default: false
    },
    colorClass: {
        type: String,
        required: false
    }
});


/*** EVENTS ***/
const emit = defineEmits(['@play']);

</script>


<template>
    <BaseButton v-if="isLoading" icon="spinner" :iconSize="big ? '2xl' : 'lg'" class="btn btn-ui fa-spin-pulse"
        :class="[{ 'btn-lg': big, 'rounded-circle': rounded, }, colorClass]" />

    <BaseButton v-else @click="$emit('@play')" :icon="isPlaying ? 'pause' : 'play'" :iconSize="big ? '2xl' : 'lg'"
        class="btn btn-ui" :class="[{ 'btn-lg': big, 'rounded-circle': rounded, }, colorClass]" />
</template>