<script setup>

/*** DATA ***/
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>


<template>
    <div class="search-input">

        <!-- Lens Icon -->
        <FontAwesomeIcon icon="fas fa-search" size="lg" class="search-input-lens" />

        <!-- Input -->
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text"
            placeholder="Search...">

        <!-- Reset Button -->
        <button v-if="modelValue" @click="$emit('update:modelValue', '')" class="search-input-close">
            <FontAwesomeIcon icon="fas fa-close" size="lg" />
        </button>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.search-input {
    height: 100%;
    position: relative;

    display: flex;
    align-items: center;

    input {
        padding: 0 2.5rem;
        height: 100%;

        border-radius: 50px;
    }

    &-lens,
    &-close {
        padding: 0.75rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        color: $col-gray-700;
    }

    &-lens {
        left: 0;
    }

    &-close {
        right: 0;

        &:hover {
            color: $col-gray-900;
        }
    }
}
</style>