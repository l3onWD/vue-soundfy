import { defineStore } from 'pinia';
import { usePlayerStore } from '@/stores/PlayerStore';


export const useNextUpStore = defineStore('nextUp', {

    state: () => ({
        tracks: [],
        currentIndex: 0,
        player: usePlayerStore()
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

            const wasEmpty = !this.totalTracks;

            // Add to list
            this.tracks.push(...tracks);

            // Play track if list was empty
            if (wasEmpty) this.player.fetchTrack(this.currentTrack);
        },


        /**
         * Set the tracks list and play start track
         * 
         * @param {Array} tracks - An array of tracks objects
         * @param {Number} startIndex - Set the current index to a new position
         */
        setTracks(tracks, startIndex = 0) {
            this.tracks = [];
            this.tracks.push(...tracks);
            this.currentIndex = startIndex;

            // Play track
            this.player.fetchTrack(this.currentTrack);

        },


        /**
         * Clear all tracks, current track exluded
         */
        clearAllTracks() {

            // Check if ther's at least 2 tracks
            if (this.totalTracks <= 1) return;

            // Take only the current track
            this.tracks = [this.currentTrack];
            this.currentIndex = 0;
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
         * Move to a new track and play it
         * 
         * @param {String | Number} dir - direction or track position
         */
        goTo(dir) {
            if (dir === 'next' && this.nextTrack) this.currentIndex++;
            else if (dir === 'prev' && this.prevTrack) this.currentIndex--;
            else if (typeof dir === 'number') this.currentIndex = dir;

            // Play track
            this.player.fetchTrack(this.currentTrack);
        }

    }
});