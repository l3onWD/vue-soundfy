<script>
export default {


}
</script>


<template>
    <div class="media-progress">
        <!-- Track Current Time -->
        <span>0:00</span>

        <!-- Bar -->
        <div class="media-progress-bar">
            <div class="value"></div>
        </div>

        <!-- Track Length -->
        <span>2:30</span>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.media-progress {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    .media-progress-bar {
        flex-grow: 1;
        height: 2px;
        position: relative;

        background-color: $col-gray-500;

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
</style>