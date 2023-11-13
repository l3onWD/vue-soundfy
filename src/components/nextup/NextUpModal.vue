<script setup>
import { useNextUpStore } from '@/stores/NextUpStore';

/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import NextUpListItem from '@/components/nextup/NextUpListItem.vue';


/*** DATA ***/
const nextUp = useNextUpStore();


/*** PROPS ***/
const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
});

/*** EVENTS ***/
defineEmits(['close-modal']);

</script>


<template>
    <div v-if="isActive" class="nextup-modal">

        <!-- Header -->
        <div class="nextup-header">

            <!-- Title -->
            <h4 class="mb-0">Next up</h4>

            <!-- Actions -->
            <div class="d-flex align-items-center">
                <BaseButton @click="nextUp.clearAllTracks" label="clear" class="btn btn-outline-orange me-2">clear
                </BaseButton>
                <BaseButton @click="$emit('close-modal')" icon="times" iconSize="xl" class="btn btn-ui" />
            </div>
        </div>

        <!-- Tracks -->
        <ul class="nextup-list">
            <li v-for="(track, idx) in nextUp.tracks" :key="track.id" class="py-1">

                <NextUpListItem :track="track" :listPosition="idx" />

            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.nextup-modal {
    width: 250px;
    position: absolute;
    bottom: 60px;
    left: -125px;

    background-color: #fff;
    border: 1px solid $col-gray-500;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 4px 8px rgba($color: #000, $alpha: 0.05);

    .nextup-header {
        padding: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $col-light;
    }

    .nextup-list {
        padding: 0.5rem;
        max-height: 210px;

        overflow-y: auto;

        li:hover {
            background-color: $col-light;
        }
    }

}

@media screen and (min-width: 576px) {
    .nextup-modal {
        bottom: 50px;
    }
}
</style>