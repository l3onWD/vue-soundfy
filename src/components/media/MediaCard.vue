<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** DATA ***/
import { store } from '../../data/store';


export default {
    props: {
        media: {
            type: Object,
            default: null
        }
    },
    data: () => ({ store })

}
</script>


<template>
    <div v-if="media" @click="store.currentSong = media" class="media-card">

        <!-- Cover -->
        <img :src="media.albumCover" :alt="media.title">

        <!-- Data -->
        <h5 class="mb-1">{{ media.title }}</h5>
        <span class="col-gray-700">{{ media.author }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.media-card {
    padding: 10px 5px;

    cursor: pointer;

    img {
        height: 100%;
        width: 100%;

        border: 1px solid $col-gray-700;
        object-fit: cover;
    }
}
</style>