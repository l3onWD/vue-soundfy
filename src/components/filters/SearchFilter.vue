<script setup>
import { ref } from 'vue';

/*** COMPONENTS ***/
import BaseSearchInput from '@/components/base/BaseSearchInput.vue';

/*** COMPONENTS ***/
const searchTerm = ref('');

</script>


<template>
    <BaseSearchInput v-model.trim="searchTerm" />
</template>


<style></style>