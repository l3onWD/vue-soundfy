<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import TrackListItem from '@/components/tracks/TrackListItem.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';


export default {

    components: { TrackListItem },

    data: () => ({
        player: usePlayerStore(),
        nextUp: useNextUpStore()
    }),

    props: {
        tracks: {
            type: Array,
            default: []
        }
    },

    computed: {

        isActive() {
            if (!this.nextUp.currentTrack) return false;
            return this.tracks.some(({ uid }) => this.nextUp.currentTrack.uid === uid);
        },


        isPlaying() {
            return this.isActive && this.player.isPlaying;
        },


        isLoading() {
            return this.isActive && this.player.isLoading;
        }
    },

    methods: {

        play(uid, index) {

            if (this.isLoading) return;

            if (this.isActive && this.nextUp.currentTrack.uid === uid) {

                this.isPlaying ? this.player.pauseTrack() : this.player.resumeTrack();

            } else {
                this.player.fetchTrack(this.tracks[index]);

                // Reset upList and add this track
                this.nextUp.setTracks(this.tracks, index);
            }
        }
    }

}
</script>


<template>
    <h4>Tracks</h4>

    <ul class="track-list">
        <li v-for="(track, idx) in tracks" :key="track.id">

            <TrackListItem :track="track" :listPosition="idx" @@play="play" />

        </li>
    </ul>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.track-list {

    li {
        padding: 0.5rem 0;

        border-bottom: 1px solid $col-gray-300;

        &:first-child {
            border-top: 1px solid $col-gray-300;
        }
    }
}
</style>