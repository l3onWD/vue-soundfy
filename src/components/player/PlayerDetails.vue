<script>
export default {
    props: {
        song: {
            type: Object,
            default: null
        }
    }

}
</script>


<template>
    <div v-if="song" class="player-details">

        <!-- Cover -->
        <img :src="song.albumCover" :alt="song.title">

        <!-- Song Info -->
        <div class="player-details-info">
            <h5>{{ song.title }}</h5>
            <span class="col-gray-700">{{ song.author }}</span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.player-details {
    width: 170px;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
        height: 35px;
        width: 35px;

        border: 1px solid $col-gray-700;
    }

    &-info {
        position: relative;

        line-height: 1;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            inset: 0;

            background-image: linear-gradient(90deg, transparent 90%, $col-light);
        }

        >* {
            white-space: nowrap;
        }

        h5 {
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
        }
    }

}
</style>