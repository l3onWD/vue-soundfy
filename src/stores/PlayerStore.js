import { defineStore } from 'pinia';
import axios from 'axios';


export const usePlayerStore = defineStore('player', {

    state: () => ({
        trackId: null,
        isLoading: false,
        isPlaying: false,
        isEnded: false,
        currentTime: 0,
        startedAt: 0,
        trackProgressId: null,

        audioCtx: null,
        audioGain: null,
        audioSource: null,
        audioBuffer: null,

        loop: false,
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


        startAudio(offset = 0, paused = false) {
            this.audioSource = this.audioCtx.createBufferSource();
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.connect(this.audioGain);
            this.audioSource.start(0, offset);
            this.currentTime = offset;
            this.startedAt = offset;

            this.isLoading = false;
            this.isEnded = false;

            if (paused) this.pauseTrack();
            else this.isPlaying = true;

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
            this.startedAt = 0;
            this.isPlaying = false;
            clearInterval(this.trackProgressId);

            console.log('STOPPED');
        },


        resumeTrack() {
            // Restart if closed or resume
            if (this.audioCtx.state === 'closed') {
                this.initAudio();
                this.startAudio();

                console.log('RESTARTED');
            } else {
                this.audioCtx.resume();
                this.isPlaying = true;

                console.log('RESUMED');
            }

        },


        pauseTrack() {
            this.audioCtx.suspend();
            this.isPlaying = false;

            console.log('PAUSED');
        },


        seekTrack(offset, paused) {
            this.stopTrack();
            this.initAudio();
            this.startAudio(offset, paused);
        },


        updateTime() {

            // Update current time
            this.currentTime = this.audioCtx.currentTime + this.startedAt;

            // Ended reached
            if (this.currentTime >= this.audioBuffer.duration) {

                // Check if loop is active
                if (this.loop) {
                    this.seekTrack(0);
                } else {
                    this.stopTrack();
                    this.isEnded = true;
                }
            }
        },


        toggleTrackLoop() {
            this.loop = !this.loop;
        }
    },
});