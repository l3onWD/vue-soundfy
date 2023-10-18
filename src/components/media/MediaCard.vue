<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import { store } from '../../data/store';


export default {
    components: { BaseButton },
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
    <div v-if="media" class="media-card">

        <!-- Card Top -->
        <div class="media-card-top">
            <!-- Album Cover -->
            <img :src="media.albumCover" :alt="media.title">

            <!-- Media Actions -->
            <div class="media-card-actions">
                <!-- Play/Pause -->
                <BaseButton v-if="store.currentSong?.id === media.id && store.playerIsPlaying" icon="pause"
                    class="btn-big btn-rounded btn-orange" />
                <BaseButton v-else @click="store.currentSong = media" icon="play" class="btn-big btn-rounded btn-orange" />
            </div>
        </div>

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

    &-top {
        position: relative;

        img {
            height: 100%;
            width: 100%;

            border: 1px solid $col-gray-700;
            object-fit: cover;
        }

        .media-card-actions {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            visibility: hidden;
            opacity: 0;

            transition: 0.05s visibility, 0.05s opacity;
        }

        &:hover .media-card-actions {
            visibility: visible;
            opacity: 1;
        }
    }

}
</style>