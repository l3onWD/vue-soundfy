<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaSection from './media/MediaSection.vue';

/*** DATA ***/
import axios from 'axios';

const baseUri = 'http://127.0.0.1:8000/api';


export default {
    components: { MediaSection, AppLoader },

    data: () => ({ playlists: [], albums: [], isLoading: false }),

    methods: {
        fetchPlaylists() {

            this.isLoading = true;

            axios.get(baseUri + '/playlists/our-picks')
                .then(({ data }) => {

                    this.playlists = data.map(playlist => {

                        // Calculate Unique ID for grouping all kinds of media
                        const uid = `playlist-${playlist.id}`;

                        return {
                            id: playlist.id,
                            kind: 'playlist',// Kind of media
                            uid,
                            cover: playlist.cover,
                            title: playlist.title,
                            tracks: playlist.tracks.map(track => ({ ...track, sourceUid: uid })),
                            author: playlist.user.name
                        }
                    });

                    console.log(this.playlists);
                })
                .catch(err => {

                    console.log(err);
                })
                .then(() => {

                    this.isLoading = false;
                });
        },

        fetchAlbums() {

            this.isLoading = true;

            axios.get(baseUri + '/albums/random')
                .then(({ data }) => {

                    console.log(data);

                    this.albums = data.map(album => {

                        // Calculate Unique ID for grouping all kinds of media
                        const uid = `album-${album.id}`;

                        return {
                            id: album.id,
                            kind: 'album',// Kind of media
                            uid,
                            cover: album.cover,
                            title: album.title,
                            tracks: album.tracks.map(track => ({ ...track, sourceUid: uid })),
                            author: album.author.name
                        }
                    });

                })
                .catch(err => {

                    console.log(err);
                })
                .then(() => {

                    this.isLoading = false;
                });
        },
    },

    created() {
        this.fetchPlaylists();
        this.fetchAlbums();
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
                <MediaSection title="Our Picks" :mediaList="playlists" />

                <!-- Random Albums -->
                <MediaSection title="Random Albums" :mediaList="albums" />
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