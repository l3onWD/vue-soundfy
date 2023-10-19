import { reactive } from "vue";

export const store = reactive({
    song: null,
    isPlaying: false,
    volume: 1,
    muted: false
});