<script>
import AppMain from './components/AppMain.vue';
import AppNavbar from './components/AppNavbar.vue';
import AppPlayer from './components/AppPlayer.vue';

export default {
    components: { AppMain, AppNavbar, AppPlayer }


}
</script>


<template>
    <AppMain />
    <AppPlayer />
    <AppNavbar />
</template>


<style lang="scss">
@use './assets/scss/style.scss';
</style>