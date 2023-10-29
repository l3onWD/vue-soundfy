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

        addTrack(track) {
            // Exit if already included
            if (this.tracks.some(({ id }) => track.id === id)) return false;

            // Add to list
            this.tracks.push(track);

            return true;
        },


        setTracks(tracks) {
            this.tracks = tracks;
            this.currentIndex = 0;
        },


        clearAllTracks() {

            if (this.totalTracks <= 1) return;

            this.tracks = [this.currentTrack];
            this.currentIndex = 0;
        },


        removeTrack(index) {
            // Check if list has more than 1 item and indexs is valid
            if (this.totalTracks < 1 || index < 0 || index >= this.totalTracks) return;

            // Decrement index if a previous item is deleted
            if (index <= this.currentIndex) this.currentIndex--;

            // Remove item
            this.tracks.splice(index, 1);
        },


        goTo(dir) {
            if (dir === 'next' && this.nextTrack) this.currentIndex++;
            else if (dir === 'prev' && this.prevTrack) this.currentIndex--;
            else if (typeof dir === 'number') this.currentIndex = dir;
        }

    }
});