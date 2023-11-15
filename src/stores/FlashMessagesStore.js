import { defineStore } from 'pinia';


export const useFlashMessagesStore = defineStore('flashMessages', {

    state: () => ({
        messages: [],
        uuid: 0
    }),

    actions: {
        sendMessage(body, timer = 5000, title = 'Soundfy') {

            // Message validation
            if (!body || timer < 200 || timer > 3600000) return;

            // Generate an id and create the message
            const id = ++this.uuid;
            const flashMessage = { id, body, title };
            this.messages.push(flashMessage);

            // Set a dismiss timer
            setTimeout(() => {
                this.messages = this.messages.filter((message) => message.id !== id);
            }, timer);
        }
    }
});