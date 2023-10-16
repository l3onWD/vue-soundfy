<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import PlayerProgress from './player/PlayerProgress.vue';
import PlayerDetails from './player/PlayerDetails.vue';
import BaseButton from './base/BaseButton.vue';

/*** DATA ***/
import { mediaList } from '../data';


export default {
    components: { PlayerProgress, PlayerDetails, BaseButton },

    data: () => ({
        isVisible: true,
        currentTrack: mediaList[0]
    })

}
</script>


<template>
    <div v-if="isVisible" class="app-player">

        <div class="container">

            <!-- Left Panel -->
            <div class="app-player-left">

                <!-- Track Details -->
                <PlayerDetails :track="currentTrack" />

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
                    <li>
                        <BaseButton icon="play" size="lg" />
                    </li>
                    <li>
                        <BaseButton icon="forward-step" />
                    </li>
                </ul>

                <!-- Progress Bar -->
                <PlayerProgress />

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