<script setup>

/*** PROPS ***/
defineProps({

    icon: {
        type: String,
        required: false
    },

    iconSize: {
        type: String,
        required: false
    },

    iconStyle: {
        type: String,
        default: 'fas'
    }
})

</script>


<template>
    <button>
        <FontAwesomeIcon v-if="icon" :icon="[iconStyle, icon]" :size="iconSize" />
        <slot></slot>
    </button>
</template>