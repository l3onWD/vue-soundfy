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
    border: none;

    &:hover {
        color: $col-orange;
    }
}
</style>