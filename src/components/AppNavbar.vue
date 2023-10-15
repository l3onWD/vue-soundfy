<script>
export default {


}
</script>


<template>
    <nav class="app-navbar py-2">
        <div class="container">

            <ul class="d-flex align-items-center gap-3 text-light">
                <li class="nav-link">
                    <a href="#" class="nav-link">Home</a>
                </li>
                <li class="nav-link">
                    <a href="#" class="nav-link">Search</a>
                </li>
                <li class="nav-link">
                    <a href="#" class="nav-link">Library</a>
                </li>
            </ul>
        </div>
    </nav>
</template>


<style lang="scss">
@use '../assets/scss/vars' as *;


.app-navbar {
    height: $layout-navbar;

    display: flex;
    align-items: center;
    background-color: black;

    ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
}
</style>