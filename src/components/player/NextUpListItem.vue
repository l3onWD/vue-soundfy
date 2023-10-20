<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import MediaDetailsCard from '@/components/media/MediaDetailsCard.vue';

/*** DATA ***/
import { store } from '@/data/store';


export default {
    components: { BaseButton, MediaDetailsCard },

    data: () => ({ store }),

    props: {
        song: {
            type: Object,
            required: true
        },

        listPosition: {
            type: Number,
            required: true
        }
    },

    methods: {
        removeSong() {
            if (store.nextUpList.length <= 1) return;

            if (this.listPosition < store.nextUpIndex) store.nextUpIndex--;
            store.nextUpList.splice(this.listPosition, 1);
        }
    }

}
</script>


<template>
    <div class="d-flex justify-content-between align-items-center ">

        <!-- Song Details -->
        <MediaDetailsCard :song="song" :class="{ 'col-gray-700': listPosition < store.nextUpIndex }" />

        <!-- Actions -->
        <ul class="d-flex flex-grow-1">
            <li>
                <BaseButton @click="removeSong" icon="trash" />
            </li>
        </ul>

    </div>
</template>


<style></style>