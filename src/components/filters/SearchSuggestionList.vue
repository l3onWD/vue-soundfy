<script setup>

/*** COMPONENTS ***/
import MediaDetailCard from '@/components/media/MediaDetailCard.vue';

/*** PROPS ***/
const props = defineProps({
    suggestions: {
        type: Array,
        default: []
    },
    isLoading: Boolean,
    searchTerm: String
});

</script>


<template>
    <ul class="suggestions">

        <li v-for="suggestion in props.suggestions" :key="suggestion.id">
            <MediaDetailCard :media="suggestion" small />
        </li>

        <li>
            <RouterLink :to="{ name: 'search', query: { title: props.searchTerm } }">
                <FontAwesomeIcon icon="fas fa-search" />
                Search for "{{ props.searchTerm }}"
            </RouterLink>
        </li>
    </ul>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.suggestions {
    color: $col-light;
    background-color: $col-dark;

    li {
        padding: 0.5rem;

        &:hover {
            background-color: $col-gray-900;
        }
    }

}
</style>