<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import BaseButton from '@/components/base/BaseButton.vue';

/*** DATA ***/
import axios from 'axios';

const baseUri = 'http://127.0.0.1:8000/api';


export default {

    components: { AppLoader, BaseButton },

    data: () => ({
        media: null,
        isLoading: 0
    }),

    computed: {
        totlaDuration() {

            // Get total duration
            const totlSecs = this.media.tracks.reduce((tot, { duration }) => tot += duration, 0);

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
        this.fetchApi(`/playlists/${this.$route.params.id}`, (data) => { this.media = data });
    }

}
</script>


<template>
    <!-- Loader -->
    <AppLoader v-if="isLoading" />

    <!-- Page Content -->
    <div v-else class="playlist-detail">

        <!-- Content Top -->
        <div class="playlist-top mb-3">

            <div class="row">

                <div class="col-12 col-md-8 mb-3">

                    <!-- Page navigation -->
                    <nav class="mb-2">
                        <ul>
                            <li>
                                <BaseButton @click="$router.back()" icon="arrow-left" title="Back" size="xl"
                                    class="btn-light" />
                            </li>
                        </ul>
                    </nav>

                    <!-- Media data -->
                    <h2 class="mb-1">{{ media.title }}</h2>
                    <span class="col-gray-700 fs-5">{{ media.author }}</span>

                    <!-- Length Info -->
                    <div class="playlist-length d-none d-md-flex">
                        <h2 class="mb-0">{{ media.tracks.length }}</h2>
                        <h6 class="mb-0">TRACKS</h6>
                        <span>{{ totlaDuration }}</span>
                    </div>

                </div>

                <!-- Cover -->
                <div class="col-12 col-md-4">
                    <img :src="media.cover" :alt="media.title" class="playlist-cover">
                </div>

            </div>
        </div>

        <!-- Tracks -->
        <ul class="track-list p-3">
            <li v-for="(track, idx) in media.tracks" :key="track.id">

                <img :src="track.album.cover" :alt="track.title">

                <span class="mx-3">{{ (idx + 1) }}</span>

                <div>
                    <h6 class="mb-0">{{ track.title }}</h6>
                    <span>{{ track.album.author.name }}</span>
                </div>
            </li>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.playlist-detail {

    padding-bottom: 2rem;

    .playlist-top {
        padding: 1rem;
        position: relative;

        color: $col-light;
        background-image: linear-gradient(130deg, $col-gray-900 20%, $col-dark);

        .playlist-length {
            padding: 0.5rem;
            width: 100px;
            height: 100px;
            position: absolute;
            left: 15px;
            bottom: 15px;

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

    .track-list {

        li {
            padding: 0.5rem 0;

            display: flex;
            align-items: center;
            border-bottom: 1px solid $col-gray-300;

            &:first-child {
                border-top: 1px solid $col-gray-300;
            }
        }

        img {
            width: auto;
            height: 40px;

            object-fit: cover;
        }
    }

}
</style>