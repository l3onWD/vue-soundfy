import { reactive } from "vue";

export const store = reactive({
    song: null,
    nextUpList: [],
    isPlaying: false,
    volume: 1,
    muted: false
});