<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';
import TrackDetailCard from '@/components/tracks/TrackDetailCard.vue';


export default {

    components: { BaseButton, TrackDetailCard },

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

            <span class="me-3">{{ (idx + 1) }}</span>

            <TrackDetailCard :track="track" />

            <div class="d-flex align-items-center">
                <BaseButton icon="heart" iconStyle="far" title="Like" class="btn btn-ui" />
                <BaseButton icon="list" title="Add to Next Up" class="btn btn-ui" />
                <BaseButton icon="play" class="btn btn-ui" />
            </div>
        </li>
    </ul>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.track-list {

    li {
        padding: 0.5rem 0;

        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $col-gray-300;

        &:first-child {
            border-top: 1px solid $col-gray-300;
        }
    }

    img {
        width: auto;
        height: 40px;

        object-fit: cover;
    }
}
</style>