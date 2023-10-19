<script>
/* -----------------------------------------
* RESOURCES
-------------------------------------------*/
/*** COMPONENTS ***/
import BaseButton from '@/components/base/BaseButton.vue';


export default {
    components: { BaseButton },

    data: () => ({
        isActive: false
    }),

    props: {
        volume: {
            type: Number,
            default: 1
        },
        muted: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        barValue() {
            if (this.muted) return '0';
            return `${this.volume * 100}%`;
        },
        volumeIcon() {
            if (this.muted || this.volume === 0) return 'volume-mute';
            if (this.volume < 0.5) return 'volume-low';
            return 'volume-high';
        }
    },

    methods: {
        activate(e) {

            if (e.button !== 0) return;

            this.isActive = true;
            this.updateVolume(e);
        },

        updateVolume(e) {

            // Check if mouse pressed
            if (!this.isActive) return;

            // Calculate control container vertical position
            const barGap = 11.5;// padding + border
            const rect = e.currentTarget.getBoundingClientRect();
            const barBottom = rect.bottom - barGap;
            const barHeight = rect.height - barGap * 2;

            // Calculate volume value by mouse position on container
            const volumeValue = Math.min(Math.max(0, (barBottom - e.y) / barHeight), 1);

            // Emit event
            this.$emit('update:volume', volumeValue);
        }
    }

}
</script>


<template>
    <div class="volume-control">

        <!-- Mute Button -->
        <BaseButton @click="$emit('update:muted', !muted)" :icon="volumeIcon" size="lg" />

        <!-- Volume Range Input -->
        <div @mousedown="activate" @mouseup="isActive = false" @mouseleave="isActive = false" @mousemove="updateVolume"
            class="volume-range">

            <div class="volume-range-bar">
                <div class="value" :style="{ 'height': barValue }">
                    <div class="mark"></div>
                </div>
            </div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
@use '../..//assets/scss/vars' as *;

.volume-control {
    position: relative;

    .volume-range {
        padding: 0.75rem;
        height: 130px;
        position: absolute;
        bottom: 100%;
        left: 0;

        display: none;
        background-color: $col-light;
        border: 1px solid $col-gray-500;
        box-shadow: 0 0 4px 2px rgba($color: #000, $alpha: 0.1);
        cursor: pointer;
    }

    &:hover .volume-range {
        display: block;
    }

    .volume-range-bar {
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
                top: -3px;
                left: -3px;

                background-color: $col-orange;
                border-radius: 50%;
            }
        }
    }
}
</style>