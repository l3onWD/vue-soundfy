<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import TrackList from '@/components/tracks/TrackList.vue';

/*** DATA ***/
import axios from 'axios';

const baseUri = 'http://127.0.0.1:8000/api';


export default {

    components: { AppLoader, BaseButton, TrackList },

    data: () => ({
        playlist: null,
        isLoading: 0
    }),

    computed: {
        totlaDuration() {

            // Get total duration
            const totlSecs = this.playlist.tracks.reduce((tot, { duration }) => tot += duration, 0);

            // Format time
            const hours = Math.floor(totlSecs / 3600);
            const minutes = Math.floor(totlSecs / 60);
            const seconds = Math.floor(totlSecs % 60);

            // Return time string
            return hours + ':' + (minutes < 10 ? `0${minutes}` : minutes) + ':' + (seconds < 10 ? `0${seconds}` : seconds);
        }
    },

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
    <div v-else class="playlist-detail">

        <!-- Content Top -->
        <div class="playlist-top">

            <div class="row">

                <!-- Main Info -->
                <div class="col-12 col-md-8 mb-3 mb-md-0">

                    <div class="d-flex flex-column justify-content-between h-100">

                        <div class="d-flex align-items-baseline">

                            <!-- Back Button -->
                            <BaseButton @click="$router.back()" icon="arrow-left" title="Back" size="xl"
                                class="btn-light me-3" />

                            <!-- Playlist data -->
                            <div class="flex-grow-1">
                                <h2 class="mb-1">{{ playlist.title }}</h2>
                                <span class="col-gray-700 fs-5">{{ playlist.author }}</span>
                            </div>

                            <!-- Playlist Actions -->
                            <div class="d-flex align-items-center">
                                <BaseButton icon="heart" size="lg" iconStyle="far" title="Like" class="btn-light me-1" />
                                <BaseButton icon="list" size="lg" title="Add to Next Up" class="btn-light me-1" />
                                <BaseButton icon="play" size="lg" class="btn-light" />
                            </div>
                        </div>

                        <!-- Length Info -->
                        <div class="playlist-length d-none d-md-flex">
                            <h2 class="mb-0">{{ playlist.tracks.length }}</h2>
                            <h6 class="mb-0">TRACKS</h6>
                            <span>{{ totlaDuration }}</span>
                        </div>
                    </div>

                </div>

                <!-- Cover -->
                <div class="col-12 col-md-4">
                    <img :src="playlist.cover" :alt="playlist.title" class="playlist-cover">
                </div>

            </div>
        </div>


        <div class="playlist-bottom p-3">

            <!-- Tracks -->
            <TrackList :tracks="playlist.tracks" />

        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.playlist-detail {

    padding-bottom: 2rem;

    .playlist-top {
        padding: 1rem;

        color: $col-light;
        background-image: linear-gradient(130deg, $col-gray-900 20%, $col-dark);

        .playlist-length {
            padding: 0.5rem;
            width: 100px;
            height: 100px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $col-dark;
            background-color: $col-light;
            border-radius: 50%;
        }
    }

    .playlist-cover {
        width: 100%;
        height: 100%;

        object-fit: cover;
        box-shadow: 0 0 8px 4px rgba($color: #000, $alpha: 0.3);
    }

}
</style>