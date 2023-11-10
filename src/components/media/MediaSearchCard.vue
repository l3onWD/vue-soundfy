<script setup>
import { computed } from 'vue';

/*** PROPS ***/
const props = defineProps({
    media: {
        type: Object,
        default: null
    }, small: Boolean
});


const imageSize = computed(() => props.small ? 35 : 50);


</script>


<template>
    <RouterLink v-if="media" :to="{ name: `${media.kind}-detail`, params: { id: media.id } }" class="media-search-card">

        <!-- Cover -->
        <img :src="media.cover" :alt="media.title" :width="imageSize" :height="imageSize">

        <!-- Media Info -->
        <div class="media-search-info">
            <h6 class="mb-1" :title="media.title">
                {{ media.title }}
            </h6>
            <span :title="media.kind" class="col-gray-700">{{ media.kind }}</span>
        </div>

    </RouterLink>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.media-search-card {
    width: 100%;

    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1;
    white-space: nowrap;

    overflow: hidden;

    img {
        border: 1px solid $col-gray-700;
    }

    .media-search-info {
        flex-grow: 1;

        overflow: hidden;
        text-overflow: ellipsis;

        h6 {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>