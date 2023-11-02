<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import MediaDetailsCard from '@/components/media/MediaDetailsCard.vue';

/*** DATA ***/
import { usePlayerStore } from '@/stores/PlayerStore';
import { useNextUpStore } from '@/stores/NextUpStore';


export default {
    components: { BaseButton, MediaDetailsCard },

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
            if (this.isCurrentTrack) this.player.resumeTrack();
            else {
                this.player.fetchTrack(this.track);

                // Update index to this track
                this.nextUp.goTo(this.listPosition);
            }
        },


        pause() {
            this.player.pauseTrack();
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
                <BaseButton v-if="isPlaying" @click="pause" icon="pause" class="btn btn-ui"
                    :class="{ 'btn-disabled': isLoading }" :disabled="isLoading" />
                <BaseButton v-else @click="play" icon="play" class="btn btn-ui" :class="{ 'btn-disabled': isLoading }"
                    :disabled="isLoading" />
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