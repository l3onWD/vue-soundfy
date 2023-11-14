<script setup>
import { computed } from 'vue';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';

/*** COMPONENTS ***/
import TrackListItem from '@/components/tracks/TrackListItem.vue';


/*** PROPS ***/
const props = defineProps({
    tracks: {
        type: Array,
        default: []
    }
});


/*** DATA ***/
const player = usePlayerStore();
const nextUp = useNextUpStore();


/*** COMPUTED ***/
const isActive = computed(() => {
    if (!nextUp.currentTrack) return false;
    return props.tracks.some(({ uid }) => nextUp.currentTrack.uid === uid);
});

const isPlaying = computed(() => {
    return isActive.value && player.isPlaying;
});

const isLoading = computed(() => {
    return isActive.value && player.isLoading;
});


/*** FUNCTIONS ***/
const play = (uid, index) => {

    // Check if this media is loading
    if (isLoading.value) return;

    // Set Media to next up list and play clicked track
    if (!isActive.value || nextUp.currentTrack.uid !== uid) nextUp.setTracks(props.tracks, index);

    // Resume/Pause
    else isPlaying.value ? player.pauseTrack() : player.resumeTrack();

}

</script>


<template>
    <h4>Tracks</h4>

    <ul class="track-list">
        <li v-for="(track, idx) in tracks" :key="track.id">

            <TrackListItem :track="track" :listPosition="idx" @@play="play" />

        </li>
    </ul>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.track-list {

    li {
        padding: 0.5rem 0;

        border-bottom: 1px solid $col-gray-300;

        &:first-child {
            border-top: 1px solid $col-gray-300;
        }
    }
}
</style>