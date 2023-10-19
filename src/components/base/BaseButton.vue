<script>
export default {
    props: {
        label: String,
        icon: String,
        iconStyle: {
            type: String,
            default: 'fas'
        },
        size: String
    }

}
</script>


<template>
    <button>
        <FontAwesomeIcon v-if="icon" :icon="[iconStyle, icon]" :size="size" />
        {{ label }}
    </button>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


button {
    padding: 0;
    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    color: $col-gray-900;

    &:hover {
        color: $col-dark;
    }

    &.active {
        color: $col-orange;
    }

    &.btn-rounded {
        border-radius: 50%;
    }

    &.btn-big {
        width: 4rem;
        height: 4rem;

        font-size: 2.5rem;
    }

    &.btn-light {
        color: $col-gray-700;

        &:hover {
            color: $col-light;
        }
    }

    &.btn-orange {
        color: $col-gray-300;
        background-color: $col-orange;

        &:hover {
            color: $col-light;
        }
    }
}
</style>