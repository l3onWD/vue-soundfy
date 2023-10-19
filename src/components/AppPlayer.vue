<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import TimeControl from '@/components/player/TimeControl.vue';
import VolumeControl from '@/components/player/VolumeControl.vue';
import PlayerDetails from '@/components/player/PlayerDetails.vue';
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { store } from '@/data/store';


export default {
    components: { TimeControl, PlayerDetails, VolumeControl, BaseButton },

    data: () => ({
        store,
        audio: null,
        currentTime: 0,
    }),

    computed: {
        currentSong() {
            return store.nextUpList[store.nextUpIndex];
        }
    },

    watch: {
        /**
         * Song change watcher
         */
        'currentSong.src'(newSrc) {
            this.audio.pause();
            this.audio.src = newSrc;
            this.audio.play();
            this.currentTime = 0;
            store.isPlaying = true;
        },

        /**
         * Play/Pause watcher
         */
        'store.isPlaying'(newValue) {
            this.$nextTick(() => {
                if (newValue) this.audio.play();
                else this.audio.pause();
            });
        },

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

        /**
         * Update current time from Time Control Bar
         * 
         * @param {Number} newTime 
         */
        handleTimeMoved(newTime) {
            this.audio.currentTime = newTime;
        }
    },

    mounted() {

        // Create an audio instance
        this.audio = new Audio();

        // Current time update
        this.audio.addEventListener('timeupdate', () => { this.currentTime = this.audio.currentTime });

        // Reset Audio on End
        this.audio.addEventListener('ended', () => {
            this.currentTime = 0;
            this.store.isPlaying = false;
        });
    }
}
</script>


<template>
    <div v-if="store.nextUpList.length" class="app-player">

        <div class="container">


            <!-- Song Details -->
            <PlayerDetails :song="currentSong" />


            <!-- Song Actions -->
            <ul class="d-flex flex-column flex-sm-row ms-1">
                <!-- Favorite Button -->
                <li>
                    <BaseButton icon="heart" iconStyle="far" />
                </li>
                <!-- Next Up Button -->
                <li>
                    <BaseButton icon="list" />
                </li>
            </ul>


            <!-- Time Control -->
            <TimeControl @time-moved="handleTimeMoved" :currentTime="currentTime" :duration="currentSong.duration"
                class="mx-md-4" />


            <!-- Main Song Controls -->
            <ul class="d-flex ms-auto">
                <li>
                    <VolumeControl class="me-sm-4" />
                </li>
                <li>
                    <BaseButton @click="audio.currentTime = 0" icon="backward-step" />
                </li>
                <li>
                    <BaseButton v-if="store.isPlaying" @click="store.isPlaying = false" icon="pause" size="lg" />
                    <BaseButton v-else @click="store.isPlaying = true" icon="play" size="lg" />
                </li>
                <li>
                    <BaseButton icon="forward-step" />
                </li>
                <li>
                    <BaseButton @click="audio.loop = !audio.loop" icon="repeat" :class="{ 'active': audio.loop }" />
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
    }
}
</style>