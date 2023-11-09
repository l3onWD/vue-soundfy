<script setup>
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';

/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaDetailCard from '@/components/media/MediaDetailCard.vue';


/*** DATA ***/
const route = useRoute();
const { makeGetRequest } = useFetchApi();
const isLoading = ref(false);
const results = reactive([]);


/*** LOGIC ***/
const setUid = (media, kind) => {

    // Calculate Unique ID for grouping all media kind
    const prefixUid = `${kind}-${media.id}`;

    // Calculate tracks based on media kind
    const tracks = kind === 'track' ?
        [{ ...media, uid: `${prefixUid}-${media.id}` }] :
        media.tracks.map(track => ({ ...track, uid: `${prefixUid}-${track.id}` }));


    return {
        id: media.id,
        kind,
        cover: media.cover,
        title: media.title,
        tracks,
        author: media.author
    }
}

watch(() => route.query.title, async () => {

    isLoading.value = true;

    await makeGetRequest('/search', { title: route.query.title })
        .then(data => {
            results.playlists = data.playlists.map(media => setUid(media, 'playlist'));
            results.albums = data.albums.map(media => setUid(media, 'album'));
            results.tracks = data.tracks.map(media => setUid(media, 'track'));
        });

    isLoading.value = false;

}, { immediate: true });



</script>


<template>
    <div class="search py-4">
        <!-- Loader -->
        <AppLoader v-if="isLoading" />

        <!-- Content -->
        <div v-else>

            <!-- Filters -->

            <!-- Results -->
            <div v-if="results.playlists?.length" class="mb-3">

                <h5>Playlists:</h5>
                <hr>

                <div v-for="media in results.playlists" :key="media.id" class="mb-3">
                    <MediaDetailCard :media="media" small />
                </div>

            </div>

            <div v-if="results.albums?.length" class="mb-3">

                <h5>Albums:</h5>
                <hr>

                <div v-for="media in results.albums" :key="media.id" class="mb-3">
                    <MediaDetailCard :media="media" />
                </div>

            </div>


            <div v-if="results.tracks?.length" class="mb-3">

                <h5>Tracks:</h5>
                <hr>

                <div v-for="media in results.tracks" :key="media.id" class="mb-3">
                    <MediaDetailCard :media="media" />
                </div>

            </div>

        </div>

    </div>
</template>