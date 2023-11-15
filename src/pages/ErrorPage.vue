<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';


/*** ROUTER PROPS ***/
const props = defineProps(['code']);


/*** DATA ***/
const router = useRouter();


/*** COMPUTED ***/
const errorMessage = computed(() => {

    let message = '';

    switch (props.code) {
        case '404':
            message = 'The page doesn\'t exists.';
            break;

        case '':
            message = 'It looks like you are experiencing some network issues.';
            break;

        default:
            message = 'Something Went Wrong, please retry later.';
            break;
    }

    return message;
});

</script>


<template>
    <div id="error-page" class="d-flex flex-column justyfy-content-center align-items-center py-5">

        <!-- Illustration -->
        <FontAwesomeIcon icon="fas fa-ban" size="10x" class="text-orange mb-2" />

        <!-- Message -->
        <h1 class="mb-3">Oops!</h1>
        <p class="text-center fs-5 mb-5">{{ errorMessage }}</p>

        <!-- Navigation -->
        <BaseButton v-if="code != 404" @click="router.back()" icon="fa-arrow-left" class="btn btn-outline-orange p-3">Go
            Back</BaseButton>
        <BaseButton v-else @click="router.push({ name: 'home' })" icon="fa-arrow-left" class="btn btn-outline-orange p-3">
            Back
            to Home</BaseButton>




    </div>
</template>


<style lang="scss" scoped>
#error-page {

    h1 {
        font-size: 5rem;
    }
}
</style>