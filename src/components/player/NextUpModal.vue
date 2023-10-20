<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import PlayerDetails from '@/components/player/PlayerDetails.vue';


/*** DATA ***/
import { store } from '@/data/store';


export default {
    components: { BaseButton, PlayerDetails },

    data: () => ({ store }),

    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },

    emits: ['close-modal']

}
</script>


<template>
    <div v-if="isActive" class="nextup-modal">

        <!-- Header -->
        <div class="nextup-header">

            <!-- Title -->
            <h4 class="mb-0">Next up</h4>

            <!-- Actions -->
            <div class="d-flex align-items-center">
                <BaseButton label="clear" class="btn-outline-orange w-auto px-2 me-2" />
                <BaseButton @click="$emit('close-modal')" icon="times" size="xl" />
            </div>
        </div>

        <!-- Songs -->
        <ul class="nextup-list">
            <li v-for="(song, idx) in store.nextUpList" :key="song.id"
                class="d-flex justify-content-between align-items-center py-1">

                <PlayerDetails :song="song" :class="{ 'col-gray-700': idx < store.nextUpIndex }" />

                <div>
                    <BaseButton @click="$emit('close-modal')" icon="trash" />
                </div>
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.nextup-modal {
    width: 250px;
    position: absolute;
    bottom: 60px;
    left: -125px;

    background-color: #fff;
    border: 1px solid $col-gray-500;
    border-radius: 0.5rem;
    overflow: hidden;

    .nextup-header {
        padding: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $col-light;
    }

    .nextup-list {
        padding: 0.5rem;
    }

}

@media screen and (min-width: 576px) {
    .nextup-modal {
        bottom: 50px;
    }
}
</style>