import { reactive } from "vue";

export const store = reactive({
    nextUpList: [],
    nextUpIndex: 0,
    isPlaying: false,
    volume: 1,
    muted: false
});