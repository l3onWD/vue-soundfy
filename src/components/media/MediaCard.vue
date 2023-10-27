<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { store } from '../../data/store';
import { usePlayerStore } from '@/stores/PlayerStore';
import { mapState, mapActions } from 'pinia';


export default {
    components: { BaseButton },

    data: () => ({ store }),

    props: {
        media: {
            type: Object,
            default: null
        }
    },

    computed: {
        ...mapState(usePlayerStore, {
            trackId: 'trackId',
            playerIsPlaying: 'isPlaying',
            playerIsLoading: 'isLoading'
        }),


        isCurrentTrack() {
            return this.trackId === this.media.id;
        },


        isPlaying() {
            return this.isCurrentTrack && this.playerIsPlaying;
        },


        isLoading() {
            return this.isCurrentTrack && this.playerIsLoading;
        }
    },

    methods: {

        ...mapActions(usePlayerStore, ['fetchTrack', 'resumeTrack', 'pauseTrack']),


        play() {

            if (this.isCurrentTrack) this.resumeTrack();
            else {
                this.fetchTrack(this.media.id);

                //TODO create a store for upList ########
                // Reset upList and add this track
                store.nextUpList = [this.media];
                store.nextUpIndex = 0;
            }
        },


        pause() {
            this.pauseTrack();
        },


        addTrack() {

            // Exit if already included
            if (store.nextUpList.some(({ id }) => this.media.id === id)) return;

            // Play if empty
            if (!store.nextUpList.length) this.fetchTrack(this.media.id);

            // Add to list
            store.nextUpList.push(this.media);
        }

    }

}
</script>


<template>
    <div v-if="media" class="media-card">

        <!-- Card Top -->
        <div class="media-card-top">
            <!-- Album Cover -->
            <img :src="media.albumCover" :alt="media.title">

            <!-- Media Controls -->
            <div class="media-card-controls">
                <div v-if="isLoading" class="text-white">
                    <FontAwesomeIcon icon="fas fa-spinner" spin-pulse size="3x" />
                </div>
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
                    <BaseButton @click="addTrack" icon="list" class="btn-light" title="Add to Next Up" />
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