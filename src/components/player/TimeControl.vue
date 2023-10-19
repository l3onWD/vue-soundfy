<script>
export default {
    props: {
        currentTime: Number,
        duration: Number,
    },
    computed: {
        currentTimeLabel() {
            const minutes = Math.floor(this.currentTime / 60);
            const seconds = Math.floor(this.currentTime % 60);
            return minutes + ':' + (seconds < 10 ? `0${seconds}` : seconds);
        },

        durationLabel() {
            const minutes = Math.floor(this.duration / 60);
            const seconds = Math.floor(this.duration % 60);
            return minutes + ':' + (seconds < 10 ? `0${seconds}` : seconds);
        },

        barWidth() {
            return Math.min(this.currentTime / this.duration * 100, 100);
        }
    },
    methods: {
        updateCurrentTime(e) {

            // Get component dimensions
            const rect = e.currentTarget.getBoundingClientRect();

            // Calculate new time by mouse position on thr component
            const newTime = Math.min(Math.max(0, (e.x - rect.left) / rect.width), 1) * this.duration;

            // Emit event
            this.$emit('time-moved', newTime);
        }
    },
    emits: ['time-moved']

}
</script>


<template>
    <div class="time-control">

        <!-- Song Current Time -->
        <span>{{ currentTimeLabel }}</span>

        <!-- Progress Bar -->
        <div @click="updateCurrentTime" class="player-progress">
            <div class="player-progress-bar">
                <div class="value" :style="`width: ${barWidth}%`">
                    <div class="mark"></div>
                </div>
            </div>
        </div>

        <!-- Song Length -->
        <span>{{ durationLabel }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;


.time-control {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    span {
        display: none;
    }

    .player-progress {
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

        .player-progress {
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