<script setup>
import { computed } from 'vue';
import * as Utils from '@/utils/';


/*** PROPS ***/
const props = defineProps({
    track: {
        type: Object,
        default: null
    }
});


/*** COMPUTED ***/
const durationString = computed(() => {
    return Utils.formatTime(props.track.duration);
});

const releaseDateString = computed(() => {
    return Utils.formatDate(props.track.album.release_date);
});

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