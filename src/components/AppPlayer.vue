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

            <!-- Player Main Controls -->
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

            <!-- Player Progress Bar -->
            <PlayerProgress />

            <!-- Player Volume Control -->
            <button class="btn">
                <FontAwesomeIcon icon="fas fa-volume-high" size="lg" />
            </button>

            <!-- Player Details -->
            <PlayerDetails :track="currentTrack" />


            <!-- Other Controls -->
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
        gap: 2rem;
    }

    ul {
        height: 100%;

        display: flex;
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