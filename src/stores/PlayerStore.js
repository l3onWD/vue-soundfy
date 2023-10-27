import { defineStore } from 'pinia';
import axios from 'axios';


export const usePlayerStore = defineStore('player', {

    state: () => ({
        trackId: null,
        isLoading: false,
        isPlaying: false,
        isEnded: false,
        currentTime: 0,
        trackProgressId: null,

        audioCtx: null,
        audioGain: null,
        audioSource: null,
        audioBuffer: null,

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

            // Stop previous track
            if (this.audioCtx) this.stopTrack();

            // Fetch new track
            axios.get(`http://127.0.0.1:8000/api/tracks/${id}/stream`, { responseType: 'arraybuffer' })
                .then(({ data }) => {


                    // Abort if track changed during fetch
                    if (id !== this.trackId) {
                        console.log('ABORTED');
                        return;
                    }

                    // initialize audio context and volume
                    this.initAudio();

                    console.log('BUFFERING');

                    this.audioCtx.decodeAudioData(data,
                        buffer => {

                            // Abort if track changed during buffering
                            if (id !== this.trackId) {
                                console.log('ABORTED');
                                return;
                            }

                            // Set audio buffer and start track
                            this.audioBuffer = buffer;
                            this.startAudio();

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


        startAudio() {
            this.audioSource = this.audioCtx.createBufferSource();
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.connect(this.audioGain);
            this.audioSource.start(0);

            this.isLoading = false;
            this.isPlaying = true;
            this.isEnded = false;

            this.trackProgressId = setInterval(this.updateTime, 200);
        },


        stopTrack() {
            // Check if track changed and source wasn't initialized
            if (!this.audioSource) return;

            this.audioSource.disconnect();
            this.audioGain.disconnect()
            this.audioSource = null;
            this.audioGain = null;
            this.audioCtx.close();

            this.currentTime = 0;
            this.isPlaying = false;
            clearInterval(this.trackProgressId);

            console.log('STOPPED');
        },


        resumeTrack() {
            // Restart if ended or resume
            if (this.isEnded) {
                this.initAudio();
                this.startAudio();

                console.log('RESTARTED');
            } else {
                this.audioCtx.resume();

                console.log('RESUMED');
            }

            this.isPlaying = true;
        },


        pauseTrack() {
            this.audioCtx.suspend();
            this.isPlaying = false;

            console.log('PAUSED');
        },


        updateTime() {

            // Update current time
            this.currentTime = this.audioCtx.currentTime;

            // Ended reached
            if (this.currentTime >= this.audioBuffer.duration) {
                this.stopTrack();
                this.isEnded = true;
            }
        }
    },
});