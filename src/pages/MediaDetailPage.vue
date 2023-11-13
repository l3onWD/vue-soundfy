<script setup>
import { ref, computed, watch } from 'vue';
import useFetchApi from '@/composables/useFetchApi';

/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaDetail from '@/components/media/MediaDetail.vue';
import TrackList from '@/components/tracks/TrackList.vue';
import TrackDetail from '@/components/tracks/TrackDetail.vue';


/*** ROUTER PROPS ***/
const props = defineProps(['id', 'mediaType']);

/*** DATA ***/
const { isLoading, makeGetRequest } = useFetchApi();
const media = ref(null);

/*** COMPUTED ***/
const endpoint = computed(() => `/${props.mediaType}s/${props.id}`);


// Check endpoint change
watch(endpoint, () => {

    // Reset Media
    media.value = null;

    // Fetch Details
    makeGetRequest(endpoint.value)
        .then(data => {
            media.value = data;
        });

}, { immediate: true });


</script>


<template>
    <!-- Loader -->
    <AppLoader v-if="isLoading" />

    <!-- Page Content -->
    <div v-else-if="media" class="detail pb-4">

        <!-- Content Top -->
        <div class="detail-top p-3">

            <!-- Detail -->
            <MediaDetail :media="media" />
        </div>

        <!-- Content Bottom -->
        <div class="detail-bottom p-3">

            <!-- Tracks -->
            <TrackList v-if="media.kind != 'track'" :tracks="media.tracks" />

            <!-- Track Info -->
            <TrackDetail v-else :track="media" />

        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.detail {

    .detail-top {
        color: $col-light;
        background-image: linear-gradient(130deg, $col-gray-900 20%, $col-dark);
    }

}
</style>