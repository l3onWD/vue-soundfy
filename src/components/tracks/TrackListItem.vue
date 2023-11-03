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
        track: {
            type: Object,
            required: true
        },

        listPosition: {
            type: Number,
            required: true
        }
    }

}
</script>


<template>
    <div class="track-list-item">

        <span class="me-3">{{ (listPosition + 1) }}</span>

        <TrackDetailCard :track="track" />

        <ul class="d-flex align-items-center">
            <li>
                <BaseButton icon="heart" iconStyle="far" title="Like" class="btn btn-ui" />
            </li>

            <li>
                <BaseButton icon="list" title="Add to Next Up" class="btn btn-ui" />
            </li>

            <li>
                <!-- Play/Pause -->
                <BaseButton icon="play" iconSize="lg" class="btn btn-ui" />
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