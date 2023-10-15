<script>
export default {


}
</script>


<template>
    <nav class="app-navbar">
        <div class="container">

            <!-- Logo -->
            <a href="#" class="d-none d-md-inline-block me-4">
                <img src="../assets/img/logo.svg" alt="Logo" class="logo">
            </a>

            <!-- Main Menù -->
            <ul>
                <li>
                    <a href="#" class="active">
                        <FontAwesomeIcon icon="fas fa-house" size="lg" class="d-md-none" />
                        Home
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon="fas fa-search" size="lg" class="d-md-none" />
                        Search
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon="fas fa-book" size="lg" class="d-md-none" />
                        Library
                    </a>
                </li>
            </ul>

        </div>
    </nav>
</template>


<style lang="scss" scoped>
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
        height: 100%;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        li {
            flex: 0 0 calc(100%/3);
            height: 100%;
        }

        a {
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

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

            li {
                flex: 0 0 80px;
                height: 100%;
            }
        }
    }
}
</style>