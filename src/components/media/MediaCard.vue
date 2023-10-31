<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';


export default {
    components: { BaseButton },

    data: () => ({
        player: usePlayerStore(),
        nextUp: useNextUpStore()
    }),

    props: {
        media: {
            type: Object,
            default: null
        }
    },

    computed: {

        isCurrentTrack() {
            return this.player.trackId === this.media.id;
        },


        isPlaying() {
            return this.isCurrentTrack && this.player.isPlaying;
        },


        isLoading() {
            return this.isCurrentTrack && this.player.isLoading;
        }
    },

    methods: {

        play() {

            if (this.isCurrentTrack) this.player.resumeTrack();
            else {
                this.player.fetchTrack(this.media.id);

                // Reset upList and add this track
                this.nextUp.setTracks([this.media]);
            }
        },


        pause() {
            this.player.pauseTrack();
        },


        addToNextUp() {

            const isAdded = this.nextUp.addTrack(this.media);

            if (isAdded && this.nextUp.totalTracks === 1) this.player.fetchTrack(this.media.id);
        }

    }

}
</script>


<template>
    <div v-if="media" class="media-card">

        <!-- Card Top -->
        <div class="media-card-top">
            <!-- Album Cover -->
            <img :src="media.cover" :alt="media.title">

            <!-- Media Controls -->
            <div class="media-card-controls" :class="{ 'loading': isLoading }">

                <!-- Loader -->
                <FontAwesomeIcon v-if="isLoading" icon="fas fa-spinner" spin-pulse size="3x" class="text-white" />

                <!-- Controls -->
                <div v-else>
                    <!-- Play/Pause -->
                    <BaseButton v-if="isPlaying" @click="pause" icon="pause" class="btn-big btn-rounded btn-orange" />
                    <BaseButton v-else @click="play" icon="play" class="btn-big btn-rounded btn-orange" />
                </div>

            </div>

            <!-- Track Actions -->
            <ul class="media-card-actions">
                <!-- Like -->
                <li>
                    <BaseButton icon="heart" iconStyle="far" class="btn-light" title="Like" />
                </li>
                <!-- Add to Next Up Button -->
                <li>
                    <BaseButton @click="addToNextUp" icon="list" class="btn-light" title="Add to Next Up" />
                </li>
            </ul>

        </div>

        <!-- Data -->
        <h5 class="mb-1">{{ media.title }}</h5>
        <span class="col-gray-700">{{ media.author }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.media-card {
    padding: 10px 5px;

    cursor: pointer;

    &-top {
        position: relative;

        border: 1px solid $col-gray-700;

        img {
            height: 100%;
            width: 100%;

            object-fit: cover;
        }

        .media-card-controls {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            visibility: hidden;
            opacity: 0;

            transition: 0.05s visibility, 0.05s opacity;
        }

        .media-card-controls.loading,
        &:hover .media-card-controls {
            visibility: visible;
            opacity: 1;
        }

        .media-card-actions {
            margin: 0.25rem;
            position: absolute;
            bottom: 0;
            right: 0;

            display: flex;
            align-items: center;
            background-color: rgba($color: $col-dark, $alpha: 0.5);
            border-radius: 0.5rem;
            visibility: hidden;
            opacity: 0;
        }

        &:hover .media-card-actions {
            visibility: visible;
            opacity: 1;
        }
    }

}
</style>