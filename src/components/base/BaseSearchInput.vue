<script setup>

</script>


<template>
    <div class="search-input">
        <FontAwesomeIcon icon="fas fa-search" size="lg" class="search-input-lens" />
        <input type="text" placeholder="Search...">
        <FontAwesomeIcon icon="fas fa-close" size="lg" class="search-input-close" />
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.search-input {
    position: relative;

    display: flex;
    align-items: center;

    input {
        padding: 0.375rem 2rem;
    }

    &-lens,
    &-close {
        padding: 0.5rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    &-close {
        right: 0;
    }
}
</style>