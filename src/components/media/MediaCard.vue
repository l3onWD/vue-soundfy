<script>
export default {
    props: {
        media: {
            type: Object,
            default: null
        }
    }

}
</script>


<template>
    <div v-if="media" class="media-card">

        <!-- Cover -->
        <img :src="`https://picsum.photos/id/${media.cover}/300/300`" :alt="media.title">

        <!-- Data -->
        <h5 class="mb-1">{{ media.title }}</h5>
        <span class="col-gray-700">{{ media.author }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.media-card {
    padding: 10px 5px;

    img {
        height: 160px;
        width: 160px;

        object-fit: cover;
    }
}
</style>