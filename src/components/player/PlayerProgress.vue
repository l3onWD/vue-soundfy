<script>
export default {


}
</script>


<template>
    <div class="player-progress">
        <!-- Track Current Time -->
        <span>0:00</span>

        <!-- Bar -->
        <div class="player-progress-bar">
            <div class="value"></div>
        </div>

        <!-- Track Length -->
        <span>2:30</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.player-progress {
    width: 100%;
    height: 100%;

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
            width: 23%;

            background-color: $col-orange;
        }
    }
}


// MEDIA MD
@media screen and (min-width: 768px) {
    .player-progress {
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