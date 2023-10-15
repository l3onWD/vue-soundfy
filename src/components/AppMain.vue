<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import MediaSection from './media/MediaSection.vue';

/*** DATA ***/
import { mediaList } from '../data';


export default {
    components: { MediaSection },
    data: () => ({
        mediaList
    })

}
</script>


<template>
    <main class="app-main">
        <div class="container">

            <!-- Recently Played -->
            <MediaSection title="Recently Played" :media="mediaList" />

            <!-- More of what you like -->
            <MediaSection title="More of what you like" :media="mediaList" />

        </div>
    </main>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.app-main {
    flex-grow: 1;

    overflow-y: auto;
}

// MEDIA MD
@media screen and (min-width: 768px) {
    .app-main {
        margin-top: $layout-navbar;
    }
}
</style>