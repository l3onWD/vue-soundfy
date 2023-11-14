<script setup>
import { computed, ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/PlayerStore';

/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import BaseVerticalRangeInput from '@/components/base/BaseVerticalRangeInput.vue';


/*** DATA ***/
const player = usePlayerStore();
const volume = ref(1);


/*** COMPUTED ***/
/**
 * Update mute icon style
 */
const volumeIcon = computed(() => {
    if (player.muted || volume.value === 0) return 'volume-mute';
    if (volume.value < 0.5) return 'volume-low';
    return 'volume-high';
});


/*** UPDATE ***/
watch(volume, () => {
    player.setTrackVolume(volume.value);
});

</script>


<template>
    <div class="volume-control">

        <!-- Mute Button -->
        <BaseButton @click="player.toggleTrackMuted" :icon="volumeIcon" iconSize="lg" class="btn btn-ui" />

        <!-- Volume Range Input -->
        <div class="volume-range">
            <BaseVerticalRangeInput v-model:value="volume" :disabled="player.muted" />
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

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