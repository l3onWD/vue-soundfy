<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaDetail from '@/components/media/MediaDetail.vue';
import TrackList from '@/components/tracks/TrackList.vue';

/*** DATA ***/
import axios from 'axios';
const baseUri = 'http://127.0.0.1:8000/api';


export default {

    components: { AppLoader, MediaDetail, TrackList },

    data: () => ({
        playlist: null,
        isLoading: 0
    }),

    methods: {

        fetchApi(endpoint, success) {

            this.isLoading++;

            axios.get(baseUri + endpoint)
                .then(({ data }) => { success(data) })
                .catch(err => { console.log(err) })
                .then(() => { this.isLoading-- });
        }
    },

    created() {

        // Get playlist
        this.fetchApi(`/playlists/${this.$route.params.id}`, (data) => { this.playlist = data });
    }

}
</script>


<template>
    <!-- Loader -->
    <AppLoader v-if="isLoading" />

    <!-- Page Content -->
    <div v-else class="playlist-detail pb-4">

        <!-- Content Top -->
        <div class="playlist-top p-3">

            <!-- Detail -->
            <MediaDetail :media="playlist" />
        </div>

        <!-- Content Bottom -->
        <div class="playlist-bottom p-3">

            <!-- Tracks -->
            <TrackList :tracks="playlist.tracks" />
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.playlist-detail {

    .playlist-top {
        color: $col-light;
        background-image: linear-gradient(130deg, $col-gray-900 20%, $col-dark);
    }

}
</style>