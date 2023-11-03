<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaDetail from '@/components/media/MediaDetail.vue';
import TrackList from '@/components/tracks/TrackList.vue';
import TrackDetail from '@/components/tracks/TrackDetail.vue';

/*** DATA ***/
import axios from 'axios';
const baseUri = 'http://127.0.0.1:8000/api';


export default {

    components: { AppLoader, MediaDetail, TrackList, TrackDetail },

    data: () => ({
        media: null,
        isLoading: 0
    }),

    computed: {

        mediaType() {
            return this.$route.fullPath.split('/')[1].slice(0, -1);
        }
    },

    watch: {
        '$route.params': {

            handler() {
                this.fetchApi(this.$route.fullPath, (data) => {
                    this.media = this.setUid(data, this.mediaType);
                });
            },
            immediate: true
        }
    },

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
    }

}
</script>


<template>
    <!-- Loader -->
    <AppLoader v-if="isLoading" />

    <!-- Page Content -->
    <div v-else class="detail pb-4">

        <!-- Content Top -->
        <div class="detail-top p-3">

            <!-- Detail -->
            <MediaDetail :media="media" />
        </div>

        <!-- Content Bottom -->
        <div class="detail-bottom p-3">

            <!-- Tracks -->
            <TrackList v-if="mediaType != 'track'" :tracks="media.tracks" />

            <!-- Track Info -->
            <TrackDetail v-else :track="media.tracks[0]" />

        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.detail {

    .detail-top {
        color: $col-light;
        background-image: linear-gradient(130deg, $col-gray-900 20%, $col-dark);
    }

}
</style>