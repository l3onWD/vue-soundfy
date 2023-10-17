<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import PlayerProgress from './player/PlayerProgress.vue';
import PlayerDetails from './player/PlayerDetails.vue';
import BaseButton from './base/BaseButton.vue';

/*** DATA ***/
import { songs } from '../data';


export default {
    components: { PlayerProgress, PlayerDetails, BaseButton },

    data: () => ({
        isVisible: true,
        currentTrack: songs[0],

        player: {
            src: './src/assets/music/test-song-01.mp3',
            audio: null,
            currentTime: 0,
            duration: 0,
            isPlaying: false
        }
    }),
    methods: {
        play() {
            if (this.player.audio.paused) {
                this.player.audio.play();
                this.player.duration = this.player.audio.duration;
                this.player.isPlaying = true;
            } else {
                this.player.audio.pause();
                this.player.isPlaying = false;
            }
        }
    },
    mounted() {
        this.player.audio = new Audio(this.player.src);
        this.player.audio.addEventListener('timeupdate', () => { this.player.currentTime = this.player.audio.currentTime })
    }
}
</script>


<template>
    <div v-if="isVisible" class="app-player">

        <div class="container">

            <!-- Left Panel -->
            <div class="app-player-left">

                <!-- Track Details -->
                <PlayerDetails :song="currentTrack" />

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
                        <BaseButton v-if="player.isPlaying" icon="pause" size="lg" />
                        <BaseButton v-else icon="play" size="lg" />
                    </li>
                    <li>
                        <BaseButton icon="forward-step" />
                    </li>
                </ul>

                <!-- Progress Bar -->
                <PlayerProgress :currentTime="player.currentTime" :duration="player.duration" />

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