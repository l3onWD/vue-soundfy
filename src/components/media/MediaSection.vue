<script>
export default {
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
        <div>

        </div>

    </section>
</template>


<style></style>