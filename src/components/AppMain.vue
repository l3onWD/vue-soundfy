<script>
import MediaSection from './media/MediaSection.vue';


export default {
    components: { MediaSection },
    data: () => ({
        media: [
            {
                id: 1,
                title: 'Brano 1',
                author: 'Unknow',
                length: 120,
                cover: '10'
            },
            {
                id: 2,
                title: 'Brano 2',
                author: 'Unknow 2',
                length: 300,
                cover: '25'
            }
        ]
    })

}
</script>


<template>
    <main class="app-main">
        <div class="container">

            <!-- Recently Played -->
            <MediaSection title="Recently Played" :media="media" />

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