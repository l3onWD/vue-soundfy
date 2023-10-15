<script>
import MediaSection from './media/MediaSection.vue';


export default {
    components: { MediaSection }

}
</script>


<template>
    <main class="app-main">
        <div class="container">

            <!-- Recently Played -->
            <MediaSection title="Recently Played" />

        </div>
    </main>
</template>


<style lang="scss">
@use '../assets/scss/vars' as *;


.app-main {
    flex-grow: 1;

    overflow-y: auto;
}

// MEDIA MD
@media screen and (min-width: 768px) {
    .app-main {
        margin-top: 60px;
    }
}
</style>