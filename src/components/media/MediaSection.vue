<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import MediaCard from './MediaCard.vue';


export default {
    components: { MediaCard },
    props: {
        title: {
            type: String,
            default: 'Media List'
        },
        mediaList: {
            type: Array,
            default: []
        }
    }

}
</script>


<template>
    <section class="py-4 border-bottom">
        <!-- Title -->
        <h2 class="mb-4">{{ title }}</h2>

        <!-- Carousel -->
        <div v-if="mediaList.length" class="row row-cols-2 row-cols-sm-3 row-cols-md-4">
            <div v-for="media in mediaList" :key="media.id" class="col">
                <MediaCard :media="media" />
            </div>
        </div>

        <span v-else>Nothing founded.</span>

    </section>
</template>


<style></style>