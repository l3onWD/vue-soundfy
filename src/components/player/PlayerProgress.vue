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
    }

}
</script>


<template>
    <div class="player-progress">
        <!-- Track Current Time -->
        <span>{{ currentTimeLabel }}</span>

        <!-- Bar -->
        <div class="player-progress-bar">
            <div class="value" :style="`width: ${barWidth}%`"></div>
        </div>

        <!-- Track Length -->
        <span>{{ durationLabel }}</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.player-progress {

    display: flex;
    align-items: center;
    gap: 0.75rem;

    span {
        display: none;
    }

    &-bar {
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -1px;
        left: 0;

        background-color: $col-gray-700;

        .value {
            position: absolute;
            top: 0;
            left: 0;
            height: 2px;
            width: 0;

            background-color: $col-orange;
        }
    }
}


// MEDIA MD
@media screen and (min-width: 768px) {
    .player-progress {
        width: 100%;
        height: 100%;

        span {
            display: inline;
        }

        &-bar {
            position: relative;
            background-color: $col-gray-500;

        }
    }
}
</style>