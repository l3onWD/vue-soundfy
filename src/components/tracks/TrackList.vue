<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import TrackListItem from '@/components/tracks/TrackListItem.vue';


export default {

    components: { TrackListItem },

    props: {
        tracks: {
            type: Array,
            default: []
        }
    }

}
</script>


<template>
    <h4>Tracks</h4>

    <ul class="track-list">
        <li v-for="(track, idx) in tracks" :key="track.id">

            <TrackListItem :track="track" :listPosition="idx" />

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