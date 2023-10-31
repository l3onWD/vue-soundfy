<script>

export default {

}
</script>


<template>
    <main class="app-main">
        <div class="container">

            <RouterView />

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