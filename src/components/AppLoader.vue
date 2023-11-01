<script>
export default {

}
</script>


<template>
    <div class="app-loader">
        <FontAwesomeIcon icon="fas fa-spinner" spin-pulse size="4x" />
    </div>
</template>


<style lang="scss" scoped>
.app-loader {
    position: absolute;
    inset: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba($color: #000, $alpha: 0.8);
}
</style>