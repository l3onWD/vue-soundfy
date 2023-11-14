<script setup>
import { computed } from 'vue';


/*** PROPS ***/
const props = defineProps({
    currentTime: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    }
});


/*** COMPUTED ***/
const currentTimeLabel = computed(() => {
    const minutes = Math.floor(props.currentTime / 60);
    const seconds = Math.floor(props.currentTime % 60);
    return minutes + ':' + (seconds < 10 ? `0${seconds}` : seconds);
});

const durationLabel = computed(() => {
    const minutes = Math.floor(props.duration / 60);
    const seconds = Math.floor(props.duration % 60);
    return minutes + ':' + (seconds < 10 ? `0${seconds}` : seconds);
});

const barWidth = computed(() => {
    return Math.min(props.currentTime / props.duration * 100, 100);
});


/*** FUNCTIONS ***/
const updateCurrentTime = e => {

    // Get component dimensions
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate new time by mouse position on thr component
    const newTime = Math.min(Math.max(0, (e.x - rect.left) / rect.width), 1) * props.duration;

    // Emit event
    emit('time-moved', newTime);
}


/*** EVENTS ***/
const emit = defineEmits(['time-moved']);

</script>


<template>
    <div class="time-control">

        <!-- Track Current Time -->
        <span>{{ currentTimeLabel }}</span>

        <!-- Progress Bar -->
        <div @click="updateCurrentTime" class="time-progress">
            <div class="time-progress-bar">
                <div class="value" :style="`width: ${barWidth}%`">
                    <div class="mark"></div>
                </div>
            </div>
        </div>

        <!-- Track Length -->
        <span>{{ durationLabel }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;


.time-control {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    span {
        display: none;
    }

    .time-progress {
        padding-top: 0.75rem;
        width: 100%;
        position: absolute;
        bottom: -1px;
        left: 0;

        cursor: pointer;

        &-bar {
            width: 100%;
            height: 2px;

            background-color: $col-gray-700;

            .value {
                height: 2px;
                width: 0;
                position: relative;

                background-color: $col-orange;

                .mark {
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    right: -4px;
                    top: -3px;

                    display: none;
                    background-color: $col-orange;
                    border-radius: 50%;
                }
            }
        }

        &:hover .mark {
            display: block;
        }
    }
}


// MEDIA MD
@media screen and (min-width: 768px) {
    .time-control {
        width: 100%;
        height: 100%;

        span {
            display: inline;
        }

        .time-progress {
            padding: 0.75rem 0;
            position: static;

            &-bar {
                position: relative;
                background-color: $col-gray-500;

            }
        }
    }
}
</style>