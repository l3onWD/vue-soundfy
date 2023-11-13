<script setup>

/*** COMPONENTS ***/
import AppMain from '@/components/AppMain.vue';
import AppBottom from '@/components/AppBottom.vue';

</script>


<template>
    <div class="d-flex flex-column vh-100">
        <AppMain />
        <AppBottom />
    </div>
</template>


<style lang="scss">
@use '@/assets/scss/style.scss';
</style>