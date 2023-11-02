<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';
import * as Utils from '@/utils/';


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
        },
        type: {
            type: String,
            default: ''
        }
    },

    computed: {

        isActive() {
            if (!this.nextUp.currentTrack) return false;
            return this.media.tracks.some(({ sourceUid }) => this.nextUp.currentTrack.sourceUid === sourceUid);
        },


        isPlaying() {
            return this.isActive && this.player.isPlaying;
        },


        isLoading() {
            return this.isActive && this.player.isLoading;
        },

        totalDurationString() {

            // Get total duration
            const totlSecs = this.media.tracks.reduce((tot, { duration }) => tot += duration, 0);

            // Return time string
            return Utils.formatTime(totlSecs);
        }
    },

    methods: {

        play() {

            if (this.isLoading) return;

            if (this.isActive) {

                this.isPlaying ? this.player.pauseTrack() : this.player.resumeTrack();

            } else {
                this.player.fetchTrack(this.media.tracks[0]);

                // Reset upList and add this track
                this.nextUp.setTracks(this.media.tracks);
            }
        }
    }

}
</script>


<template>
    <div class="media-detail row">

        <!-- Main Info -->
        <div class="col-12 col-md-8 mb-3 mb-md-0">

            <div class="d-flex flex-column justify-content-between h-100">

                <div class="d-flex align-items-baseline">

                    <!-- Back Button -->
                    <BaseButton @click="$router.back()" icon="arrow-left" title="Back" iconSize="lg"
                        class="btn btn-ui btn-light me-3" />

                    <!-- Main data -->
                    <div class="flex-grow-1">
                        <h2 class="mb-1">{{ media.title }}</h2>
                        <span class="col-gray-700 fs-5">{{ media.author }}</span>
                    </div>

                    <!-- Actions -->
                    <div class="d-flex align-items-center">

                        <BaseButton icon="heart" iconStyle="far" iconSize="lg" title="Like"
                            class="btn btn-ui btn-light me-1" />

                        <!-- Add to next up -->
                        <BaseButton icon="list" iconSize="lg" title="Add to Next Up" class="btn btn-ui btn-light me-1" />

                        <!-- Play/Pause -->
                        <BaseButton v-if="isLoading" icon="spinner" iconSize="lg"
                            class="btn btn-ui btn-light fa-spin-pulse" />
                        <BaseButton v-else @click="play" :icon="isPlaying ? 'pause' : 'play'" iconSize="lg"
                            class="btn btn-ui btn-light" />
                    </div>
                </div>

                <!-- Length Info -->
                <div v-if="type != 'track'" class="media-length d-none d-md-flex">
                    <h2 class="mb-0">{{ media.tracks.length }}</h2>
                    <h6 class="mb-0">TRACKS</h6>
                    <span>{{ totalDurationString }}</span>
                </div>
            </div>

        </div>

        <!-- Cover -->
        <div class="col-12 col-md-4">
            <img :src="media.cover" :alt="media.title" class="media-cover">
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.media-detail {

    .media-length {
        padding: 0.5rem;
        width: 100px;
        height: 100px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $col-dark;
        background-color: $col-light;
        border-radius: 50%;
    }

    .media-cover {
        width: 100%;
        height: 100%;

        object-fit: cover;
        box-shadow: 0 0 8px 4px rgba($color: #000, $alpha: 0.3);
    }
}
</style>