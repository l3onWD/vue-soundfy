<script>
export default {


}
</script>


<template>
    <div class="app-player bg-danger py-2">
        <ul class="d-flex align-items-center justify-content-center">
            <li>
                <button class="btn btn-outline-light p-1">Play</button>
            </li>
        </ul>
    </div>
</template>


<style lang="scss">
@use '../assets/scss/vars' as *;

.app-player {
    height: $layout-player;
}
</style>