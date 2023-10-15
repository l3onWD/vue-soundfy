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
        <span>{{ media.author }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.media-card {

    img {
        height: 150px;
        width: 150px;

        object-fit: cover;
    }

    span {
        color: $col-gray-700;
    }
}
</style>