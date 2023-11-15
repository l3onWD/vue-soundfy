<script setup>
import { reactive, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';

/*** COMPONENTS ***/
import AppLoader from '@/components/AppLoader.vue';
import MediaSearchCard from '@/components/media/MediaSearchCard.vue';


/*** ROUTER PROPS ***/
const props = defineProps(['searchedTerm']);

/*** DATA ***/
const { isLoading, makeGetRequest } = useFetchApi();
const results = reactive([]);
const router = useRouter();


/*** COMPUTED ***/
const playlists = computed(() => results.filter(({ kind }) => kind === 'playlist'));
const albums = computed(() => results.filter(({ kind }) => kind === 'album'));
const tracks = computed(() => results.filter(({ kind }) => kind === 'track'));


/*** LOGIC ***/
// Listen to query change
watch(() => props.searchedTerm, () => {

    // Reset Results
    results.splice(0);

    // Search API
    makeGetRequest('/search', { title: props.searchedTerm })
        .then(({ data }) => {

            // Check if there aren't results
            if (!data.length) return;

            results.push(...data);
        })
        .catch(() => {
            // Network error
            router.push({ name: 'error' });
        });;

}, { immediate: true });

</script>


<template>
    <div class="search py-4">
        <!-- Loader -->
        <AppLoader v-if="isLoading" />

        <!-- Page Content -->
        <div v-else>

            <!-- Filters -->
            <!-- todo -->

            <!-- Results -->
            <div v-if="results.length">

                <!-- Playlists -->
                <div v-if="playlists.length" class="mb-3">

                    <h5>Playlists:</h5>
                    <hr>

                    <div v-for="playlist in playlists" :key="playlist.id" class="mb-3">
                        <MediaSearchCard :media="playlist" />
                    </div>

                </div>

                <!-- Albums -->
                <div v-if="albums.length" class="mb-3">

                    <h5>Albums:</h5>
                    <hr>

                    <div v-for="album in albums" :key="album.id" class="mb-3">
                        <MediaSearchCard :media="album" />
                    </div>

                </div>

                <!-- Tracks -->
                <div v-if="tracks.length" class="mb-3">

                    <h5>Tracks:</h5>
                    <hr>

                    <div v-for="track in tracks" :key="track.id" class="mb-3">
                        <MediaSearchCard :media="track" />
                    </div>

                </div>

            </div>

            <!-- Nothing Found -->
            <div v-else class="py-5">
                <h3>Nothing Founded</h3>
            </div>

        </div>



    </div>
</template>