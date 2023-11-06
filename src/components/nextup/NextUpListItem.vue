<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import PlayControl from '@/components/player/PlayControl.vue';
import TrackDetailCard from '@/components/tracks/TrackDetailCard.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';


export default {
    components: { BaseButton, PlayControl, TrackDetailCard },

    data: () => ({
        player: usePlayerStore(),
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

        isCurrentTrack() {
            if (!this.nextUp.currentTrack) return false;
            return this.nextUp.currentIndex === this.listPosition;
        },


        isPlaying() {
            return this.isCurrentTrack && this.player.isPlaying;
        },


        wasPlayed() {
            return this.listPosition < this.nextUp.currentIndex;
        },


        isLoading() {
            return this.isCurrentTrack && this.player.isLoading;
        }
    },

    methods: {

        play() {

            if (this.isLoading) return;

            if (this.isCurrentTrack)

                this.isPlaying ? this.player.pauseTrack() : this.player.resumeTrack();

            else {
                this.player.fetchTrack(this.track);

                // Update index to this track
                this.nextUp.goTo(this.listPosition);
            }
        }
    }

}
</script>


<template>
    <div class="nextup-item">

        <!-- Track Details -->
        <TrackDetailCard :track="track" :class="{ 'col-gray-700': wasPlayed, 'col-orange': isCurrentTrack }" />

        <!-- Actions -->
        <ul class="nextup-item-actions ms-1">
            <li>
                <!-- Play Control -->
                <PlayControl @@play="play" :isLoading="isLoading" :isPlaying="isPlaying" />
            </li>
            <li>
                <BaseButton @click="nextUp.removeTrack(listPosition)" icon="trash" class="btn btn-ui"
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