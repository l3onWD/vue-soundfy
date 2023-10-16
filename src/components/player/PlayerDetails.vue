<script>
export default {
    props: {
        track: {
            type: Object,
            default: null
        }
    }

}
</script>


<template>
    <div v-if="track" class="player-details">

        <!-- Cover -->
        <img :src="`https://picsum.photos/id/${track.cover}/300/300`" :alt="track.title">

        <!-- Track Info -->
        <div class="player-details-info">
            <h5>{{ track.title }}</h5>
            <span>{{ track.author }}</span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.player-details {
    min-width: 280px;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
        height: 35px;
        width: 35px;

        border: 1px solid $col-gray-700;
    }

    &-info {
        line-height: 1;

        h5 {
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
        }

        span {
            color: $col-gray-700;
        }
    }

}
</style>