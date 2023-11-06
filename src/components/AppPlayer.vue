<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import TrackDetailCard from '@/components/tracks/TrackDetailCard.vue';
import PlayControl from '@/components/player/PlayControl.vue';
import TimeControl from '@/components/player/TimeControl.vue';
import VolumeControl from '@/components/player/VolumeControl.vue';
import NextUpModal from '@/components/nextup/NextUpModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';


export default {
    components: { PlayControl, TimeControl, TrackDetailCard, VolumeControl, BaseButton, NextUpModal },

    data: () => ({
        nextUpModalActive: false,
        player: usePlayerStore(),
        nextUp: useNextUpStore()
    }),

    watch: {

        'player.isEnded'(ended) {
            if (ended) this.goNextTrack();
        },

    },

    methods: {

        play() {

            if (this.player.isLoading) return;

            this.player.isPlaying ? this.player.pauseTrack() : this.player.resumeTrack();
        },


        /**
         * Update current time from Time Control Bar
         * 
         * @param {Number} newTime 
         */
        handleTimeMoved(newTime) {
            if (this.player.isLoading) return;

            this.player.seekTrack(newTime, !this.player.isPlaying);
        },


        /**
         * Go to next Track or reset list
         */
        goNextTrack() {

            // Check if list is ended
            if (!this.nextUp.nextTrack) {
                this.player.stopTrack();
            } else {
                this.player.fetchTrack(this.nextUp.nextTrack);
                this.nextUp.goTo('next');
            }
        },


        /**
         * Go to previous Track or restart Track
         */
        goPrevTrack() {

            // Restart Track
            if (this.player.currentTime > 5 || !this.nextUp.prevTrack) this.player.seekTrack(0);

            // Change to prev track
            else {
                this.player.fetchTrack(this.nextUp.prevTrack);
                this.nextUp.goTo('prev');
            }

        },

    }
}
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
            <TimeControl @time-moved="handleTimeMoved" :currentTime="player.currentTime"
                :duration="nextUp.currentTrack.duration" loading class="mx-md-4" />


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
                    <PlayControl @@play="play" :isLoading="player.isLoading" :isPlaying="player.isPlaying" />

                </li>
                <li>
                    <BaseButton @click="goNextTrack" icon="forward-step" class="btn btn-ui" />
                </li>
                <li>
                    <BaseButton @click="player.toggleTrackLoop" icon="repeat" class="btn btn-ui"
                        :class="{ 'active': player.loop }" />
                </li>
            </ul>


        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


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