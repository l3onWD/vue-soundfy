import { defineStore } from 'pinia';
import axios from 'axios';

const baseUri = 'http://127.0.0.1:8000/api';


export const usePlayerStore = defineStore('player', {

    state: () => ({

        track: null,
        currentTime: 0,
        startedAt: 0,
        volume: 1,

        isLoading: false,
        isPlaying: false,
        isEnded: false,
        loop: false,
        muted: false,

        trackProgressId: null,// Current time update interval

        audioCtx: null,
        audioGain: null,
        audioSource: null,
        audioBuffer: null

    }),

    actions: {


        /**
         * Fetch and buffer tracks from API
         * 
         * @param {Object} track - track to fetch
         */
        fetchTrack(track) {

            this.track = track;
            this.isLoading = true;

            // Stop previous track
            if (this.audioCtx) this.stopTrack();

            // Fetch new track
            axios.get(`${baseUri}/tracks/${track.id}/stream`, { responseType: 'arraybuffer' })
                .then(({ data }) => {

                    // Abort if track changed during fetch
                    if (this.isTrackChaged(track.uid)) return;

                    // Initialize audio context and volume
                    this.initAudio();

                    // Buffering
                    this.audioCtx.decodeAudioData(data,
                        buffer => {

                            // Abort if track changed during buffering
                            if (this.isTrackChaged(track.uid)) return;

                            // Set audio buffer and start track
                            this.audioBuffer = buffer;
                            this.startAudio();

                        }),
                        err => {
                            console.log(err);
                        };
                })
                .catch(err => {
                    console.log(err);
                })
        },


        /**
         * Check il track is changed
         * used for abort fetching
         * 
         * @param {String} trackUid - fetching track uid
         * @returns {Boolean}
         */
        isTrackChaged(trackUid) {
            return trackUid !== this.track.uid;
        },


        /**
         * Initialize audio context and gain node
         */
        initAudio() {
            this.audioCtx = new AudioContext();
            this.audioGain = this.audioCtx.createGain();
            this.audioGain.gain.value = this.muted ? 0 : this.volume;
            this.audioGain.connect(this.audioCtx.destination);
        },


        /**
         * Load a buffered track from an offset time and set in playing state
         * 
         * @param {Number} offset - track time offset
         * @param {Boolean} paused - pause track instead of autoplay
         */
        startAudio(offset = 0, paused = false) {
            // Set audio source
            this.audioSource = this.audioCtx.createBufferSource();
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.connect(this.audioGain);
            this.audioSource.start(0, offset);

            // Set track vars
            this.currentTime = offset;
            this.startedAt = offset - this.audioCtx.currentTime;// Accounting some source start delay

            // Set track state
            this.isLoading = false;
            this.isEnded = false;

            // Play or Pause track from param value
            if (paused) this.pauseTrack();
            else this.isPlaying = true;

            // Start progress update timer
            this.trackProgressId = setInterval(this.progressUpdate, 200);
        },


        /**
         * Stop and reset a track
         */
        stopTrack() {
            // Check if track changed and source wasn't initialized
            if (!this.audioSource) return;

            // Reset audio vars
            this.audioSource.disconnect();
            this.audioGain.disconnect()
            this.audioSource = null;
            this.audioGain = null;
            this.audioCtx.close();

            // Reset track vars
            this.currentTime = 0;
            this.startedAt = 0;

            // Reset track state
            this.isPlaying = false;

            // Remove progress update timer
            clearInterval(this.trackProgressId);

        },


        /**
         * Restart or resume a track
         */
        resumeTrack() {
            // Restart if closed or resume
            if (this.audioCtx.state === 'closed') {
                this.initAudio();
                this.startAudio();

            } else {
                this.audioCtx.resume();
                this.isPlaying = true;

            }

        },


        /**
         * Pause a track
         */
        pauseTrack() {
            this.audioCtx.suspend();
            this.isPlaying = false;

        },


        /**
         * Seek a track by specified offset
         * 
         * @param {Number} offset - track time offset
         * @param {Boolean} paused - pause track instead of autoplay
         */
        seekTrack(offset, paused) {
            this.stopTrack();
            this.initAudio();
            this.startAudio(offset, paused);
        },


        /**
         * Progress Update Timer
         */
        progressUpdate() {

            // Update current time
            this.currentTime = this.audioCtx.currentTime + this.startedAt;

            // Ended reached
            if (this.currentTime >= this.audioBuffer.duration) {

                // Check if loop is active
                if (this.loop) {
                    this.seekTrack(0);// restart track
                } else {
                    this.stopTrack();// stop
                    this.isEnded = true;
                }
            }
        },


        /**
         * Toggle Track Loop
         */
        toggleTrackLoop() {
            this.loop = !this.loop;
        },


        /**
         * Set Track Volume and gain node value
         * 
         * @param {Number} value 
         */
        setTrackVolume(value) {

            this.volume = value;
            this.muted = false;

            if (this.audioGain) {
                this.audioGain.gain.value = value;
            }
        },


        /**
         * Toggle Track Muted state and gain node value
         */
        toggleTrackMuted() {
            // Toggle
            this.muted = !this.muted;

            // Check if Audio Gain exist
            if (!this.audioGain) return;

            // Set Audio Gain value
            if (this.muted) {
                this.audioGain.gain.value = 0;
            } else {
                this.audioGain.gain.value = this.volume;
            }
        }
    },
});