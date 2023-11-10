<script setup>

/*** COMPONENTS ***/
import MediaSearchCard from '@/components/media/MediaSearchCard.vue';

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

        <!-- Search Title Link -->
        <li>
            <RouterLink :to="{ name: 'search', query: { title: props.searchTerm } }" class="d-block">
                <FontAwesomeIcon icon="fas fa-search" />
                Search for "{{ props.searchTerm }}"
            </RouterLink>
        </li>

        <!-- Suggested Media -->
        <li v-for="suggestion in props.suggestions" :key="suggestion.id">
            <MediaSearchCard :media="suggestion" small />
        </li>

        <li v-if="isLoading" class="text-center">
            <FontAwesomeIcon icon="fas fa-spinner" size="xl" spin-pulse />
        </li>
    </ul>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.suggestions {
    color: $col-light;
    background-color: $col-dark;

    box-shadow: 0 0 8px 2px rgba($color: #000, $alpha: 0.2);

    li {
        padding: 0.5rem;

        &:hover {
            background-color: $col-gray-900;
        }
    }

}
</style>