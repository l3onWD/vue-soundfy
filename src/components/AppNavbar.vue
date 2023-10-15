<script>
export default {


}
</script>


<template>
    <nav class="app-navbar py-2">
        <div class="container">

            <!-- Main Menù -->
            <ul class="d-flex align-items-center gap-3 text-light">
                <li>
                    <a href="#" class="d-flex">
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

    display: flex;
    align-items: center;
    background-color: black;

    ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        a {
            display: flex;
            flex-direction: column;
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