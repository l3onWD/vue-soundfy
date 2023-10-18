import { reactive } from "vue";

export const store = reactive({
    song: null,
    isPlaying: false,
});