<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { store } from '@/data/store';


export default {
    components: { BaseButton },
    data: () => ({ store }),
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['close-list']

}
</script>


<template>
    <div v-if="isActive" class="nextup-list">

        <!-- Header -->
        <div class="nextup-header mb-3">
            <h4 class="mb-0">Next up</h4>
            <BaseButton @click="$emit('close-list')" icon="times" size="xl" />
        </div>

        <!-- Songs -->
        <ul>
            <li v-for="song in store.nextUpList" :key="song.id">
                {{ song.title }}
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.nextup-list {
    width: 250px;
    padding: 1rem;
    position: absolute;
    bottom: 60px;
    left: -125px;

    background-color: $col-light;
    border: 1px solid $col-gray-500;
    border-radius: 0.5rem;

    .nextup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}

@media screen and (min-width: 576px) {
    .nextup-list {
        bottom: 50px;
    }
}
</style>