<script setup>
import { ref } from 'vue';

/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';


/*** PROPS ***/
defineProps({
    message: {
        type: Object,
        required: true
    }
});


/*** DATA ***/
const isVisible = ref(true);

</script>


<template>
    <Transition name="fade">
        <div v-if="isVisible" class="flash-message">

            <!-- Header -->
            <div class="flash-message-header">

                <!-- Title -->
                <div class="flash-message-title">
                    <div class="flash-message-icon"></div>
                    <span class="fw-bold mb-0">{{ message.title }}</span>
                </div>

                <!-- Close Button -->
                <BaseButton @click="isVisible = false" icon="times" iconSize="xl" class="btn btn-ui" />
            </div>

            <!-- Body -->
            <div class="flash-message-body">
                {{ message.body }}
            </div>
        </div>
    </Transition>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.flash-message {

    background-color: $col-light;
    border: 1px solid $col-gray-500;
    border-radius: 0.5rem;

    box-shadow: 0 2px 8px 4px rgba($color: #000, $alpha: 0.1);

    &-header {
        padding: 0.25rem 1rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $col-gray-500;
    }

    &-body {
        padding: 1rem;
    }

    &-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &-icon {
        width: 15px;
        height: 15px;

        background-color: $col-orange;
        border-radius: 50%;
    }
}

// Animations
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>