<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';

/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaSearchCard from '@/components/media/MediaSearchCard.vue';


/*** DATA ***/
const route = useRoute();
const { makeGetRequest } = useFetchApi();
const isLoading = ref(false);
const results = reactive([]);


/*** COMPUTED ***/
const searchedPlaylists = computed(() => results.filter(({ kind }) => kind === 'playlist'));
const searchedAlbums = computed(() => results.filter(({ kind }) => kind === 'album'));
const searchedTracks = computed(() => results.filter(({ kind }) => kind === 'track'));


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
    results.splice(0);

    // Get searched results
    await makeGetRequest('/search', { title: route.query.title })
        .then(data => {

            if (!data.length) return;
            results.push(...data);

            // Fix track media
            results.forEach(media => { if (media.kind === 'track') setMediaTrack(media, 'track') });
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

            <!-- Results -->
            <div v-if="results.length">

                <!-- Playlists -->
                <div v-if="searchedPlaylists.length" class="mb-3">

                    <h5>Playlists:</h5>
                    <hr>

                    <div v-for="media in searchedPlaylists" :key="media.id" class="mb-3">
                        <MediaSearchCard :media="media" />
                    </div>

                </div>

                <!-- Albums -->
                <div v-if="searchedAlbums.length" class="mb-3">

                    <h5>Albums:</h5>
                    <hr>

                    <div v-for="media in searchedAlbums" :key="media.id" class="mb-3">
                        <MediaSearchCard :media="media" />
                    </div>

                </div>

                <!-- Tracks -->
                <div v-if="searchedTracks.length" class="mb-3">

                    <h5>Tracks:</h5>
                    <hr>

                    <div v-for="media in searchedTracks" :key="media.id" class="mb-3">
                        <MediaSearchCard :media="media" />
                    </div>

                </div>

            </div>

            <!-- Nothing Found -->
            <div v-else class="py-5">
                <h3>Nothing Founded</h3>
            </div>

        </div>



    </div>
</template>