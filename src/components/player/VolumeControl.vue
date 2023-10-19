<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import BaseVerticalRangeInput from '@/components/base/BaseVerticalRangeInput.vue';

/*** DATA ***/
import { store } from '@/data/store';


export default {
    components: { BaseButton, BaseVerticalRangeInput },

    data: () => ({
        store
    }),

    computed: {

        /**
         * Update mute icon style
         */
        volumeIcon() {
            if (store.muted || store.volume === 0) return 'volume-mute';
            if (store.volume < 0.5) return 'volume-low';
            return 'volume-high';
        }
    }

}
</script>


<template>
    <div class="volume-control">

        <!-- Mute Button -->
        <BaseButton @click="store.muted = !store.muted" :icon="volumeIcon" size="lg" />

        <!-- Volume Range Input -->
        <div class="volume-range">
            <BaseVerticalRangeInput v-model:value="store.volume" :disabled="store.muted" />
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.volume-control {
    position: relative;

    .volume-range {
        height: 130px;
        position: absolute;
        bottom: 100%;
        left: 0;

        display: none;
        background-color: $col-light;
        border: 1px solid $col-gray-500;
        box-shadow: 0 0 4px 2px rgba($color: #000, $alpha: 0.1);
    }

    &:hover .volume-range {
        display: block;
    }
}
</style>