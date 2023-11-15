<script setup>

/*** COMPONENTS ***/
import BaseFlashMessage from '@/components/base/BaseFlashMessage.vue';


/*** PROPS ***/
defineProps({
    messages: {
        type: Array,
        default: []
    }
});

</script>


<template>
    <TransitionGroup name="app-messages" tag="ul" class="app-messages">
        <li v-for="message in messages" :key="message.id">
            <BaseFlashMessage :message="message" class="mb-2" />
        </li>
    </TransitionGroup>
</template>


<style lang="scss" scoped>
.app-messages {
    position: fixed;
    bottom: 110px;
    right: 20px;
    width: 250px;

    z-index: 2;

    // Animations
    &-enter-active,
    &-leave-active {
        transition: all 0.5s ease;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
}

// MEDIA MD
@media screen and (min-width: 768px) {
    .app-messages {
        bottom: 60px;
    }
}
</style>