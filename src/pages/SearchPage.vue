<script setup>
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';

/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaDetailCard from '@/components/media/MediaDetailCard.vue';


/*** DATA ***/
const route = useRoute();
const { makeGetRequest } = useFetchApi();
const isLoading = ref(false);
const results = reactive([]);


/*** LOGIC ***/

// Set Media track
const setMediaTrack = (media) => {

    return {
        ...media,
        tracks: [{ ...media, uid: `track-${media.id}` }]
    }
}

// Listen to query change
watch(() => route.query.title, async () => {

    isLoading.value = true;

    // Get searched results
    await makeGetRequest('/search', { title: route.query.title })
        .then(results => {

            console.log(results);
            if (!results.length) return;

            suggestions.value.splice(0);
            suggestions.value.push(...results);
            suggestions.value.forEach(media => { if (media.kind === 'track') setMediaTrack(media, 'track') });
        });

    isLoading.value = false;

}, { immediate: true });



</script>


<template>
    <div class="search py-4">
        <!-- Loader -->
        <AppLoader v-if="isLoading" />

        <!-- Page Content -->
        <div v-else>

            <!-- Filters -->
            <!-- todo -->

            <!-- Playlists -->
            <div v-if="results.playlists?.length" class="mb-3">

                <h5>Playlists:</h5>
                <hr>

                <div v-for="media in results.playlists" :key="media.id" class="mb-3">
                    <MediaDetailCard :media="media" />
                </div>

            </div>

            <!-- Albums -->
            <div v-if="results.albums?.length" class="mb-3">

                <h5>Albums:</h5>
                <hr>

                <div v-for="media in results.albums" :key="media.id" class="mb-3">
                    <MediaDetailCard :media="media" />
                </div>

            </div>

            <!-- Tracks -->
            <div v-if="results.tracks?.length" class="mb-3">

                <h5>Tracks:</h5>
                <hr>

                <div v-for="media in results.tracks" :key="media.id" class="mb-3">
                    <MediaDetailCard :media="media" />
                </div>

            </div>

        </div>

    </div>
</template>