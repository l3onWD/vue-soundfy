<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** DATA ***/
import * as Utils from '@/utils/';


export default {

    props: {
        track: {
            type: Object,
            default: null
        }
    },
    computed: {

        durationString() {
            return Utils.formatTime(this.track.duration);
        },

        releaseDateString() {
            return Utils.formatDate(this.track.album.release_date);
        }
    }

}
</script>


<template>
    <h4>Track Info</h4>

    <div class="border-top">
        <div class="mb-2">
            <strong>Artist: </strong>
            <span>{{ track.author }}</span>
        </div>

        <div class="mb-2">
            <strong>Album: </strong>
            <span>{{ track.album.title }}</span>
        </div>

        <div class="mb-2">
            <strong>Release Date: </strong>
            <span>{{ releaseDateString }}</span>
        </div>

        <div class="mb-2">
            <strong>Duration: </strong>
            <span>{{ durationString }}</span>
        </div>

        <div class="mb-2">
            <strong>Likes: </strong>
            <span>0</span>
        </div>

        <div class="mb-2">
            <strong>Plays: </strong>
            <span>0</span>
        </div>
    </div>
</template>