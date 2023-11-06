import { defineStore } from 'pinia';


export const useNextUpStore = defineStore('nextUp', {

    state: () => ({
        tracks: [],
        currentIndex: 0
    }),

    getters: {
        totalTracks: (state) => state.tracks.length,
        prevTrack: (state) => state.currentIndex === 0 ? null : state.tracks[state.currentIndex - 1],
        currentTrack: (state) => state.totalTracks ? state.tracks[state.currentIndex] : null,
        nextTrack: (state) => state.currentIndex === state.totalTracks - 1 ? null : state.tracks[state.currentIndex + 1],
    },

    actions: {

        /**
         * Add tracks to list
         * 
         * @param {Array} tracks - tracks to add
         */
        addTracks(tracks) {

            // Add to list
            this.tracks.push(...tracks);
        },


        /**
         * Set the tracks list
         * 
         * @param {Array} tracks - An array of tracks objects
         * @param {Number} startIndex - Set the current index to a new position
         */
        setTracks(tracks, startIndex = 0) {
            this.tracks = [];
            this.tracks.push(...tracks);
            this.currentIndex = startIndex;
        },


        /**
         * Clear all tracks, current track exluded
         */
        clearAllTracks() {

            // Check if ther's at least 2 tracks
            if (this.totalTracks <= 1) return;

            // Take only the current track
            this.setTracks([this.currentTrack])
        },


        /**
         * Remove a track by is position
         * 
         * @param {Number} index - position
         */
        removeTrack(index) {
            // Check if list has more than 1 item and indexs is valid
            if (this.totalTracks < 1 || index < 0 || index >= this.totalTracks) return;

            // Decrement index if a previous item is deleted
            if (index <= this.currentIndex) this.currentIndex--;

            // Remove item
            this.tracks.splice(index, 1);
        },


        /**
         * Move to a new track
         * 
         * @param {*} dir - direction or track position
         */
        goTo(dir) {
            if (dir === 'next' && this.nextTrack) this.currentIndex++;
            else if (dir === 'prev' && this.prevTrack) this.currentIndex--;
            else if (typeof dir === 'number') this.currentIndex = dir;
        }

    }
});