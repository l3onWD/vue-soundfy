<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import PlayerProgress from '@/components/player/PlayerProgress.vue';
import PlayerDetails from '@/components/player/PlayerDetails.vue';
import PlayerVolume from '@/components/player/PlayerVolume.vue';
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { store } from '../data/store';


export default {
    components: { PlayerProgress, PlayerDetails, PlayerVolume, BaseButton },

    data: () => ({
        store,
        audio: null,
        currentTime: 0,

        // Volume custom v-model
        volume: 1,
        muted: false
    }),
    watch: {
        'store.song.src'(newSrc) {
            this.audio.pause();
            this.audio.src = newSrc;
            this.audio.play();
            this.currentTime = 0;
            this.store.isPlaying = true;
        },
        'store.isPlaying'(newValue) {
            this.$nextTick(() => {
                if (newValue) this.audio.play();
                else this.audio.pause();
            });
        },

        // Volume custom v-model (more reactiveness)
        volume(newValue) {
            this.muted = false;
            this.audio.volume = newValue;
        },
        muted(newValue) {
            this.audio.muted = newValue;
        }
    },
    methods: {
        handleTimeMoved(newTime) {
            this.audio.currentTime = newTime;
        }
    },
    mounted() {

        // Set audio
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
    <div v-if="store.song" class="app-player">

        <div class="container">


            <!-- Song Details -->
            <PlayerDetails :song="store.song" />


            <!-- Song Actions -->
            <ul class="d-flex ms-1">
                <!-- Favorite Button -->
                <li>
                    <BaseButton icon="heart" iconStyle="far" />
                </li>
            </ul>


            <!-- Progress Bar -->
            <PlayerProgress @time-moved="handleTimeMoved" :currentTime="currentTime" :duration="store.song?.duration"
                class="mx-md-4" />


            <!-- Song Controls -->
            <ul class="d-flex ms-auto">
                <li>
                    <PlayerVolume v-model:volume="volume" v-model:muted="muted" class="me-sm-4" />
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