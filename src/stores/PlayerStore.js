import { defineStore } from 'pinia';
import axios from 'axios';


export const usePlayerStore = defineStore('player', {

    state: () => ({
        trackId: null,
        audioCtx: null,
        audioGain: null,
        audioSource: null,

        isLoading: false,
        isPlaying: false,
        volume: 1,
        volumePrev: 1,
        muted: false
    }),

    getters: {
        // currentTrack: (state) => state.nextUpList[state.nextUpIndex],
    },

    actions: {
        fetchTrack(id) {

            console.log('FETCHING');
            this.trackId = id;
            this.isLoading = true;

            if (this.audioCtx) this.stopTrack();

            axios.get(`http://127.0.0.1:8000/api/tracks/${id}/stream`, { responseType: 'arraybuffer' })
                .then(({ data }) => {

                    console.log('BUFFERING');

                    this.initAudio();

                    this.audioCtx.decodeAudioData(data,
                        buffer => {

                            this.audioSource = this.audioCtx.createBufferSource();
                            this.audioSource.buffer = buffer;
                            this.audioSource.connect(this.audioGain);
                            this.audioSource.start(0);

                            this.isLoading = false;
                            this.isPlaying = true;
                            console.log('DONE');

                        }),
                        err => {
                            console.log(err);
                        };
                })
                .catch(err => {
                    console.log(err);
                })
        },

        initAudio() {
            this.audioCtx = new AudioContext();
            this.audioGain = this.audioCtx.createGain();
            this.audioGain.gain.value = 1;
            this.volumeValuePrev = 1;
            this.audioGain.connect(this.audioCtx.destination);
        },

        stopTrack() {
            this.audioSource.disconnect();
            this.audioGain.disconnect()
            this.audioSource = null;
            this.audioGain = null;
            this.audioCtx.close();
        }
    },
});