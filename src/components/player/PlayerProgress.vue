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

            const rect = e.currentTarget.getBoundingClientRect();

            // Calculate value by mouse position on container
            const newValue = Math.min(Math.max(0, (e.x - rect.left) / rect.width), 1);

            // Emit event
            this.$emit('update:currentTime', newValue);
        }
    }

}
</script>


<template>
    <div class="track-controller">
        <!-- Track Current Time -->
        <span>{{ currentTimeLabel }}</span>

        <!-- Bar -->
        <div @click="updateCurrentTime" class="player-progress">
            <div class="player-progress-bar">
                <div class="value" :style="`width: ${barWidth}%`"></div>
            </div>
        </div>

        <!-- Track Length -->
        <span>{{ durationLabel }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.track-controller {

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

                background-color: $col-orange;
            }
        }
    }
}


// MEDIA MD
@media screen and (min-width: 768px) {
    .track-controller {
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