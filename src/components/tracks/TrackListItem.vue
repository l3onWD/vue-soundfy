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
            return this.nextUp.currentTrack.uid === this.track.uid;
        },


        isPlaying() {
            return this.isActive && this.player.isPlaying;
        },


        isLoading() {
            return this.isActive && this.player.isLoading;
        }
    },

    methods: {

        handlePlay() {
            this.$emit('@play', this.track.uid, this.listPosition);
        },

        addToNextUp() {

            const wasEmpty = !this.nextUp.totalTracks;

            this.nextUp.addTracks([this.track]);

            if (wasEmpty) this.player.fetchTrack(this.track);
        }
    },

    emits: ['@play']

}
</script>


<template>
    <div class="track-list-item">

        <span class="me-3">{{ (listPosition + 1) }}</span>

        <TrackDetailCard :track="track" :class="{ 'col-orange': isActive }" />

        <ul class="d-flex align-items-center">
            <li>
                <BaseButton icon="heart" iconStyle="far" title="Like" class="btn btn-ui" />
            </li>

            <li>
                <BaseButton @click="addToNextUp" icon="list" title="Add to Next Up" class="btn btn-ui" />
            </li>

            <li>
                <!-- Play Control -->
                <PlayControl @@play="handlePlay" :isLoading="isLoading" :isPlaying="isPlaying" />
            </li>

        </ul>

    </div>
</template>


<style lang="scss" scoped>
.track-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>