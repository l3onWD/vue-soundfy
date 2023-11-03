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
        isLoading: 0
    }),

    methods: {

        fetchApi(endpoint, success) {

            this.isLoading++;

            axios.get(baseUri + endpoint)
                .then(({ data }) => { success(data) })
                .catch(err => { console.log(err) })
                .then(() => { this.isLoading-- });
        },

        setUid(media, kind) {

            // Calculate Unique ID for grouping all media kind
            const prefixUid = `${kind}-${media.id}`;

            // Calculate tracks based on media kind
            const tracks = kind === 'track' ?
                [{ ...media, uid: `${prefixUid}-${media.id}` }] :
                media.tracks.map(track => ({ ...track, uid: `${prefixUid}-${media.id}` }));


            return {
                id: media.id,
                kind,
                cover: media.cover,
                title: media.title,
                tracks,
                author: media.author
            }
        }
    },

    created() {

        // Get all sections data and set UID to all media
        // Our picks Playlists
        this.fetchApi('/playlists/our-picks', (mediaList) => {
            this.ourPicksPlaylists = mediaList.map(media => this.setUid(media, 'playlist'));
        });

        // Random Albums
        this.fetchApi('/albums/random', (mediaList) => {
            this.randomAlbums = mediaList.map(media => this.setUid(media, 'album'));
        });

        // Random Tracks
        this.fetchApi('/tracks/random', (mediaList) => {
            this.randomTracks = mediaList.map(media => this.setUid(media, 'track'));
        });
    }

}
</script>


<template>
    <div>
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
</template>