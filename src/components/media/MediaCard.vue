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
    <div v-if="media" class="media-card" :class="{ 'active': isActive }">

        <!-- Card Top -->
        <div class="media-card-top">
            <!-- Album Cover -->
            <RouterLink :to="{ name: `${media.kind}-detail`, params: { id: media.id } }">
                <img :src="media.cover" :alt="media.title">
            </RouterLink>

            <!-- Media Controls -->
            <div class="media-card-controls">

                <!-- Play Control -->
                <PlayControl @@play="play" :isLoading="isLoading" :isPlaying="isPlaying" colorClass="btn-orange" big
                    rounded />
            </div>

            <!-- Track Actions -->
            <ul class="media-card-actions">
                <!-- Like -->
                <li>
                    <BaseButton icon="heart" iconStyle="far" class="btn btn-ui btn-light" title="Like" />
                </li>
                <!-- Add to Next Up Button -->
                <li>
                    <BaseButton @click="nextUp.addTracks(media.tracks)" icon="list" class="btn btn-ui btn-light"
                        title="Add to Next Up" />
                </li>
            </ul>

        </div>

        <!-- Data -->
        <h5 class="mb-1">
            <RouterLink :to="{ name: `${media.kind}-detail`, params: { id: media.id } }">
                {{ media.title }}
            </RouterLink>
        </h5>
        <span class="col-gray-700">{{ media.author }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.media-card {
    padding: 10px 5px;

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

    &.active .media-card-controls,
    .media-card-top:hover .media-card-controls {
        visibility: visible;
        opacity: 1;
    }

}
</style>