<script setup>
import { storeToRefs } from 'pinia';
import { useFlashMessagesStore } from '@/stores/FlashMessagesStore';

/*** COMPONENTS ***/
import AppMessages from '@/components/AppMessages.vue';
import AppMain from '@/components/AppMain.vue';
import AppBottom from '@/components/AppBottom.vue';


/*** DATA ***/
const messagesStore = useFlashMessagesStore();
const { messages } = storeToRefs(messagesStore);

</script>


<template>
    <div class="d-flex flex-column vh-100">

        <!-- Flash Messages Container -->
        <AppMessages :messages="messages" />

        <!-- Main Content -->
        <AppMain />

        <!-- Bottom Content -->
        <AppBottom />
    </div>
</template>


<style lang="scss">
@use '@/assets/scss/style.scss';
</style>