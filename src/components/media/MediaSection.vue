<script>
import MediaCard from './MediaCard.vue';


export default {
    components: { MediaCard },
    props: {
        title: {
            type: String,
            default: 'Media'
        },
        media: {
            type: Array,
            default: []
        }
    }

}
</script>


<template>
    <section class="py-4 border-bottom">
        <!-- Title -->
        <h2>{{ title }}</h2>

        <!-- Carousel -->
        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4">
            <div v-for="m in media" :key="m.id" class="col">
                <MediaCard :media="m" />
            </div>
        </div>

    </section>
</template>


<style></style>