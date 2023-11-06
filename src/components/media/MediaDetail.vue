<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import PlayControl from '@/components/player/PlayControl.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';
import * as Utils from '@/utils/';


export default {

    components: { BaseButton, PlayControl },

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

        isActive() {
            if (!this.nextUp.currentTrack) return false;
            return this.media.tracks.some(({ uid }) => this.nextUp.currentTrack.uid === uid);
        },


        isPlaying() {
            return this.isActive && this.player.isPlaying;
        },


        isLoading() {
            return this.isActive && this.player.isLoading;
        },

        totalDurationString() {

            // Get total duration
            const totalSecs = this.media.tracks.reduce((tot, { duration }) => tot += duration, 0);

            // Return time string
            return Utils.formatTime(totalSecs);
        }
    },

    methods: {

        play() {

            // Check if this media card is loading
            if (this.isLoading) return;

            // Set Media to next up list and play first track
            if (!this.isActive) this.nextUp.setTracks(this.media.tracks);

            // Resume/Pause
            else this.isPlaying ? this.player.pauseTrack() : this.player.resumeTrack();
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

                        <!-- Like -->
                        <BaseButton icon="heart" iconStyle="far" iconSize="lg" title="Like"
                            class="btn btn-ui btn-light me-1" />

                        <!-- Add to next up -->
                        <BaseButton @click="nextUp.addTracks(media.tracks)" icon="list" iconSize="lg" title="Add to Next Up"
                            class="btn btn-ui btn-light me-1" />

                        <!-- Play Control -->
                        <PlayControl @@play="play" :isLoading="isLoading" :isPlaying="isPlaying" colorClass="btn-light" />
                    </div>
                </div>

                <!-- Length Info -->
                <div v-if="media.kind != 'track'" class="media-length d-none d-md-flex">
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