<script setup>

/*** COMPONENTS ***/
import SearchFilter from '@/components/filters/SearchFilter.vue';

</script>


<template>
    <nav class="app-navbar">
        <div class="container">

            <!-- Logo -->
            <RouterLink :to="{ name: 'home' }" class="d-none d-md-inline-block me-4">
                <img src="../assets/img/logo.svg" alt="Logo" class="logo">
            </RouterLink>

            <!-- Main Menu -->
            <ul>

                <!-- Home page-->
                <li>
                    <RouterLink :to="{ name: 'home' }">
                        <FontAwesomeIcon icon="fas fa-house" size="lg" class="d-md-none" />
                        <span class="d-none d-md-inline">Home</span>
                    </RouterLink>
                </li>

                <!-- Search Bar-->
                <li class="flex-grow-1 flex-md-grow-0 p-2">
                    <SearchFilter />
                </li>

                <!-- Library page-->
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon="fas fa-book" size="lg" class="d-md-none" />
                        <span class="d-none d-md-inline">Library</span>
                    </a>
                </li>
            </ul>

        </div>
    </nav>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


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
        align-items: center;

        li {
            height: 100%;

            background-color: $col-gray-900;
        }

        a {
            padding: 0 1rem;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            color: $col-gray-500;
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
                height: 100%;
            }
        }
    }
}
</style>