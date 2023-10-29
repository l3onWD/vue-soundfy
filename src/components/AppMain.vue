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

    data: () => ({ tracks: [], isLoading: false }),

    methods: {
        fetchTracks() {

            this.isLoading = true;

            axios.get(baseUri + '/tracks')
                .then(({ data }) => {

                    // Map with media props
                    this.tracks = data.map(track => ({
                        id: track.id,
                        title: track.title,
                        author: track.album.author.name,
                        file_name: track.file_name,
                        duration: track.duration,
                        albumCover: track.album.cover
                    }));
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {

                    this.isLoading = false;

                });
        }
    },

    created() {
        this.fetchTracks();
    }

}
</script>


<template>
    <main class="app-main">
        <div class="container">

            <!-- Loader -->
            <AppLoader v-if="isLoading" />

            <!-- All Tracks -->
            <MediaSection v-else title="All Tracks" :mediaList="tracks" />

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