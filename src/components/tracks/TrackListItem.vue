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
    return nextUp.currentTrack.uid === props.track.uid;
});

const isPlaying = computed(() => {
    return isActive.value && player.isPlaying;
});

const isLoading = computed(() => {
    return isActive.value && player.isLoading;
});


/*** FUNCTIONS ***/
const handlePlay = () => {
    emit('@play', props.track.uid, props.listPosition);
}


/*** EVENTS ***/
const emit = defineEmits(['@play']);

</script>


<template>
    <div class="track-list-item">

        <span class="me-3">{{ (listPosition + 1) }}</span>

        <TrackDetailCard :track="track" :class="{ 'text-orange': isActive }" />

        <ul class="d-flex align-items-center">
            <li>
                <BaseButton icon="heart" iconStyle="far" title="Like" class="btn btn-ui" />
            </li>

            <li>
                <BaseButton @click="nextUp.addTracks([track])" icon="list" title="Add to Next Up" class="btn btn-ui" />
            </li>

            <li>
                <!-- Play Control -->
                <PlayControl @@play="handlePlay" :isLoading="isLoading" :isPlaying="isPlaying" />
            </li>

        </ul>

    </div>
</template>


<style lang="scss" scoped>
.track-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>