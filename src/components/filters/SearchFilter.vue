<script setup>
import { ref, reactive, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useFetchApi from '@/composables/useFetchApi';


/*** COMPONENTS ***/
import BaseSearchInput from '@/components/base/BaseSearchInput.vue';
import SearchSuggestionList from '@/components/filters/SearchSuggestionList.vue';


/*** DATA ***/
const router = useRouter();
const route = useRoute();
const { isLoading, makeGetRequest } = useFetchApi();
const searchTerm = ref('');
let searchThrottleId = null;
const suggestions = ref([]);
const showSuggestions = ref(false);


/*** LOGIC ***/
// Set Search Term on route change
watchEffect(() => searchTerm.value = route.query.title);


// Get search suggestions
const suggestSearch = () => {

    // Open suggestions dialog
    showSuggestions.value = true;

    // Input Validation
    if (searchTerm.value.length < 2) {
        suggestions.value.splice(0);// reset suggestions
        return;
    }

    // Search throttling
    clearTimeout(searchThrottleId);

    searchThrottleId = setTimeout(async () => {

        // Reset
        suggestions.value.splice(0);

        // Fetch
        const results = await makeGetRequest('/search', { title: searchTerm.value });

        // Update suggestions
        if (!results.length) return;
        suggestions.value.push(...results);

        // Fix track media
        suggestions.value.forEach(media => { if (media.kind === 'track') setMediaTrack(media, 'track') });

    }, 500);
};


// Go to search page
const handleSearchSubmit = () => {

    // Check if input is empty
    if (!searchTerm.value.length) return;

    // Close suggestions dialog
    showSuggestions.value = false;

    // Go to search page
    router.push({ name: 'search', query: { title: searchTerm.value } })
}


// Set Media track
const setMediaTrack = (media) => {

    return {
        ...media,
        tracks: [{ ...media, uid: `track-${media.id}` }]
    }
}


// Close suggestions modal
const closeSuggestions = () => {
    showSuggestions.value = false;
}

</script>


<template>
    <form class="search-filter" @submit.prevent="handleSearchSubmit">

        <!-- Search input -->
        <BaseSearchInput @focusin="suggestSearch" v-click-outside="closeSuggestions" @input="suggestSearch"
            v-model.trim="searchTerm" />

        <!-- Search suggestions -->
        <div v-if="showSuggestions && searchTerm" class="search-filter-suggestions">
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