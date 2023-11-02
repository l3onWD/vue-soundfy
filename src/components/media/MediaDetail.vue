<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';


export default {

    components: { BaseButton },

    props: {
        media: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: ''
        }
    },

    computed: {
        totalDuration() {

            // Get total duration
            const totlSecs = this.media.tracks.reduce((tot, { duration }) => tot += duration, 0);

            // Format time
            const hours = Math.floor(totlSecs / 3600);
            const minutes = Math.floor(totlSecs / 60);
            const seconds = Math.floor(totlSecs % 60);

            // Return time string
            return hours + ':' + (minutes < 10 ? `0${minutes}` : minutes) + ':' + (seconds < 10 ? `0${seconds}` : seconds);
        }
    }

}
</script>


<template>
    <div class="media-detail row">

        <!-- Main Info -->
        <div class="col-12 col-md-8 mb-3 mb-md-0">

            <div class="d-flex flex-column justify-content-between h-100">

                <div class="d-flex align-items-baseline">

                    <!-- Back Button -->
                    <BaseButton @click="$router.back()" icon="arrow-left" title="Back" size="xl" class="btn-light me-3" />

                    <!-- Main data -->
                    <div class="flex-grow-1">
                        <h2 class="mb-1">{{ media.title }}</h2>
                        <span class="col-gray-700 fs-5">{{ media.author }}</span>
                    </div>

                    <!-- Actions -->
                    <div class="d-flex align-items-center">
                        <BaseButton icon="heart" size="lg" iconStyle="far" title="Like" class="btn-light me-1" />
                        <BaseButton icon="list" size="lg" title="Add to Next Up" class="btn-light me-1" />
                        <BaseButton icon="play" size="lg" class="btn-light" />
                    </div>
                </div>

                <!-- Length Info -->
                <div v-if="type != 'track'" class="media-length d-none d-md-flex">
                    <h2 class="mb-0">{{ media.tracks.length }}</h2>
                    <h6 class="mb-0">TRACKS</h6>
                    <span>{{ totalDuration }}</span>
                </div>
            </div>

        </div>

        <!-- Cover -->
        <div class="col-12 col-md-4">
            <img :src="media.cover" :alt="media.title" class="media-cover">
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.media-detail {

    .media-length {
        padding: 0.5rem;
        width: 100px;
        height: 100px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $col-dark;
        background-color: $col-light;
        border-radius: 50%;
    }

    .media-cover {
        width: 100%;
        height: 100%;

        object-fit: cover;
        box-shadow: 0 0 8px 4px rgba($color: #000, $alpha: 0.3);
    }
}
</style>