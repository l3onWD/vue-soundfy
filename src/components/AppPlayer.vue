<script setup>
import { ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';
import { storeToRefs } from 'pinia';

/*** COMPONENTS ***/
import TrackDetailCard from '@/components/tracks/TrackDetailCard.vue';
import PlayControl from '@/components/player/PlayControl.vue';
import TimeControl from '@/components/player/TimeControl.vue';
import VolumeControl from '@/components/player/VolumeControl.vue';
import NextUpModal from '@/components/nextup/NextUpModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';


/*** DATA ***/
const player = usePlayerStore();
const { isEnded, isLoading, isPlaying, loop, currentTime } = storeToRefs(player);
const { resumeTrack, pauseTrack, stopTrack, seekTrack, toggleTrackLoop } = player;

const nextUp = useNextUpStore();
const nextUpModalActive = ref(false);


/*** FUNCTIONS ***/
/**
 * Start or pause a track
 */
const play = () => {

    // Check if is loading
    if (isLoading.value) return;

    // Resume/Pause
    isPlaying.value ? pauseTrack() : resumeTrack();
}

/**
 * Go to next Track or reset list
 */
const goNextTrack = () => {

    // Check if list is ended
    if (!nextUp.nextTrack) stopTrack();
    else nextUp.goTo('next');

}

/**
 * Go to previous Track or restart Track
 */
const goPrevTrack = () => {

    // Restart Track
    if (currentTime.value > 5 || !nextUp.prevTrack) seekTrack(0);

    // Change to prev track
    else nextUp.goTo('prev');

}

/**
 * Update current time from Time Control Bar
 * 
 * @param {Number} newTime 
 */
const handleTimeMoved = newTime => {
    if (isLoading.value) return;

    seekTrack(newTime, !isPlaying.value);
}


/*** UPDATE ***/
watch(isEnded, () => {
    if (isEnded.value) goNextTrack();
});

</script>


<template>
    <div v-if="nextUp.totalTracks" class="app-player">

        <div class="container">


            <!-- Track Info & Actions -->
            <div class="d-flex justify-content-between flex-shrink-0">

                <!-- Track Details -->
                <TrackDetailCard :track="nextUp.currentTrack" />


                <!-- Track Actions -->
                <ul class="d-flex flex-column flex-sm-row ms-1">
                    <!-- Favorite Button -->
                    <li>
                        <BaseButton icon="heart" iconStyle="far" class="btn btn-ui" />
                    </li>
                    <!-- Next Up Button -->
                    <li class="position-relative">
                        <BaseButton @click="nextUpModalActive = !nextUpModalActive" icon="list" class="btn btn-ui"
                            :class="{ 'active': nextUpModalActive }" />

                        <NextUpModal :isActive="nextUpModalActive" @close-modal="nextUpModalActive = false" />
                    </li>
                </ul>
            </div>


            <!-- Time Control -->
            <TimeControl @time-moved="handleTimeMoved" :currentTime="currentTime" :duration="nextUp.currentTrack.duration"
                loading class="mx-md-4" />


            <!-- Main Track Controls -->
            <ul class="d-flex ms-auto">
                <li>
                    <VolumeControl class="me-sm-4" />
                </li>
                <li>
                    <BaseButton @click="goPrevTrack" icon="backward-step" class="btn btn-ui" />
                </li>
                <li>
                    <!-- Play Control -->
                    <PlayControl @@play="play" :isLoading="isLoading" :isPlaying="isPlaying" />

                </li>
                <li>
                    <BaseButton @click="goNextTrack" icon="forward-step" class="btn btn-ui" />
                </li>
                <li>
                    <BaseButton @click="toggleTrackLoop" icon="repeat" class="btn btn-ui" :class="{ 'active': loop }" />
                </li>
            </ul>


        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.app-player {
    height: $layout-player;
    position: relative;

    background-color: $col-light;
    border-top: 1px solid $col-gray-500;
    border-bottom: 1px solid $col-gray-500;

    >.container {
        height: 100%;

        display: flex;
        align-items: center;

        >:first-child {
            width: 210px;
        }
    }
}
</style>