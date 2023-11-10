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


/*** LOGIC ***/

// Set Search Term on route change
watchEffect(() => searchTerm.value = route.query.title);

// Get search suggestions
const suggestSearch = () => {

    // Input Validation
    if (searchTerm.value.length < 2) return;

    // Search throttling
    clearTimeout(searchThrottleId);
    searchThrottleId = setTimeout(async () => {

        const results = await makeGetRequest('/search', { title: searchTerm.value });

        console.log(results);
        if (!results.length) return;

        suggestions.value.splice(0);
        suggestions.value.push(...results);
        suggestions.value.forEach(media => { if (media.kind === 'track') setMediaTrack(media, 'track') });

    }, 500);
};

// Go to search page
const handleSearchSubmit = () => {

    // Check if input is empty
    if (!searchTerm.value.length) return;

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

</script>


<template>
    <form class="search-filter" @submit.prevent="handleSearchSubmit">

        <BaseSearchInput @input="suggestSearch" v-model.trim="searchTerm" />

        <div class="search-filter-menu">
            <SearchSuggestionList :suggestions="suggestions" :isLoading="isLoading" :searchTerm="searchTerm" />
        </div>
    </form>
</template>

<style lang="scss" scoped>
.search-filter {
    position: relative;

    &-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
    }
}
</style>