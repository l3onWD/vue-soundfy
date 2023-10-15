<script>
export default {

    data: () => ({
        isVisible: true
    })

}
</script>


<template>
    <div v-if="isVisible" class="app-player">

        <!-- Main Actions -->
        <ul class="d-flex align-items-center justify-content-center h-100">
            <li>
                <button class="btn">
                    <FontAwesomeIcon icon="fas fa-play" />
                </button>
            </li>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


.app-player {
    height: $layout-player;

    background-color: $col-light;
    border-top: 1px solid $col-gray-500;
    border-bottom: 1px solid $col-gray-500;

    button {
        padding: 0;
        width: 2.5rem;
        height: 2.5rem;

        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        &:hover {
            color: $col-orange;
        }
    }
}
</style>