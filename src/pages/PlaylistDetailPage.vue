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

        // Get all sections data and remap values
        this.fetchApi(`/playlists/${this.$route.params.id}`, (data) => { this.media = data });
    }

}
</script>


<template>
    <!-- Loader -->
    <AppLoader v-if="isLoading" />

    <!-- Page Content -->
    <div v-else class="py-4">

        <!-- Page navigation -->
        <nav class="py-2">
            <ul>
                <li>
                    <BaseButton @click="$router.back()" icon="arrow-left" title="Back" size="xl" />
                </li>
            </ul>
        </nav>

        <!-- Content -->
        <div class="row">
            <div class="col">
                <h2 class="mb-1">{{ media.title }}</h2>
                <span class="col-gray-700 fs-5">{{ media.author }}</span>

            </div>
            <div class="col">
                <img :src="media.cover" :alt="media.title">
            </div>

        </div>
    </div>
</template>


<style></style>