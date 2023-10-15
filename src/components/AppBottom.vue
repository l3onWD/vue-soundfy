<script>
import AppNavbar from './AppNavbar.vue';
import AppPlayer from './AppPlayer.vue';


export default {
    components: { AppNavbar, AppPlayer }


}
</script>


<template>
    <div class="app-bottom">
        <AppPlayer />
        <AppNavbar />
    </div>
</template>