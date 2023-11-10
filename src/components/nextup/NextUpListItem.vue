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

        isActive() {
            if (!this.nextUp.currentTrack) return false;
            // Check by list position cause duplicated tracks
            return this.nextUp.currentIndex === this.listPosition;
        },


        isPlaying() {
            return this.isActive && this.player.isPlaying;
        },


        wasPlayed() {
            return this.listPosition < this.nextUp.currentIndex;
        },


        isLoading() {
            return this.isActive && this.player.isLoading;
        }
    },

    methods: {

        play() {

            // Check if this track is loading
            if (this.isLoading) return;

            // Update index and play related track
            if (!this.isActive) this.nextUp.goTo(this.listPosition);

            // Resume/Pause
            else this.isPlaying ? this.player.pauseTrack() : this.player.resumeTrack();
        }
    }

}
</script>


<template>
    <div class="nextup-item">

        <!-- Track Details -->
        <TrackDetailCard :track="track" :class="{ 'text-gray-700': wasPlayed, 'text-orange': isActive }" />

        <!-- Actions -->
        <ul class="nextup-item-actions ms-1">
            <li>
                <!-- Play Control -->
                <PlayControl @@play="play" :isLoading="isLoading" :isPlaying="isPlaying" />
            </li>
            <li>
                <BaseButton @click="nextUp.removeTrack(listPosition)" icon="trash" class="btn btn-ui"
                    :class="{ 'btn-disabled': isLoading || isActive }" :disabled="isLoading" />
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