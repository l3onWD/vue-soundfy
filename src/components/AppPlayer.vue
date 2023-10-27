<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import MediaDetailsCard from '@/components/media/MediaDetailsCard.vue';
import TimeControl from '@/components/player/TimeControl.vue';
import VolumeControl from '@/components/player/VolumeControl.vue';
import NextUpModal from '@/components/nextup/NextUpModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { store } from '@/data/store';
import { usePlayerStore } from '@/stores/PlayerStore';
import { mapState, mapActions } from 'pinia';


export default {
    components: { TimeControl, MediaDetailsCard, VolumeControl, BaseButton, NextUpModal },

    data: () => ({
        store,
        audio: null,
        // currentTime: 0,
        nextUpModalActive: false
    }),

    computed: {

        ...mapState(usePlayerStore, ['isPlaying', 'isLoading', 'isEnded', 'currentTime', 'loop']),

        currentTrack() {
            return store.nextUpList[store.nextUpIndex];
        }
    },

    watch: {

        isEnded(ended) {
            if (ended) this.nextTrack();
        },

    },

    methods: {
        ...mapActions(usePlayerStore, ['fetchTrack', 'resumeTrack', 'pauseTrack', 'seekTrack', 'stopTrack', 'toggleTrackLoop']),


        play() {
            this.resumeTrack();
        },


        pause() {
            this.pauseTrack();
        },


        /**
         * Update current time from Time Control Bar
         * 
         * @param {Number} newTime 
         */
        handleTimeMoved(newTime) {
            if (this.isLoading) return;

            this.seekTrack(newTime, !this.isPlaying);
        },

        /**
         * Go to next Track or reset list
         */
        nextTrack() {

            // Check if list is ended
            if (store.nextUpIndex >= store.nextUpList.length - 1) {
                this.stopTrack();
            } else {
                store.nextUpIndex++;
                this.fetchTrack(store.nextUpList[store.nextUpIndex].id);
            }
        },

        /**
         * Go to previous Track or restart Track
         */
        prevTrack() {

            // Restart Track
            if (this.currentTime > 5 || store.nextUpIndex === 0) this.seekTrack(0);

            // Change to prev track
            else {
                store.nextUpIndex--;
                this.fetchTrack(store.nextUpList[store.nextUpIndex].id);
            }

        },

    },

    mounted() {

        // Create an audio instance
        // this.audio = new Audio();

        // Current time update
        // this.audio.addEventListener('timeupdate', () => { this.currentTime = this.audio.currentTime });

        // Reset Audio on End
        // this.audio.addEventListener('ended', this.nextTrack);
    }
}
</script>


<template>
    <div v-if="store.nextUpList.length" class="app-player">

        <div class="container">


            <!-- Track Info & Actions -->
            <div class="d-flex justify-content-between flex-shrink-0">

                <!-- Track Details -->
                <MediaDetailsCard :track="currentTrack" />


                <!-- Track Actions -->
                <ul class="d-flex flex-column flex-sm-row ms-1">
                    <!-- Favorite Button -->
                    <li>
                        <BaseButton icon="heart" iconStyle="far" />
                    </li>
                    <!-- Next Up Button -->
                    <li class="position-relative">
                        <BaseButton @click="nextUpModalActive = !nextUpModalActive" icon="list"
                            :class="{ 'active': nextUpModalActive }" />

                        <NextUpModal :isActive="nextUpModalActive" @close-modal="nextUpModalActive = false" />
                    </li>
                </ul>
            </div>


            <!-- Time Control -->
            <TimeControl @time-moved="handleTimeMoved" :currentTime="currentTime" :duration="currentTrack.duration" loading
                class="mx-md-4" />


            <!-- Main Track Controls -->
            <ul class="d-flex ms-auto">
                <li>
                    <VolumeControl class="me-sm-4" />
                </li>
                <li>
                    <BaseButton @click="prevTrack" icon="backward-step" />
                </li>
                <li>
                    <BaseButton v-if="isPlaying" @click="pause" icon="pause" size="lg"
                        :class="{ 'btn-disabled': isLoading }" :disabled="isLoading" />
                    <BaseButton v-else @click="play" icon="play" size="lg" :class="{ 'btn-disabled': isLoading }"
                        :disabled="isLoading" />
                </li>
                <li>
                    <BaseButton @click="nextTrack" icon="forward-step" />
                </li>
                <li>
                    <BaseButton @click="toggleTrackLoop" icon="repeat" :class="{ 'active': loop }" />
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