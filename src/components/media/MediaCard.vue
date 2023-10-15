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
        <img :src="`https://picsum.photos/id/${media.cover}/300/300`" :alt="media.title" class="img-fluid">
        <h5>{{ media.title }}</h5>
        <span>{{ media.author }}</span>
    </div>
</template>


<style lang="scss" scoped>
.media-card {

    img {
        height: 150px;
        width: 150px;

        object-fit: cover;
    }
}
</style>