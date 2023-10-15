<script>
import AppMain from './components/AppMain.vue';
import AppNavbar from './components/AppNavbar.vue';

export default {
    components: { AppMain, AppNavbar }


}
</script>


<template>
    <AppMain />
    <AppNavbar />
</template>


<style lang="scss">
@use './assets/scss/style.scss';
</style>