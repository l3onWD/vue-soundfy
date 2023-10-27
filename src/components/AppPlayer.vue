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

        ...mapState(usePlayerStore, ['isPlaying', 'isLoading', 'currentTime']),

        currentSong() {
            return store.nextUpList[store.nextUpIndex];
        }
    },

    watch: {

        /**
         * Volume watcher
         */
        'store.volume'(newValue) {
            store.muted = false;
            this.audio.volume = newValue;
        },

        /**
         * Muted toggler watcher
         */
        'store.muted'(newValue) {
            this.audio.muted = newValue;
        }
    },

    methods: {
        ...mapActions(usePlayerStore, ['resumeTrack', 'pauseTrack', 'seekTrack']),


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
            this.seekTrack(newTime, !this.isPlaying);
        },

        /**
         * Go to next Song or reset list
         */
        nextSong() {

            // // Increment index or reset and stop
            // if (++store.nextUpIndex >= store.nextUpList.length) {

            //     store.nextUpIndex = 0;

            //     // Delayed stop (bypassing watcher)
            //     setTimeout(() => {
            //         this.store.isPlaying = false;
            //         this.audio.currentTime = 0;
            //     }, 200);
            // }
        },

        /**
         * Go to previous Song or restart song
         */
        prevSong() {

            // // Restart Song
            // if (this.audio.currentTime > 5) this.audio.currentTime = 0;

            // // Decrement index or restart first song
            // else if (--store.nextUpIndex < 0) {

            //     store.nextUpIndex = 0;
            //     this.audio.currentTime = 0;
            // }

        },

    },

    mounted() {

        // Create an audio instance
        // this.audio = new Audio();

        // Current time update
        // this.audio.addEventListener('timeupdate', () => { this.currentTime = this.audio.currentTime });

        // Reset Audio on End
        // this.audio.addEventListener('ended', this.nextSong);
    }
}
</script>


<template>
    <div v-if="store.nextUpList.length" class="app-player">

        <div class="container">


            <!-- Song Info & Actions -->
            <div class="d-flex justify-content-between flex-shrink-0">

                <!-- Song Details -->
                <MediaDetailsCard :song="currentSong" />


                <!-- Song Actions -->
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
            <TimeControl @time-moved="handleTimeMoved" :currentTime="currentTime" :duration="currentSong.duration"
                class="mx-md-4" />


            <!-- Main Song Controls -->
            <ul class="d-flex ms-auto">
                <li>
                    <VolumeControl class="me-sm-4" />
                </li>
                <li>
                    <BaseButton @click="prevSong" icon="backward-step" />
                </li>
                <li>
                    <BaseButton v-if="isPlaying" @click="pause" icon="pause" size="lg"
                        :class="{ 'btn-disabled': isLoading }" :disabled="isLoading" />
                    <BaseButton v-else @click="play" icon="play" size="lg" :class="{ 'btn-disabled': isLoading }"
                        :disabled="isLoading" />
                </li>
                <li>
                    <BaseButton @click="nextSong" icon="forward-step" />
                </li>
                <li>
                    <!-- <BaseButton @click="audio.loop = !audio.loop" icon="repeat" :class="{ 'active': audio.loop }" /> -->
                    <BaseButton icon="repeat" />
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