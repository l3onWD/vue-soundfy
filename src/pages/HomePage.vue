<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';

/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaSection from '@/components/media/MediaSection.vue';

/*** DATA ***/
const { isLoading, makeGetRequest } = useFetchApi();
const mediaLists = reactive({
    ourPicksPlaylists: [],
    randomAlbums: [],
    randomTracks: [],
});
const router = useRouter();


onMounted(() => {

    /*** PLAYLISTS ***/
    makeGetRequest('/playlists/our-picks')
        .then(({ data: playlists }) => {
            mediaLists.ourPicksPlaylists = playlists;
        })
        .catch(err => {
            // Network error
            router.push({ name: 'error' });
        });


    /*** ALBUMS ***/
    makeGetRequest('/albums/random')
        .then(({ data: albums }) => {
            mediaLists.randomAlbums = albums;
        })
        .catch(err => {
            // Network error
            router.push({ name: 'error' });
        });


    /*** TRACKS ***/
    makeGetRequest('/tracks/random')
        .then(({ data: tracks }) => {
            mediaLists.randomTracks = tracks;
        })
        .catch(err => {
            // Network error
            router.push({ name: 'error' });
        });
});

</script>


<template>
    <div>
        <!-- Loader -->
        <AppLoader v-if="isLoading" />

        <div v-else>
            <!-- Our Picks Playlists -->
            <MediaSection title="Our Picks" :mediaList="mediaLists.ourPicksPlaylists" />

            <!-- Random Albums -->
            <MediaSection title="Random Albums" :mediaList="mediaLists.randomAlbums" />

            <!-- Random Tracks -->
            <MediaSection title="Random Tracks" :mediaList="mediaLists.randomTracks" />
        </div>

    </div>
</template>