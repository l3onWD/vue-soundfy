<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import useFetchApi from '@/composables/useFetchApi';


/*** COMPONENTS ***/
import BaseSearchInput from '@/components/base/BaseSearchInput.vue';


/*** DATA ***/
const router = useRouter();
const { makeGetRequest } = useFetchApi();
const searchTerm = ref('');
let searchThrottleId = null;


/*** LOGIC ***/
const suggestSearch = () => {

    // Input Validation
    if (searchTerm.value.length < 2) return;

    // Search throttling
    clearTimeout(searchThrottleId);
    searchThrottleId = setTimeout(async () => {

        const suggestions = await makeGetRequest('/search', { title: searchTerm.value });
        console.log(suggestions);

    }, 500);
};


const handleSearchSubmit = () => {

    // Check if input is empty
    if (!searchTerm.value.length) return;

    // Go to search page
    router.push({ name: 'search', query: { title: searchTerm.value } })
}

</script>


<template>
    <form action="" @submit.prevent="handleSearchSubmit">
        <BaseSearchInput @input="suggestSearch" v-model.trim="searchTerm" />
    </form>
</template>