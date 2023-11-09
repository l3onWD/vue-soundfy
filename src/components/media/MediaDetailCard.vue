<script setup>

/*** PROPS ***/
const props = defineProps({
    media: {
        type: Object,
        default: null
    }
});

</script>


<template>
    <div v-if="media" class="media-details-card">

        <!-- Cover -->
        <RouterLink :to="{ name: `${media.kind}-detail`, params: { id: media.id } }">
            <img :src="media.cover" :alt="media.title">
        </RouterLink>

        <!-- Media Info -->
        <div class="media-details-info">
            <h6 class="mb-1" :title="media.title">
                <RouterLink :to="{ name: `${media.kind}-detail`, params: { id: media.id } }">
                    {{ media.title }}
                </RouterLink>
            </h6>
            <span :title="media.author" class="col-gray-700">{{ media.author }}</span>
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
        height: 50px;
        width: 50px;

        border: 1px solid $col-gray-700;
    }

    .media-details-info {
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