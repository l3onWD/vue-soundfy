<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import MediaDetailsCard from '@/components/media/MediaDetailsCard.vue';

/*** DATA ***/
import { mapState, mapActions } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';


export default {
    components: { BaseButton, MediaDetailsCard },

    data: () => ({
        nextUp: useNextUpStore()
    }),

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
            return this.listPosition < this.nextUp.currentIndex;
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
                this.fetchTrack(this.track.id);
                this.nextUp.goTo(this.listPosition);
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
                <BaseButton @click="nextUp.removeTrack(listPosition)" icon="trash"
                    :class="{ 'btn-disabled': isLoading || isCurrentTrack }" :disabled="isLoading" />
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