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
                    <FontAwesomeIcon icon="fas fa-backward-step" />
                </button>
            </li>
            <li>
                <button class="btn">
                    <FontAwesomeIcon icon="fas fa-play" size="lg" />
                </button>
            </li>
            <li>
                <button class="btn">
                    <FontAwesomeIcon icon="fas fa-forward-step" />
                </button>
            </li>
        </ul>

        <!-- Progress Bar -->
        <div></div>

        <!-- Volume -->

        <!-- Media Details -->

        <!-- Other Actions -->

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