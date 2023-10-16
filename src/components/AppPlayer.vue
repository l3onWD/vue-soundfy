<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import PlayerProgress from './player/PlayerProgress.vue';
import PlayerDetails from './player/PlayerDetails.vue';

/*** DATA ***/
import { mediaList } from '../data';


export default {
    components: { PlayerProgress, PlayerDetails },

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
                <PlayerDetails :track="currentTrack" />

                <button class="btn">
                    <FontAwesomeIcon icon="far fa-heart" />
                </button>
            </div>


            <!-- Center Panel -->
            <div class="app-player-center">
                <!-- Main Controls -->
                <ul>
                    <li>
                        <button class="btn">
                            <FontAwesomeIcon icon="fas fa-backward-step" />
                        </button>
                    </li>
                    <li>
                        <button class="btn">
                            <FontAwesomeIcon icon="fas fa-play" size="lg" />
                        </button>
                    </li>
                    <li>
                        <button class="btn">
                            <FontAwesomeIcon icon="fas fa-forward-step" />
                        </button>
                    </li>
                </ul>

                <!-- Progress Bar -->
                <PlayerProgress />

            </div>


            <!-- Right Panel -->
            <div class="app-player-right">
                <button class="btn ms-auto">
                    <FontAwesomeIcon icon="fas fa-volume-high" size="lg" />
                </button>
            </div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.app-player {
    height: $layout-player;

    background-color: $col-light;
    border-top: 1px solid $col-gray-500;
    border-bottom: 1px solid $col-gray-500;

    >.container {
        height: 100%;

        display: flex;
        align-items: center;

        >* {
            flex: 0 0 20%;
        }

        .app-player-center {
            flex-basis: 60%;
        }

        .app-player-left {
            display: flex;

            button {
                color: $col-gray-700;
            }
        }
    }

    ul {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button {
        padding: 0;
        width: 2.5rem;
        height: 2.5rem;

        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        &:hover {
            color: $col-orange;
        }
    }
}
</style>