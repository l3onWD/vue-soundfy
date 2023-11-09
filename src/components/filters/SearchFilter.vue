<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'


/*** COMPONENTS ***/
import BaseSearchInput from '@/components/base/BaseSearchInput.vue';


/*** DATA ***/
const baseUri = 'http://127.0.0.1:8000/api';
const router = useRouter()
const searchTerm = ref('');
let searchThrottleId = null;


// Suggestions
const suggestSearch = () => {

    if (searchTerm.value.length < 2) return;

    clearTimeout(searchThrottleId);
    searchThrottleId = setTimeout(() => {

        axios.get(baseUri + '/search', { params: { title: searchTerm.value } })
            .then(({ data }) => {

                // Create suggetion list
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })

    }, 500);
};


// Search
const search = () => {
    if (!searchTerm.value.length) return;

    router.push({ name: 'search', query: { title: searchTerm.value } })
}

</script>


<template>
    <form action="" @submit.prevent="search">
        <BaseSearchInput @input="suggestSearch" v-model.trim="searchTerm" />
    </form>
</template>