import { defineStore } from 'pinia';


export const useNextUpStore = defineStore('nextUp', {

    state: () => ({
        nextUpList: [],
        nextUpIndex: 0
    }),

    getters: {
        totalTracks: (state) => state.nextUpList.length,
        prevTrack: (state) => state.nextUpIndex === 0 ? null : state.nextUpList[state.nextUpIndex - 1],
        currentTrack: (state) => state.totalTracks ? state.nextUpList[state.nextUpIndex] : null,
        nextTrack: (state) => state.nextUpIndex === state.totalTracks - 1 ? null : state.nextUpList[state.nextUpIndex + 1],
    },

    actions: {

        addTrack(track) {
            // Exit if already included
            if (this.nextUpList.some(({ id }) => track.id === id)) return false;

            // Add to list
            this.nextUpList.push(track);

            return true;
        },


        setTracks(tracks) {
            this.nextUpList = tracks;
            this.nextUpIndex = 0;
        },


        clearAllTracks() {

            if (this.totalTracks <= 1) return;

            this.nextUpList = [this.currentTrack];
            this.nextUpIndex = 0;
        },


        removeTrack(index) {
            // Check if list has more than 1 item and indexs is valid
            if (this.totalTracks < 1 || index < 0 || index >= this.totalTracks) return;

            // Decrement index if a previous item is deleted
            if (index <= this.nextUpIndex) this.nextUpIndex--;

            // Remove item
            this.nextUpList.splice(index, 1);
        },


        goTo(dir) {
            if (dir === 'next' && this.nextTrack) this.nextUpIndex++;
            else if (dir === 'prev' && this.prevTrack) this.nextUpIndex--;
            else if (typeof dir === 'number') this.nextUpIndex = dir;
        }

    }
});