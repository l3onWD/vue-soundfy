<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';


export default {

    components: { BaseButton },

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

            <div class="d-flex align-items-center flex-grow-1">

                <img :src="track.album.cover" :alt="track.title">

                <span class="mx-3">{{ (idx + 1) }}</span>

                <div class="flex-grow-1">
                    <h6 class="mb-0">{{ track.title }}</h6>
                    <span>{{ track.album.author.name }}</span>
                </div>
            </div>

            <div class="d-flex align-items-center">
                <BaseButton icon="heart" iconStyle="far" title="Like" class="btn btn-ui" />
                <BaseButton icon="list" title="Add to Next Up" class="btn btn-ui" />
                <BaseButton icon="play" class="btn btn-ui" />
            </div>
        </li>
    </ul>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


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