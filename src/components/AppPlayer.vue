<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import PlayerProgress from './player/PlayerProgress.vue';
import PlayerDetails from './player/PlayerDetails.vue';
import BaseButton from './base/BaseButton.vue';

/*** DATA ***/
import { store } from '../data/store';


export default {
    components: { PlayerProgress, PlayerDetails, BaseButton },

    data: () => ({
        store,
        audio: null,
        currentTime: 0
    }),
    watch: {
        'store.currentSong.src'(newValue) {
            this.audio.src = newValue;
            this.audio.load();
            this.currentTime = 0;
            this.store.playerIsPlaying = false;
        }
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.store.playerIsPlaying = true;
            } else {
                this.audio.pause();
                this.store.playerIsPlaying = false;
            }
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
            this.store.playerIsPlaying = false;
        });
    }
}
</script>


<template>
    <div v-if="store.currentSong" class="app-player">

        <div class="container">

            <!-- Left Panel -->
            <div class="app-player-left">

                <!-- Track Details -->
                <PlayerDetails :song="store.currentSong" />

                <!-- Favorite Button -->
                <BaseButton icon="heart" iconStyle="far" class="col-gray-700" />
            </div>


            <!-- Center Panel -->
            <div class="app-player-center">
                <!-- Main Controls -->
                <ul>
                    <li>
                        <BaseButton icon="backward-step" />
                    </li>
                    <li @click="play">
                        <BaseButton v-if="store.playerIsPlaying" icon="pause" size="lg" />
                        <BaseButton v-else icon="play" size="lg" />
                    </li>
                    <li>
                        <BaseButton icon="forward-step" />
                    </li>
                </ul>

                <!-- Progress Bar -->
                <PlayerProgress :currentTime="currentTime" :duration="store.currentSong?.duration" />

            </div>


            <!-- Right Panel -->
            <div class="app-player-right">

                <!-- Track Volume -->
                <BaseButton icon="volume-high" size="lg" class="ms-auto" />
            </div>

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

        >* {
            flex: 0 0 50%;
        }

        .app-player-left {
            display: flex;
        }

        .app-player-center {
            ul {
                display: flex;
                justify-content: end;
                align-items: center;
            }
        }

        .app-player-right {
            display: none;
        }
    }
}


// MEDIA MD
@media screen and (min-width: 768px) {
    .app-player {
        >.container {

            >* {
                flex: 0 0 20%;
            }

            .app-player-center {
                flex-basis: 60%;

                ul {
                    justify-content: center;
                }
            }

            .app-player-right {
                display: flex;
            }
        }
    }
}
</style>