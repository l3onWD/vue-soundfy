<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import MediaDetailsCard from '@/components/media/MediaDetailsCard.vue';

/*** DATA ***/
import { store } from '@/data/store';
import { usePlayerStore } from '@/stores/PlayerStore';
import { mapState, mapActions } from 'pinia';


export default {
    components: { BaseButton, MediaDetailsCard },

    data: () => ({ store }),

    props: {
        track: {
            type: Object,
            required: true
        },

        listPosition: {
            type: Number,
            required: true
        }
    },

    computed: {
        ...mapState(usePlayerStore, {
            trackId: 'trackId',
            playerIsPlaying: 'isPlaying',
            playerIsLoading: 'isLoading'
        }),


        isCurrentTrack() {
            return this.trackId === this.track.id;
        },


        isPlaying() {
            return this.isCurrentTrack && this.playerIsPlaying;
        },


        wasPlayed() {
            return this.listPosition < store.nextUpIndex;
        },


        isLoading() {
            return this.isCurrentTrack && this.playerIsLoading;
        }
    },

    methods: {
        ...mapActions(usePlayerStore, ['fetchTrack', 'resumeTrack', 'pauseTrack']),


        removeTrack() {
            // Check if list has more than 1 item
            if (store.nextUpList.length < 1) return;

            // Decrement index if a previous item is deleted
            if (this.listPosition <= store.nextUpIndex) store.nextUpIndex--;

            // Remove item
            store.nextUpList.splice(this.listPosition, 1);
        },


        play() {
            if (this.isCurrentTrack) this.resumeTrack();
            else {
                this.fetchTrack(this.track.id);
                store.nextUpIndex = this.listPosition;
            }
        },


        pause() {
            this.pauseTrack();
        },
    }

}
</script>


<template>
    <div class="nextup-item">

        <!-- Track Details -->
        <MediaDetailsCard :track="track" :class="{ 'col-gray-700': wasPlayed }" />

        <!-- Actions -->
        <ul class="nextup-item-actions ms-1">
            <li>
                <BaseButton v-if="isPlaying" @click="pause" icon="pause" :class="{ 'btn-disabled': isLoading }"
                    :disabled="isLoading" />
                <BaseButton v-else @click="play" icon="play" :class="{ 'btn-disabled': isLoading }" :disabled="isLoading" />
            </li>
            <li>
                <BaseButton @click="removeTrack" icon="trash" :class="{ 'btn-disabled': isLoading || isCurrentTrack }"
                    :disabled="isLoading" />
            </li>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
.nextup-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-actions {
        display: flex;
    }
}
</style>