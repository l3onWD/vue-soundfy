<script setup>
import { computed } from 'vue';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';

/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import PlayControl from '@/components/player/PlayControl.vue';
import TrackDetailCard from '@/components/tracks/TrackDetailCard.vue';


/*** PROPS ***/
const props = defineProps({
    track: {
        type: Object,
        required: true
    },

    listPosition: {
        type: Number,
        required: true
    }
});

/*** DATA ***/
const player = usePlayerStore();
const nextUp = useNextUpStore();


/*** COMPUTED ***/
const isActive = computed(() => {
    if (!nextUp.currentTrack) return false;
    // Check by list position cause duplicated tracks
    return nextUp.currentIndex === props.listPosition;
});

const isPlaying = computed(() => {
    return isActive.value && player.isPlaying;
});

const wasPlayed = computed(() => {
    return props.listPosition < nextUp.currentIndex;
});

const isLoading = computed(() => {
    return isActive.value && player.isLoading;
});


/*** FUNCTIONS ***/
const play = () => {

    // Check if this track is loading
    if (isLoading.value) return;

    // Update index and play related track
    if (!isActive.value) nextUp.goTo(props.listPosition);

    // Resume/Pause
    else isPlaying.value ? player.pauseTrack() : player.resumeTrack();
}

</script>


<template>
    <div class="nextup-item">

        <!-- Track Details -->
        <TrackDetailCard :track="track" :class="{ 'text-gray-700': wasPlayed, 'text-orange': isActive }" />

        <!-- Actions -->
        <ul class="nextup-item-actions ms-1">
            <li>
                <!-- Play Control -->
                <PlayControl @@play="play" :isLoading="isLoading" :isPlaying="isPlaying" />
            </li>
            <li>
                <BaseButton @click="nextUp.removeTrack(listPosition)" icon="trash" class="btn btn-ui"
                    :class="{ 'btn-disabled': isLoading || isActive }" :disabled="isLoading" />
            </li>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
.nextup-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-actions {
        display: flex;
    }
}
</style>