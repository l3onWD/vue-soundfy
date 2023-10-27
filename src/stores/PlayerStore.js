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


                    // Abort if track changed during fetch
                    if (id !== this.trackId) {
                        console.log('ABORTED');
                        return;
                    }

                    this.initAudio();

                    console.log('BUFFERING');

                    this.audioCtx.decodeAudioData(data,
                        buffer => {

                            // Abort if track changed during buffering
                            if (id !== this.trackId) {
                                console.log('ABORTED');
                                return;
                            }

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
            // Check if track changed and source wasn't initialized
            if (!this.audioSource) return;

            this.audioSource.disconnect();
            this.audioGain.disconnect()
            this.audioSource = null;
            this.audioGain = null;
            this.audioCtx.close();

            this.isPlaying = false;
        },

        resumeTrack() {
            this.audioCtx.resume();
            this.isPlaying = true;

            console.log('RESUMED');
        },

        pauseTrack() {
            this.audioCtx.suspend();
            this.isPlaying = false;

            console.log('PAUSED');
        }
    },
});