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

        isActive() {
            if (!this.nextUp.currentTrack) return false;
            return this.media.tracks.some(({ sourceUid }) => this.nextUp.currentTrack.sourceUid === sourceUid);
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

            if (this.isActive) this.player.resumeTrack();
            else {
                this.player.fetchTrack(this.media.tracks[0]);

                // Reset upList and add this track
                this.nextUp.setTracks(this.media.tracks);
            }
        },


        pause() {
            this.player.pauseTrack();
        },


        addToNextUp() {

            const wasEmpty = !this.nextUp.totalTracks;

            this.nextUp.addTracks(this.media.tracks);

            if (wasEmpty) this.player.fetchTrack(this.media.tracks[0]);
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

                <!-- Loader -->
                <FontAwesomeIcon v-if="isLoading" icon="fas fa-spinner" spin-pulse size="3x" class="text-white" />

                <!-- Controls -->
                <div v-else>
                    <!-- Play/Pause -->
                    <BaseButton v-if="isPlaying" @click="pause" icon="pause" iconSize="2xl"
                        class="btn btn-ui btn-lg btn-orange rounded-circle" />
                    <BaseButton v-else @click="play" icon="play" iconSize="2xl"
                        class="btn btn-ui btn-lg btn-orange rounded-circle" />
                </div>

            </div>

            <!-- Track Actions -->
            <ul class="media-card-actions">
                <!-- Like -->
                <li>
                    <BaseButton icon="heart" iconStyle="far" class="btn btn-ui btn-light" title="Like" />
                </li>
                <!-- Add to Next Up Button -->
                <li>
                    <BaseButton @click="addToNextUp" icon="list" class="btn btn-ui btn-light" title="Add to Next Up" />
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