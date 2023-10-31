<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaSection from '@/components/media/MediaSection.vue';

/*** DATA ***/
import axios from 'axios';

const baseUri = 'http://127.0.0.1:8000/api';


export default {
    components: { MediaSection, AppLoader },

    data: () => ({
        ourPicksPlaylists: [],
        randomAlbums: [],
        randomTracks: [],
        isLoading: false
    }),

    methods: {

        fetchApi(endpoint, success) {

            this.isLoading = true;

            axios.get(baseUri + endpoint)
                .then(({ data }) => { success(data) })
                .catch(err => { console.log(err) })
                .then(() => { this.isLoading = false });
        },

        remapMedia(mediaList, type) {

            return mediaList.map(media => {

                // Calculate Unique ID for grouping all media type
                const uid = `${type}-${media.id}`;

                // Calculate tracks based on media type
                const tracks = type === 'track' ?
                    [{ ...media, sourceUid: uid }] :
                    media.tracks.map(track => ({ ...track, sourceUid: uid }));


                return {
                    id: media.id,
                    uid,
                    cover: media.cover,
                    title: media.title,
                    tracks,
                    author: media.author
                }
            });
        }
    },

    created() {

        // Get all sections data
        this.fetchApi('/playlists/our-picks', (data) => { this.ourPicksPlaylists = this.remapMedia(data, 'playlist') });
        this.fetchApi('/albums/random', (data) => { this.randomAlbums = this.remapMedia(data, 'album') });
        this.fetchApi('/tracks/random', (data) => { this.randomTracks = this.remapMedia(data, 'track') });
    }

}
</script>


<template>
    <main class="app-main">
        <div class="container">

            <!-- Loader -->
            <AppLoader v-if="isLoading" />

            <div v-else>
                <!-- Our Picks Playlists -->
                <MediaSection title="Our Picks" :mediaList="ourPicksPlaylists" />

                <!-- Random Albums -->
                <MediaSection title="Random Albums" :mediaList="randomAlbums" />

                <!-- Random Tracks -->
                <MediaSection title="Random Tracks" :mediaList="randomTracks" />
            </div>

        </div>
    </main>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.app-main {
    flex-grow: 1;

    overflow-y: auto;
}

// MEDIA MD
@media screen and (min-width: 768px) {
    .app-main {
        margin-top: $layout-navbar;
    }
}
</style>