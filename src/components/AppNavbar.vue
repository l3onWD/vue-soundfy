<script>
export default {


}
</script>


<template>
    <nav class="app-navbar py-2">
        <div class="container">

            <!-- Logo -->
            <a href="#" class="d-none d-md-inline-block me-4">
                <img src="../assets/img/logo.svg" alt="Logo" class="logo">
            </a>

            <!-- Main Menù -->
            <ul class="d-flex align-items-center gap-3 text-light">
                <li>
                    <a href="#" class="active">
                        <FontAwesomeIcon icon="fas fa-house" />
                        Home
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon="fas fa-search" />
                        Search
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon="fas fa-book" />
                        Library
                    </a>
                </li>
            </ul>

        </div>
    </nav>
</template>


<style lang="scss">
@use '../assets/scss/vars' as *;


.app-navbar {
    height: $layout-navbar;

    background-color: $col-dark;

    >.container {
        height: 100%;

        display: flex;
        align-items: center;
    }

    .logo {
        height: 50px;
        width: auto;
        filter: invert(1);
    }

    ul {
        flex-basis: 100%;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        a {
            display: flex;
            flex-direction: column;
            color: $col-gray-500;
            background-color: $col-gray-900;
            border: 1px solid $col-dark;

            &:hover,
            &.active {
                color: $col-gray-300;
            }

            &.active {
                background-color: $col-dark;
            }
        }
    }

}

// MEDIA MD
@media screen and (min-width: 768px) {
    .app-navbar {
        position: fixed;
        top: 0;
        width: 100%;

        z-index: 1;

        ul {
            justify-content: flex-start;
        }
    }
}
</style>