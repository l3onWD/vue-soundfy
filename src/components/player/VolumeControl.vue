<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import BaseVerticalRangeInput from '@/components/base/BaseVerticalRangeInput.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { mapState, mapActions } from 'pinia';


export default {
    components: { BaseButton, BaseVerticalRangeInput },

    data: () => ({ volume: 1 }),

    computed: {

        ...mapState(usePlayerStore, ['muted']),

        /**
         * Update mute icon style
         */
        volumeIcon() {
            if (this.muted || this.volume === 0) return 'volume-mute';
            if (this.volume < 0.5) return 'volume-low';
            return 'volume-high';
        }
    },

    watch: {
        volume(value) {
            this.setTrackVolume(value);
        }
    },
    methods: {
        ...mapActions(usePlayerStore, ['setTrackVolume', 'toggleTrackMuted'])
    }

}
</script>


<template>
    <div class="volume-control">

        <!-- Mute Button -->
        <BaseButton @click="toggleTrackMuted" :icon="volumeIcon" size="lg" />

        <!-- Volume Range Input -->
        <div class="volume-range">
            <BaseVerticalRangeInput v-model:value="volume" :disabled="muted" />
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