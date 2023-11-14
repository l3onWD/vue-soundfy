<script setup>
import { computed, ref } from 'vue';


/*** PROPS ***/
const props = defineProps({
    value: {
        type: Number,
        default: 1
    },
    disabled: {
        type: Boolean,
        default: false
    }
});


/*** DATA ***/
const isActive = ref(false);


/*** COMPUTED ***/
/**
 * Update range style value
 */
const barValue = computed(() => {
    if (props.disabled) return '0';
    return `${props.value * 100}%`;
});


/*** EVENTS ***/
const emits = defineEmits(['update:value']);


/*** FUNCTIONS ***/
/**
 * Activate component logic
 * 
 * @param {Object} e - event ref
 */
const activate = e => {

    // Check left click
    if (e.button !== 0) return;

    isActive.value = true;
    update(e);
}

/**
 * Calculate new value and emit a v-model update
 * 
 * @param {Object} e - event ref
 */
const update = e => {

    // Check if mouse pressed
    if (!isActive.value) return;

    // Get data
    const barGap = 10;// padding
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate component vertical position with padding
    const barBottom = rect.bottom - barGap;
    const barHeight = rect.height - barGap * 2;

    // Calculate new value by mouse position on the component
    const newValue = Math.min(Math.max(0, (barBottom - e.y) / barHeight), 1);

    // Emit value (custom v-model)
    emits('update:value', newValue);
}

</script>


<template>
    <div @mousedown="activate" @mouseup="isActive = false" @mouseleave="isActive = false" @mousemove="update"
        class="vertical-range">

        <div class="vertical-range-bar">
            <div class="value" :style="{ 'height': barValue }">
                <div class="mark"></div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.vertical-range {
    padding: 10px;
    height: 100%;

    cursor: pointer;

    &-bar {
        height: 100%;
        width: 2px;

        display: flex;
        align-items: flex-end;
        background-color: $col-gray-700;

        .value {
            width: 100%;
            position: relative;

            background-color: $col-orange;
            transition: 0.01s linear height;

            .mark {
                width: 8px;
                height: 8px;
                position: absolute;
                top: -4px;
                left: -3px;

                background-color: $col-orange;
                border-radius: 50%;
            }
        }
    }

}
</style>