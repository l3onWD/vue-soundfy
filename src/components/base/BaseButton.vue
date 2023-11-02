<script>
export default {
    props: {

        icon: String,

        iconSize: String,

        iconStyle: {
            type: String,
            default: 'fas',
            required: false
        }
    }

}
</script>


<template>
    <button>
        <FontAwesomeIcon v-if="icon" :icon="[iconStyle, icon]" :size="iconSize" />
        <slot></slot>
    </button>
</template>