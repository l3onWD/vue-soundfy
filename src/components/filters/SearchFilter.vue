<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';
import { useFlashMessagesStore } from '@/stores/FlashMessagesStore';

/*** COMPONENTS ***/
import BaseSearchInput from '@/components/base/BaseSearchInput.vue';
import SearchSuggestionList from '@/components/filters/SearchSuggestionList.vue';


/*** DATA ***/
const router = useRouter();
const route = useRoute();
const messagesStore = useFlashMessagesStore();

const { makeGetRequest } = useFetchApi(false);
const isLoading = ref(false);
const searchTerm = ref('');
const suggestions = ref([]);
const showSuggestionList = ref(false);

let searchThrottleId = null;


/*** LOGIC ***/
// Set Search Term on route change
watchEffect(() => { searchTerm.value = route.query.title || '' });// search term


// Get search suggestions
const getSuggestions = () => {

    // Open suggestions dialog
    showSuggestionList.value = true;

    // Input Validation
    if (searchTerm.value.length < 2) {
        suggestions.value = [];// reset suggestions
        return;
    }

    // Search throttling
    clearTimeout(searchThrottleId);

    searchThrottleId = setTimeout(async () => {

        // Reset
        suggestions.value = [];
        isLoading.value = true;

        // Fetch
        makeGetRequest('/search', { title: searchTerm.value })
            .then(({ data }) => {
                suggestions.value = data;
            })
            .catch(err => {
                // Server | Connection Error
                console.log(err);
                messagesStore.sendMessage('Connection Error.');
            })
            .then(() => {
                // Deactivate Loader
                isLoading.value = false;
            });

    }, 500);
};


// Close suggestions modal
const closeSuggestionList = () => {
    showSuggestionList.value = false;
}


// Go to search page
const handleSearchSubmit = () => {

    // Check if input is empty
    if (!searchTerm.value.length) return;

    // Close suggestions dialog
    showSuggestionList.value = false;

    // Go to search page
    router.push({ name: 'search', query: { title: searchTerm.value } })
}

</script>


<template>
    <form class="search-filter" @submit.prevent="handleSearchSubmit">

        <!-- Search input -->
        <BaseSearchInput @focusin="getSuggestions" v-click-outside="closeSuggestionList" @input="getSuggestions"
            v-model.trim="searchTerm" />

        <!-- Search suggestions -->
        <div v-if="showSuggestionList && searchTerm" class="search-filter-suggestions">
            <SearchSuggestionList :suggestions="suggestions" :isLoading="isLoading" :searchTerm="searchTerm" />
        </div>
    </form>
</template>

<style lang="scss" scoped>
.search-filter {
    padding: 0.5rem;
    height: 100%;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    &-suggestions {
        position: absolute;
        top: auto;
        bottom: 100%;
        left: 0;
        right: 0;
    }
}

// MEDIA MD
@media screen and (min-width: 768px) {
    .search-filter {
        &-suggestions {
            top: 100%;
            bottom: auto;
        }
    }
}
</style>