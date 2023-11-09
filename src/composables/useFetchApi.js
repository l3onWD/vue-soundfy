import { ref, computed } from 'vue';
import axios from 'axios';

const baseUri = 'http://127.0.0.1:8000/api';
const activeRequests = ref(0);// Global variable
//TODO axios global settings

export default function useFetchApi() {

    // Loading state
    const isLoading = computed(() => Boolean(activeRequests.value));

    // Get request
    const makeGetRequest = async (endpoint, params) => {

        // Update global state
        activeRequests.value++;

        // Make axios get request
        try {
            const { data } = await axios.get(baseUri + endpoint, { params });
            return data;
        } catch (err) {
            console.error(err);
        } finally {
            // Update global state
            activeRequests.value--;
        }
    }

    return { isLoading, makeGetRequest };
}