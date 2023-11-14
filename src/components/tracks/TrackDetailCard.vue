<script setup>


/*** PROPS ***/
defineProps({
    track: {
        type: Object,
        default: null
    }
});

</script>


<template>
    <div v-if="track" class="media-details-card">

        <!-- Cover -->
        <RouterLink :to="{ name: `track-detail`, params: { id: track.id } }">
            <img :src="track.album.cover" :alt="track.title">
        </RouterLink>

        <!-- Track Info -->
        <div class="media-details-info">
            <h6 class="mb-1" :title="track.title">
                <RouterLink :to="{ name: `track-detail`, params: { id: track.id } }">
                    {{ track.title }}
                </RouterLink>
            </h6>
            <span :title="track.author" class="text-gray-700">{{ track.album.author.name }}</span>
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.media-details-card {
    width: 100%;

    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1;
    white-space: nowrap;

    overflow: hidden;

    img {
        height: 35px;
        width: 35px;

        border: 1px solid $col-gray-700;
    }

    .media-details-info {
        overflow: hidden;
        text-overflow: ellipsis;

        h6 {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>