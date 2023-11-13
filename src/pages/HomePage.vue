<script setup>
import { reactive, onMounted } from 'vue';
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


onMounted(() => {

    /*** PLAYLISTS ***/
    makeGetRequest('/playlists/our-picks')
        .then((playlists) => {
            mediaLists.ourPicksPlaylists = playlists;
        });


    /*** ALBUMS ***/
    makeGetRequest('/albums/random')
        .then((albums) => {
            mediaLists.randomAlbums = albums;
        });


    /*** TRACKS ***/
    const setMediaTrack = (media) => {

        return {
            ...media,
            tracks: [{ ...media, uid: `track-${media.id}` }]
        }
    }

    makeGetRequest('/tracks/random')
        .then((tracks) => {
            mediaLists.randomTracks = tracks.map(media => setMediaTrack(media, 'track'));
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